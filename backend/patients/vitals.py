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
        
        data = request.json
        print('Received data:', data) 

        # Get data from form
        patientNames = data.get('patientNames')
        email = data.get('email')
        medicalhistory = data.get('medicalHistory')
        familyhistory = data.get('familyHistory')
        menstrualhistory = data.get('menstrualHistory')
        medications = data.get('medications')
        allergies = data.get('allergies')
        weight = data.get('weight')
        height = data.get('height')
        bmi = data.get('bmi')
        bloodgroup = data.get('bloodGroup')
        bloodsugar = data.get('bloodSugar')
        bloodpressure = data.get('bloodPressure')
        heartrate = data.get('heartRate')
        bodytemperature = data.get('bodyTemperature')
        respiratoryrate = data.get('respiratoryRate')
        gravidity = data.get('gravidity')
        parity = data.get('parity')
        other_symptoms = data.get('otherSymptoms')
        selected_symptoms = data.get('selectedSymptoms')
        gender = data.get('gender')
        age = data.get('age')
        location = data.get('location')

        # Parse blood pressure into systolic and diastolic values
        if bloodpressure:
            systolicbp, diastolicbp = map(int, bloodpressure.split('/'))
        else:
            systolicbp, diastolicbp = None, None

        # Database connection
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                # Fetch or insert patient
                # cursor.execute("SELECT patientid FROM patients WHERE patientname = %s", (patientNames,))
                if patientNames is not None:
                    cursor.execute("SELECT patientid FROM patients WHERE LOWER(patientname) = LOWER(%s)", (patientNames.lower(),))
                    existing_patient = cursor.fetchone()
                    if existing_patient:
                        patientid = existing_patient[0]
                        cursor.execute("UPDATE patients SET practitionerid = %s, patientgender = %s, patientage = %s, patientlocation = %s WHERE patientid=%s", (user_id, gender, age, location, patientid))
                    else:
                        # Insert new patient and get the ID
                        cursor.execute("INSERT INTO patients (patientname, patientemail, patientgender, patientage, patientlocation, practitionerid) VALUES (%s, %s, %s, %s, %s, %s) RETURNING patientid", (patientNames, email, gender, age, location, user_id,))
                        patientid = cursor.fetchone()[0]
                else:
                    return jsonify({'error': 'Patient name is missing or invalid'})
                # Insert/update data in profile table
                cursor.execute("""
                    INSERT INTO patientprofile (profileid, patientid, practitionerid, medicalhistory, familyhistory, menstrualhistory, medication, allergies, weight, height, bmi, bloodgroup, bloodsugar, bloodpressure, heartrate, bodytemperature, respiratoryrate, gravidity, parity, systolicbp, diastolicbp, othersymptoms)
                    VALUES (DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                        parity = EXCLUDED.parity,
                        systolicbp = EXCLUDED.systolicbp,
                        diastolicbp = EXCLUDED.diastolicbp,
                        othersymptoms = EXCLUDED.othersymptoms
                    """, (patientid, user_id, medicalhistory, familyhistory, menstrualhistory, medications, allergies, weight, height, bmi, bloodgroup, bloodsugar, bloodpressure, heartrate, bodytemperature, respiratoryrate, gravidity, parity, systolicbp, diastolicbp, other_symptoms))
                
                # print("Selected symptoms:", selected_symptoms)

                if selected_symptoms:
                        
                        try:
                            # Insert new records for selected symptoms
                            for symptom_id in selected_symptoms:
                                # print("Inserting symptom:", symptom_id)
                                cursor.execute("INSERT INTO patientsymptoms (patientid, symptomid, presence) VALUES (%s, %s, %s)", (patientid, symptom_id, 1))
                            
                            # Commit the changes to the database
                            conn.commit()
                            print("Symptoms inserted successfully")
                        except psycopg2.Error as e:
                            conn.rollback()  # Rollback changes if an error occurs
                            print("Error inserting symptoms:", e)
                        except Exception as e:
                            conn.rollback()  # Rollback changes if an error occurs
                            print("Unexpected error:", e)
                else:
                        print("No selected symptoms found")

        return jsonify({'message': 'Patient profile created successfully'})
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})