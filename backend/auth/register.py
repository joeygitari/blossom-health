from flask import Flask, request, jsonify, Blueprint, session, current_app
from flask_mail import Message
import random
import string
from flask_session import Session
import psycopg2
import hashlib

# app = Flask(__name__)
register_user = Blueprint('register_user', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def send_otp(email, otp):
    try:
        msg = Message('Your OTP for email verification', recipients=[email])
        msg.body = f'Verify your email by entering this OTP: {otp}'
        mail = current_app.extensions.get('mail')
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@register_user.route('/register', methods=['POST'])
def register_user_handler():
    try:
        fullNames = request.form.get('fullNames')
        email = request.form.get('email')
        specialization = request.form.get('specialization')
        gender = request.form.get('gender')
        age = request.form.get('age')
        location = request.form.get('location')
        password = request.form.get('password')
        userType = request.form.get('userType')

        if not password:
            return jsonify({'error': 'Password is empty'})

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        otp = generate_otp()
        session['otp'] = otp
        session['registration_data'] = {
            'fullNames': fullNames,
            'email': email,
            'specialization': specialization,
            'gender': gender,
            'age': age,
            'location': location,
            'hashed_password': hashed_password,
            'userType': userType
        }

        print(f"Generated OTP: {otp}")
        print(f"Session OTP: {session.get('otp')}")

        if send_otp(email, otp):
            return jsonify({'message': 'OTP sent to your email'})
        else:
            return jsonify({'error': 'Failed to send OTP'})

    except Exception as e:
        return jsonify({'error': str(e)})

@register_user.route('/change-password', methods=['POST'])
def change_password():
    try:
        userid = session.get('user_id')
        if not userid:
            return jsonify({'error': 'Unauthorized'}), 401

        data = request.json
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')

        if not old_password or not new_password:
            return jsonify({'error': 'Incomplete data provided'})

        hashed_old_password = hashlib.sha256(old_password.encode()).hexdigest()
        hashed_new_password = hashlib.sha256(new_password.encode()).hexdigest()

        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM patients WHERE patientid = %s AND password = %s", (userid, hashed_old_password))
                user = cursor.fetchone()

                if user:
                    cursor.execute("UPDATE patients SET password = %s WHERE patientid = %s", (hashed_new_password, userid))
                    conn.commit()
                    return jsonify({'message': 'Password updated successfully'})

                cursor.execute("SELECT * FROM medicalpractitioner WHERE practitionerid = %s AND password = %s", (userid, hashed_old_password))
                user = cursor.fetchone()

                if user:
                    cursor.execute("UPDATE medicalpractitioner SET password = %s WHERE practitionerid = %s", (hashed_new_password, userid))
                    conn.commit()
                    return jsonify({'message': 'Password updated successfully'})

                return jsonify({'error': 'Invalid password'})

    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})

@register_user.route('/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()  # Get the JSON data from the request
        otp = data.get('otp')  # Extract the OTP value
        print(f"Entered OTP: {otp}")
        print(f"Session OTP: {session.get('otp')}")

        if 'otp' in session and session['otp'] == otp:
            registration_data = session.pop('registration_data')
            with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
                with conn.cursor() as cursor:
                    if registration_data['userType'] == 'medicalPractitioner':
                        cursor.execute("INSERT INTO medicalpractitioner (practitionername, practitioneremail, practitionerspecialization, practitionerlocation, password) VALUES (%s, %s, %s, %s, %s)", 
                                       (registration_data['fullNames'], registration_data['email'], registration_data['specialization'], registration_data['location'], registration_data['hashed_password']))
                    elif registration_data['userType'] == 'patient':
                        cursor.execute("INSERT INTO patients (patientname, patientemail, patientgender, patientage, patientlocation, password) VALUES (%s, %s, %s, %s, %s, %s)", 
                                       (registration_data['fullNames'], registration_data['email'], registration_data['gender'], registration_data['age'], registration_data['location'], registration_data['hashed_password']))
                    else:
                        return jsonify({'error': 'Invalid user type'})
                    conn.commit()
            session.pop('otp')
            return jsonify({'message': 'User registered successfully'})
        else:
            print("OTP mismatch")
            return jsonify({'error': 'Invalid OTP'})

    except Exception as e:
        print(f"Error in verify_otp: {e}")
        return jsonify({'error': str(e)})
