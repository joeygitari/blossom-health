from flask import Blueprint, request, jsonify
import psycopg2
import joblib
import os
import numpy as np
import pandas as pd
import pickle
import json

# Define a Blueprint for prediction
prediction = Blueprint('prediction', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

os.chdir('/Users/joanne/Desktop/school/fourth-year/computer-systems-project/project/blossom-health/backend/models')

# Load pre-trained models
endometriosis_model = joblib.load('endometriosis_model.joblib')
# pcos_model = joblib.load('pcos_model.joblib')
with open('pcos_model.pkl', 'rb') as file:
    pcos_model = pickle.load(file)
maternal_health_model = joblib.load('Maternal_Health_Risk.joblib')

endometriosis_accuracy = 97.30
pcos_accuracy = 93.5 
maternal_health_accuracy = 92.0 

def connect_db():
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host
        )
        return conn
    except psycopg2.Error as e:
        print("Unable to connect to the database")
        print(e)
        return None

def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def calculate_bmi(weight_kg, height_cm):
    height_m = height_cm / 100  # Convert height to meters
    return weight_kg / (height_m ** 2)

# Function to predict maternal health risk
def predict_maternal_health_risk(new_data):
    # Load the scaler, label encoder and model
    scaler = joblib.load('scaler.joblib')
    le = joblib.load('label_encoder.joblib')
    model = joblib.load('Maternal_Health_Risk.joblib')
    
    # Transform the new data to match the training data
    new_data_scaled = scaler.transform(new_data)
    prediction = model.predict(new_data_scaled)
    risk_level = le.inverse_transform(prediction)
    return risk_level[0]

# Route for making predictions
@prediction.route('/predict/<int:patient_id>', methods=['GET'])
def predict(patient_id):
    conn = None
    try:
        # Connect to the database
        conn = connect_db()
        if not conn:
            return jsonify({'error': 'Unable to connect to the database'})

        # Retrieve symptoms for the patient from the database
        symptoms_query = """
            SELECT s.symptomname 
            FROM patientsymptoms ps
            JOIN symptoms s ON ps.symptomid = s.symptomid
            WHERE ps.patientid = %s
        """
        with conn.cursor() as cur:
            cur.execute(symptoms_query, (patient_id,))
            symptoms_data = cur.fetchall()
        
        symptoms = [symptom[0] for symptom in symptoms_data]
        
        # Check if weight gain is reported as a symptom
        weight_gain_reported = 'Weight gain' in symptoms
        
        # Define the correct 19 features that the model expects
        model_features = [
            'Heavy / Extreme menstrual bleeding', 'Menstrual pain (Dysmenorrhea)', 
            'Painful / Burning pain during sex (Dyspareunia)', 'Pelvic pain',
            'Irregular / Missed periods', 'Cramping', 'Abdominal pain / pressure',
            'Back pain', 'Painful bowel movements', 'Nausea', 'Menstrual clots',
            'Infertility', 'Painful cramps during period', 'Pain / Chronic pain',
            'Diarrhea', 'Long menstruation', 'Constipation / Chronic constipation',
            'Vomiting / constant vomiting', 'Fatigue / Chronic fatigue'
        ]

        # Transform symptoms to a binary vector based on the model's features
        symptoms_vector = [1 if feature in symptoms else 0 for feature in model_features]

        # Predict endometriosis
        prediction_input = np.array([symptoms_vector])
        endometriosis_prediction = endometriosis_model.predict(prediction_input)[0]

        # Retrieve patient data for PCOS and maternal health risk prediction
        patient_query = """
            SELECT
                p.patientage AS "Age",
                pp.systolicbp AS "SystolicBP",
                pp.diastolicbp AS "DiastolicBP",
                pp.bloodsugar AS "BS",
                pp.bodytemperature AS "BodyTemp_C",
                pp.heartrate AS "HeartRate",
                pp.weight AS "Weight",
                pp.height AS "Height",
                pp.menstrualhistory AS "Cycle length(days)", 
                pp.bmi AS "BMI"
            FROM patients p
            JOIN patientprofile pp ON p.patientid = pp.patientid
            WHERE p.patientid = %s
            ORDER BY pp.profileid DESC
            LIMIT 1
        """
        
        with conn.cursor() as cur:
            cur.execute(patient_query, (patient_id,))
            patient_data = cur.fetchone()
        
        if not patient_data:
            return jsonify({'error': 'Patient not found'})

        # Extract patient data and ensure they are converted to appropriate numerical types
        age = float(patient_data[0])
        systolicbp = float(patient_data[1])
        diastolicbp = float(patient_data[2])
        bs = float(patient_data[3])
        body_temp_celsius = float(patient_data[4])
        heart_rate = float(patient_data[5])
        weight_kg = float(patient_data[6])
        height_cm = float(patient_data[7])
        cycle_length = float(patient_data[8])
        bmi = float(patient_data[9])

        # Convert body temperature to Fahrenheit
        body_temp_fahrenheit = celsius_to_fahrenheit(body_temp_celsius)
        
        # Calculate BMI
        bmi_calculated = calculate_bmi(weight_kg, height_cm)

        # Prepare the input for the maternal health risk model
        maternal_health_features = pd.DataFrame({
            'Age': [age],
            'SystolicBP': [systolicbp],
            'DiastolicBP': [diastolicbp],
            'BS': [bs],
            'BodyTemp': [body_temp_fahrenheit],
            'HeartRate': [heart_rate],
            'AgeSquared': [age**2],
            'HeartRateOverBodyTemp': [heart_rate / body_temp_fahrenheit],
            'BloodPressureRatio': [systolicbp / diastolicbp],
            'AgeBMIProduct': [age * (bs / (body_temp_fahrenheit ** 2))],
            'BloodPressureDeviation': [systolicbp - diastolicbp],
            'BloodSugarSquared': [bs ** 2],
            'RiskScore': [age * systolicbp / (diastolicbp + heart_rate)],
            'BodyTempOverHeartRate': [body_temp_fahrenheit / heart_rate],
            'BloodPressureDiff': [systolicbp - diastolicbp]
        })

        maternal_health_prediction = predict_maternal_health_risk(maternal_health_features)

        # Prepare the input for the PCOS model
        weight_gain = 1 if weight_gain_reported else 0
        pcos_features = [bmi, weight_gain, cycle_length, age]
        pcos_features_array = np.array([pcos_features], dtype=np.float32)  # Ensure data type is float32

        # Predict PCOS
        pcos_prediction = pcos_model.predict(pcos_features_array)[0]
            
        return jsonify({
            'endometriosis_prediction': int(endometriosis_prediction),
            'endometriosis_accuracy': endometriosis_accuracy,
            'pcos_prediction': int(pcos_prediction),
            'pcos_accuracy': pcos_accuracy,
            'maternal_health_prediction': maternal_health_prediction,
            'maternal_health_accuracy': maternal_health_accuracy,
            'symptoms': symptoms
        })


    except psycopg2.Error as db_error:
        return jsonify({'error': 'Database error: ' + str(db_error)})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()
