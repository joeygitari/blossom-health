from flask import Flask, request, jsonify, Blueprint, session
import psycopg2
import hashlib

update_profile = Blueprint('update_profile', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@update_profile.route('/update-profile', methods=['POST'])
def update_profile_handler():
    try:
        user_id = session.get('user_id')
        user_role = session.get('role')
        if not user_id:
            return jsonify({'error': 'Unauthorized'}), 401

        data = request.json
        name = data.get('name')
        email = data.get('email')
        specialization = data.get('specialization')
        gender = data.get('gender')
        age = data.get('age')
        location = data.get('location')

        specialization = specialization if specialization else None
        gender = gender if gender else None
        age = int(age) if age else None

        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                if user_role == 'practitioner':
                    cursor.execute("""
                        UPDATE medicalpractitioner
                        SET practitionername = %s, practitioneremail = %s, practitionerspecialization = %s, practitionerlocation = %s
                        WHERE practitionerid = %s
                    """, (name, email, specialization, location, user_id))
                else:
                    cursor.execute("""
                        UPDATE patients
                        SET patientname = %s, patientemail = %s, patientgender = %s, patientage = %s, patientlocation = %s
                        WHERE patientid = %s
                    """, (name, email, gender, age, location, user_id))
                conn.commit()

                # Retrieve updated user details
                if user_role == 'practitioner':
                    cursor.execute("SELECT practitionername, practitioneremail, practitionerspecialization, practitionerlocation FROM medicalpractitioner WHERE practitionerid = %s", (user_id,))
                    updated_user = cursor.fetchone()
                    updated_user_details = {
                        'name': updated_user[0],
                        'email': updated_user[1],
                        'specialization': updated_user[2],
                        'location': updated_user[3],
                        'role': user_role
                    }
                else:
                    cursor.execute("SELECT patientname, patientemail, patientgender, patientage, patientlocation FROM patients WHERE patientid = %s", (user_id,))
                    updated_user = cursor.fetchone()
                    updated_user_details = {
                        'name': updated_user[0],
                        'email': updated_user[1],
                        'gender': updated_user[2],
                        'age': updated_user[3],
                        'location': updated_user[4],
                        'role': user_role
                    }

        return jsonify({
            'message': 'Profile updated successfully', 
            'updatedUser': updated_user_details
        })
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500