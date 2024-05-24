from flask import Flask, request, jsonify, Blueprint, session
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

@register_user.route('/register', methods=['POST'])
def register_user_handler():
    try:
        # Get user data from the frontend RegisterForm
        fullNames = request.form.get('fullNames')
        email = request.form.get('email')
        specialization = request.form.get('specialization')
        gender = request.form.get('gender')
        age = request.form.get('age')
        location = request.form.get('location')
        password = request.form.get('password')
        userType = request.form.get('userType')

        # Ensure password is not empty
        if not password:
            return jsonify({'error': 'Password is empty'})

        print("Password before hashing:", password)

        # Hash the password using SHA-256
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        print("Hashed password:", hashed_password)

        # Connect to the PostgreSQL database
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                # Insert user data into the database
                # Check if email already exists
                cursor.execute("SELECT COUNT(*) FROM medicalpractitioner WHERE practitioneremail = %s", (email,))
                count = cursor.fetchone()[0]
                if count > 0:
                    return jsonify({'error': 'Email already exists'})

                cursor.execute("SELECT COUNT(*) FROM patients WHERE patientemail = %s", (email,))
                count = cursor.fetchone()[0]
                if count > 0:
                    return jsonify({'error': 'Email already exists'})
            
                # cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, password, email))
                if userType == 'medicalPractitioner':
                    # Update the admin table
                    cursor.execute("INSERT INTO medicalpractitioner (practitionername, practitioneremail, practitionerspecialization, practitionerlocation, password) VALUES (%s, %s, %s, %s, %s)", (fullNames, email, specialization, location, hashed_password))
                elif userType == 'patient':
                    # Update the student table
                    cursor.execute("INSERT INTO patients (patientname, patientemail, patientgender, patientage, patientlocation, password) VALUES (%s, %s, %s, %s, %s, %s)", (fullNames, email, gender, age, location, hashed_password))
                else:
                    # Invalid userType
                    return jsonify({'error': 'Invalid user type'})
                conn.commit()
        
        return jsonify({'message': 'User registered successfully'})
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
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