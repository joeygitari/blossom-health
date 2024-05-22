from flask import Blueprint, request, jsonify, session
import psycopg2
import joblib
import os
import numpy as np
import pickle
import xgboost as xgb

# Define a Blueprint for report
# patientreport = Blueprint('patientreport', __name__)
patient_report_blueprint = Blueprint('patientreport', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

os.chdir('/Users/joanne/Desktop/school/fourth-year/computer-systems-project/project/blossom-health/backend/reports')

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

# Route for making predictions
@patient_report_blueprint.route('/report', methods=['GET'])
def patientreport():
    conn = None
    try:
        # Connect to the database
        conn = connect_db()
        if not conn:
            return jsonify({'error': 'Unable to connect to the database'})

        patientid = session.get('user_id')
        if not patientid:
            return jsonify({'error': 'User not logged in'})

        patients = """
            SELECT *
            FROM patients
            WHERE patientid = %s
        """

        with conn.cursor() as cur:
            cur.execute(patients, (patientid,))
            patients_data = cur.fetchall()

        if patients_data:
            patients = patients_data[0]

        # Retrieve symptoms for the patient from the database
        symptoms_query = """
            SELECT s.symptomname 
            FROM patientsymptoms ps
            JOIN symptoms s ON ps.symptomid = s.symptomid
            WHERE ps.patientid = %s
        """
        with conn.cursor() as cur:
            cur.execute(symptoms_query, (patientid,))
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

        # Retrieve patient data for PCOS prediction
        patient_query = """
            SELECT
                pp.menstrualhistory AS "Cycle length(days)", 
                pp.bmi AS "BMI",
                p.patientage AS "Age (yrs)"
            FROM patients p
            JOIN patientprofile pp ON p.patientid = pp.patientid
            WHERE p.patientid = %s
        """
        
        with conn.cursor() as cur:
            cur.execute(patient_query, (patientid,))
            patient_data = cur.fetchone()
        
        if not patient_data:
            return jsonify({'error': 'Patient not found'})

        # Convert fetched data to a format suitable for the PCOS model
        cycle_length, bmi, age = patient_data
        weight_gain = 1 if weight_gain_reported else 0
        
        # Prepare the input for the PCOS model
        pcos_features = [bmi, weight_gain, cycle_length, age]
        pcos_features_array = np.array([pcos_features], dtype=np.float32)  # Ensure data type is float32

        # Predict PCOS
        pcos_prediction = pcos_model.predict(pcos_features_array)[0]

        # return jsonify({
        #     'endometriosis_prediction': int(endometriosis_prediction),
        #     'pcos_prediction': int(pcos_prediction)
        # })
        # Retrieve patient data for maternal health risk prediction
        maternal_health_query = """
            SELECT
                p.patientage AS "Age",
                pp.systolicbp AS "SystolicBP",
                pp.diastolicbp AS "DiastolicBP",
                pp.bloodsugar AS "BS",
                pp.bodytemperature AS "BodyTemp",
                pp.heartrate AS "HeartRate"
            FROM patients p
            JOIN patientprofile pp ON p.patientid = pp.patientid
            WHERE p.patientid = %s
        """
        
        with conn.cursor() as cur:
            cur.execute(maternal_health_query, (patientid,))
            maternal_health_data = cur.fetchone()

        if not maternal_health_data:
            return jsonify({'error': 'Patient not found'})

        # Extract data for maternal health risk prediction
        age, systolicbp, diastolicbp, bloodsugar, bodytemp, heartrate = maternal_health_data

        # Convert retrieved values to float
        age = float(age)
        systolicbp = float(systolicbp)
        diastolicbp = float(diastolicbp)
        bloodsugar = float(bloodsugar)
        bodytemp = float(bodytemp)
        heartrate = float(heartrate)

        # Calculate derived features for maternal health risk prediction
        age_squared = age ** 2
        heart_rate_over_body_temp = heartrate / bodytemp
        blood_pressure_ratio = systolicbp / diastolicbp
        age_bmi_product = age * bmi
        blood_pressure_deviation = systolicbp - diastolicbp
        blood_sugar_squared = bloodsugar ** 2
        body_temp_over_heart_rate = bodytemp / heartrate
        blood_pressure_diff = abs(systolicbp - diastolicbp)


        # Prepare input array for maternal health risk prediction
        maternal_health_features = [
            age, systolicbp, diastolicbp, bloodsugar, bodytemp, heartrate,
            age_squared, heart_rate_over_body_temp, blood_pressure_ratio,
            age_bmi_product, blood_pressure_deviation, blood_sugar_squared,
            0,  # Placeholder for RiskScore
            body_temp_over_heart_rate, blood_pressure_diff
        ]

        maternal_health_features_array = np.array([maternal_health_features], dtype=np.float32)

        # Predict maternal health risk
        maternal_health_prediction = maternal_health_model.predict(maternal_health_features_array)[0]

        # Retrieve recommendation for the patient
        recommendation_query = """
            SELECT recommendation, practitionerid, datecreated
            FROM recommendations
            WHERE patientid = %s
            ORDER BY datecreated DESC
            LIMIT 1
        """
        with conn.cursor() as cur:
            cur.execute(recommendation_query, (patientid,))
            recommendation_data = cur.fetchone()

        # if recommendation_data:
        #     recommendation = recommendation_data[0]
        # else:
        #     recommendation = "nothing to see here"
        if recommendation_data:
            recommendation, practitionerid, datecreated = recommendation_data

            # Format datecreated to remove time and GMT
            if datecreated:
                datecreated = datecreated.strftime('%d %b %Y')

            # Retrieve practitioner details
            practitioner_query = """
                SELECT *
                FROM medicalpractitioner
                WHERE practitionerid = %s
            """
            with conn.cursor() as cur:
                cur.execute(practitioner_query, (practitionerid,))
                practitioner_data = cur.fetchone()

            if practitioner_data:
                practitioner = {
                    'name': practitioner_data[1],
                    'specialization': practitioner_data[4]
                }
            else:
                practitioner = None
        else:
            recommendation = "nothing to see here"
            practitioner = None
            datecreated = None


        return jsonify({
            'endometriosis_prediction': int(endometriosis_prediction),
            'endometriosis_accuracy': endometriosis_accuracy,
            'pcos_prediction': int(pcos_prediction),
            'pcos_accuracy': pcos_accuracy,
            'maternal_health_prediction': int(maternal_health_prediction),
            'maternal_health_accuracy': maternal_health_accuracy,
            'symptoms': symptoms,
            'recommendation': recommendation,
            'practitioner': practitioner,
            'patients': patients,
            'datecreated': datecreated,
        })


    except psycopg2.Error as db_error:
        return jsonify({'error': 'Database error: ' + str(db_error)})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()