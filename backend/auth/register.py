from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@app.route('/register', methods=['POST'])
def register_user():
    # Get user data from the frontend RegisterForm
    fullNames = request.form.get('fullNames')
    email = request.form.get('email')
    specialization = request.form.get('specialization')
    gender = request.form.get('gender')
    age = request.form.get('age')
    location = request.form.get('location')
    password = request.form.get('password')

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password)
    cursor = conn.cursor()

    try:
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
        userType = request.form.get('userType')
        if userType == 'medicalPractitioner':
            # Update the admin table
            cursor.execute("INSERT INTO medicalpractitioner (practitionername, practitioneremail, practitionerspecialization, practitionerlocation, password) VALUES (%s, %s, %s, %s, %s)", (fullNames, email, specialization, location, password))
        elif userType == 'patient':
            # Update the student table
            cursor.execute("INSERT INTO patients (patientname, patientemail, patientgender, patientage, patientlocation, password) VALUES (%s, %s, %s, %s, %s, %s)", (fullNames, email, gender, age, location, password))
        else:
            # Invalid userType
            return jsonify({'error': 'Invalid user type'})
        conn.commit()
        return jsonify({'message': 'User registered successfully'})
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run()