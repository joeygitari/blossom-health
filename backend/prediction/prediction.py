from flask import Blueprint, request, jsonify
import psycopg2
import joblib
import os
import numpy as np

# Define a Blueprint for prediction
prediction = Blueprint('prediction', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

os.chdir('/Users/joanne/Desktop/school/fourth-year/computer-systems-project/project/blossom-health/backend/prediction')

# Load pre-trained models
endometriosis_model = joblib.load('endometriosis_model.joblib')
pcos_model = joblib.load('pcos_model.joblib')
maternal_health_model = joblib.load('Maternal_Health_Risk.joblib')

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

        return jsonify({'endometriosis_prediction': int(endometriosis_prediction)})

    except psycopg2.Error as db_error:
        return jsonify({'error': 'Database error: ' + str(db_error)})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        if conn:
            conn.close()
