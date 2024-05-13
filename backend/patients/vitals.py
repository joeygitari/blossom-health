from flask import Blueprint, request, jsonify, session
import psycopg2

# Define a Blueprint for vitals
vitals = Blueprint('vitals', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@vitals.route('/submit-profile', methods=['POST'])
def submit_profile():
    try:
        # Get user ID from session
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'User not logged in'})

        # Get data from form
        patientNames = request.form.get('patientNames')
        medicalhistory = request.form.get('medicalHistory')
        familyhistory = request.form.get('familyHistory')
        menstrualhistory = request.form.get('menstrualHistory')
        medications = request.form.get('medications')
        allergies = request.form.get('allergies')
        weight = request.form.get('weight')
        height = request.form.get('height')
        bmi = request.form.get('bmi')
        bloodgroup = request.form.get('bloodGroup')
        bloodsugar = request.form.get('bloodSugar')
        bloodpressure = request.form.get('bloodPressure')
        heartrate = request.form.get('heartRate')
        bodytemperature = request.form.get('bodyTemperature')
        respiratoryrate = request.form.get('respiratoryRate')
        gravidity = request.form.get('gravidity')
        parity = request.form.get('parity')
        
        # Database connection
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                # Fetch or insert patient
                cursor.execute("SELECT patientid FROM patients WHERE patientname = %s", (patientNames,))
                existing_patient = cursor.fetchone()
                if existing_patient:
                    patientid = existing_patient[0]  # Extracting patient ID from the result
                else:
                    # Insert new patient and get the ID
                    cursor.execute("INSERT INTO patients (patientname) VALUES (%s) RETURNING patientid", (patientNames,))
                    patientid = cursor.fetchone()[0]

                # Insert/update data in profile table
                cursor.execute("""
                    INSERT INTO patientprofile (profileid, patientid, practitionerid, medicalhistory, familyhistory, menstrualhistory, medication, allergies, weight, height, bmi, bloodgroup, bloodsugar, bloodpressure, heartrate, bodytemperature, respiratoryrate, gravidity, parity)
                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (profileid) DO UPDATE
                    SET medicalhistory = EXCLUDED.medicalhistory,
                        familyhistory = EXCLUDED.familyhistory,
                        menstrualhistory = EXCLUDED.menstrualhistory,
                        medication = EXCLUDED.medication,
                        allergies = EXCLUDED.allergies,
                        weight = EXCLUDED.weight,
                        height = EXCLUDED.height,
                        bmi = EXCLUDED.bmi,
                        bloodgroup = EXCLUDED.bloodgroup,
                        bloodsugar = EXCLUDED.bloodsugar,
                        bloodpressure = EXCLUDED.bloodpressure,
                        heartrate = EXCLUDED.heartrate,
                        bodytemperature = EXCLUDED.bodytemperature,
                        respiratoryrate = EXCLUDED.respiratoryrate,
                        gravidity = EXCLUDED.gravidity,
                        parity = EXCLUDED.parity
                    """, (patientid, user_id, medicalhistory, familyhistory, menstrualhistory, medications, allergies, weight, height, bmi, bloodgroup, bloodsugar, bloodpressure, heartrate, bodytemperature, respiratoryrate, gravidity, parity))

        return jsonify({'message': 'Patient profile created successfully'})
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})
