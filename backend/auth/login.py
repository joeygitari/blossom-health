from flask import request, jsonify, Blueprint, session
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from flask_session import Session
import psycopg2
import hashlib

login_user = Blueprint('login', __name__)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.login_view = 'login.login_user_handler'

# Example User class (you can create your own)
class User(UserMixin):
    def __init__(self, user_id, role):
        self.id = user_id
        self.role = role

@login_manager.user_loader
def load_user(user_id):
    # Example implementation, you may need to modify based on your actual User class
    role = session.get('role')
    if user_id and role:
        return User(user_id, role)
    return None


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
                cursor.execute("SELECT patientid, password FROM patients WHERE patientEmail = %s", (email,))
                row = cursor.fetchone()
                if row:
                    patientid, stored_password = row
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    if stored_password == hashed_password:
                        session['user_id'] = patientid
                        session['role'] = 'patient'
                        return jsonify({'message': 'Login successful', 'user_id': patientid, 'role': 'patient'})
                    else:
                        return jsonify({'error': 'Incorrect password'})
                
                # Check the medicalpractitioner table
                cursor.execute("SELECT practitionerid, password FROM medicalpractitioner WHERE practitionerEmail = %s", (email,))
                row = cursor.fetchone()
                if row:
                    practitionerid, stored_password = row
                    hashed_password = hashlib.sha256(password.encode()).hexdigest()
                    if stored_password == hashed_password:
                        session['user_id'] = practitionerid
                        session['role'] = 'practitioner'
                        return jsonify({'message': 'Login successful' , 'user_id': practitionerid, 'role': 'practitioner'})
                    else:
                        return jsonify({'error': 'Incorrect password'})

                # Email doesn't exist in both tables
                return jsonify({'error': 'Email does not exist'})
                    
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})