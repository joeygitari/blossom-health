from flask import Blueprint, request, jsonify, session
import psycopg2
from datetime import datetime

# Define a Blueprint for recommendations
recommendations = Blueprint('recommendations', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@recommendations.route('/submit-recommendation', methods=['POST'])
def submit_recommendation():
    try:
        # Get practitioner ID from session
        practitionerid = session.get('user_id')
        if not practitionerid:
            return jsonify({'error': 'User not logged in'})

        # Get data from the request
        data = request.json
        patientid = data.get('patientid')
        recommendation = data.get('recommendation')

        # Insert data into the recommendation table
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO recommendations(practitionerid, patientid, recommendation, datecreated)
                    VALUES (%s, %s, %s, %s)
                """, (practitionerid, patientid, recommendation, datetime.now()))

        return jsonify({'message': 'Recommendation submitted successfully'})
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})
