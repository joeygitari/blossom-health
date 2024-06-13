from flask import Blueprint, request, jsonify, session
import psycopg2

# Define a Blueprint for patients
patients = Blueprint('patients', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@patients.route('/patients', methods=['GET'])
def get_patients():
    try:
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM patients")
                patients = cursor.fetchall()
        return jsonify(patients)
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})

@patients.route('/practitioners_patients', methods=['GET'])
def get_practitioners_patients():
    try:
        # Get user ID from session
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'User not logged in'})

        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM patients WHERE practitionerid = %s", (user_id,))
                patients = cursor.fetchall()
        return jsonify(patients)
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})