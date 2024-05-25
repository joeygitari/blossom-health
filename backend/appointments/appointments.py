from flask import Blueprint, request, jsonify, session
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

# Define a Blueprint
appointments_blueprint = Blueprint('appointments', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(
        host=db_host,
        database=db_name,
        user=db_user,
        password=db_password
    )
    return conn

@appointments_blueprint.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    practitionerid = session.get('user_id')
    if not practitionerid:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Convert the date and time to the correct format
        datescheduled = datetime.strptime(data['datescheduled'], '%Y-%m-%d').date()
        timescheduled = datetime.strptime(data['timescheduled'], '%H:%M:%S').time()
        
        cursor.execute(
            """
            INSERT INTO appointments (patientid, practitionerid, datescheduled, timescheduled, location, visittype, selectedtype)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING appointmentid;
            """,
            (data['patientid'], practitionerid, datescheduled, timescheduled, data['location'], data['visittype'], data['selectedtype'])
        )
        appointmentid = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'appointmentid': appointmentid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointments_blueprint.route('/appointments', methods=['GET'])
def get_appointments():
    practitionerid = session.get('user_id')
    if not practitionerid:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            """
            SELECT * FROM appointments WHERE practitionerid = %s;
            """,
            (practitionerid,)
        )
        appointments = cursor.fetchall()

        # Convert timescheduled to a string format suitable for display
        for appointment in appointments:
            appointment['timescheduled'] = appointment['timescheduled'].strftime('%H:%M:%S')
            appointment['datescheduled'] = appointment['datescheduled'].strftime('%Y-%m-%d')
            
        cursor.close()
        conn.close()
        return jsonify(appointments), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointments_blueprint.route('/patient-appointments', methods=['POST'])
def create_patient_appointment():
    data = request.json
    patientid = session.get('user_id')
    if not patientid:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Convert the date and time to the correct format
        datescheduled = datetime.strptime(data['datescheduled'], '%Y-%m-%d').date()
        timescheduled = datetime.strptime(data['timescheduled'], '%H:%M:%S').time()
        
        cursor.execute(
            """
            INSERT INTO appointments (patientid, practitionerid, datescheduled, timescheduled, location, visittype, selectedtype)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING appointmentid;
            """,
            (patientid, data['practitionerid'], datescheduled, timescheduled, data['location'], data['visittype'], data['selectedtype'])
        )
        appointmentid = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'appointmentid': appointmentid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointments_blueprint.route('/patient-appointments', methods=['GET'])
def get_patient_appointments():
    patientid = session.get('user_id')
    if not patientid:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            """
            SELECT * FROM appointments WHERE patientid = %s;
            """,
            (patientid,)
        )
        appointments = cursor.fetchall()

        # Convert timescheduled to a string format suitable for display
        for appointment in appointments:
            appointment['timescheduled'] = appointment['timescheduled'].strftime('%H:%M:%S')
            appointment['datescheduled'] = appointment['datescheduled'].strftime('%Y-%m-%d')
            
        cursor.close()
        conn.close()
        return jsonify(appointments), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500