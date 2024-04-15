from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@app.route('/login', methods=['POST'])
def login_user():
    email = request.form.get('email')
    password = request.form.get('password')

    conn = psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password)
    cursor = conn.cursor()

    try:
        # Check the patients table
        cursor.execute("SELECT password FROM patients WHERE patientEmail = %s", (email,))
        row = cursor.fetchone()
        if row:
            stored_password = row[0]
            if stored_password == password:
                return jsonify({'message': 'Login successful'})
            else:
                return jsonify({'error': 'Incorrect password'})
        
        # Check the medicalpractitioner table
        cursor.execute("SELECT password FROM medicalpractitioner WHERE practitionerEmail = %s", (email,))
        row = cursor.fetchone()
        if row:
            stored_password = row[0]
            if stored_password == password:
                return jsonify({'message': 'Login successful'})
            else:
                return jsonify({'error': 'Incorrect password'})

        # Email doesn't exist in both tables
        return jsonify({'error': 'Email does not exist'})
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run()
