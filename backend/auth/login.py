from flask import request, jsonify, Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
import psycopg2
import hashlib

login_user = Blueprint('login', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@login_user.route('/login', methods=['POST'])
def login_user_handler():
    try:
        email = request.form.get('email')
        password = request.form.get('password')

        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                # Check the patients table
                cursor.execute("SELECT password FROM patients WHERE patientEmail = %s", (email,))
                row = cursor.fetchone()
                if row:
                    stored_password = row[0]
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    if stored_password == hashed_password:
                        return jsonify({'message': 'Login successful'})
                    else:
                        return jsonify({'error': 'Incorrect password'})
                
                # Check the medicalpractitioner table
                cursor.execute("SELECT password FROM medicalpractitioner WHERE practitionerEmail = %s", (email,))
                row = cursor.fetchone()
                if row:
                    stored_password = row[0]
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    if stored_password == hashed_password:
                        return jsonify({'message': 'Login successful'})
                    else:
                        return jsonify({'error': 'Incorrect password'})

                # Email doesn't exist in both tables
                return jsonify({'error': 'Email does not exist'})
                    
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})

def load_user(patientid=None, practitionerid=None):
    try:
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                if patientid is not None:
                    # Load user from the patients table using patient_id
                    cursor.execute("SELECT patientid, patientemail FROM patients WHERE patientid = %s", (patientid,))
                    row = cursor.fetchone()
                    if row:
                        patientid, email = row
                        return User(patientid)
                elif practitionerid is not None:
                    # Load user from the medicalpractitioner table using practitioner_id
                    cursor.execute("SELECT practitionerid, practitioneremail FROM medicalpractitioner WHERE practitionerid = %s", (practitionerid,))
                    row = cursor.fetchone()
                    if row:
                        practitionerid, email = row
                        return User(practitionerid)

                return None  # User not found
    except psycopg2.Error as e:
        return None
