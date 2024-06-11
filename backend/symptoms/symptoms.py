from flask import Blueprint, request, jsonify, session
import psycopg2

# Define a Blueprint for symptoms
symptoms = Blueprint('symptoms', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@symptoms.route('/symptoms', methods=['GET'])
def get_symptoms():
    try:
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM symptoms")
                symptoms = cursor.fetchall()
        return jsonify(symptoms)
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})

@symptoms.route('/submit-symptoms', methods=['POST'])
def submit_symptoms():
    try:
        # Get user ID from session
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'User not logged in'})

        # Get selected symptoms from the request data
        data = request.json
        selected_symptoms = data.get('selected_symptoms')
        
        # Insert/update data in patientsymptoms table
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                # Delete existing records for the user
                # cursor.execute("DELETE FROM patientsymptoms WHERE patientid = %s", (user_id,))
                # Insert new records for selected symptoms
                for symptom_id in selected_symptoms:
                    cursor.execute("INSERT INTO patientsymptoms (patientid, symptomid, presence) VALUES (%s, %s, %s)", (user_id, symptom_id, 1))
        
        return jsonify({'message': 'Symptoms submitted successfully'})
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})