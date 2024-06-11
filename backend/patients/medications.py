from flask import Blueprint, request, jsonify, session
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

# Define a Blueprint
medications_blueprint = Blueprint('medications', __name__)

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

@medications_blueprint.route('/medications', methods=['POST'])
def add_medication():
    data = request.json
    medicationname = data.get('medicationname')
    condition = data.get('condition')
    medicationtype = data.get('medicationtype')
    strengthunit = data.get('strengthunit')
    strength = data.get('strength')
    prescribedby = data.get('prescribedby')

    patientid = session.get('user_id')

    if not patientid:
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Convert the date and time to the correct format
        startdate = datetime.strptime(data['startdate'], '%Y-%m-%d').date()
        enddate = datetime.strptime(data['enddate'], '%Y-%m-%d').date()
        
        cursor.execute(
            """
            INSERT INTO medications (patientid, medicationname, medicationcondition, medicationtype, strengthunit, strength, startdate, enddate, prescribedby)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING medicationid;
            """,
            (patientid, medicationname, condition, medicationtype, strengthunit, strength, startdate, enddate, prescribedby)
        )
        medicationid = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'medicationid': medicationid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medications_blueprint.route('/medications', methods=['GET'])
def get_medications():
    patientid = session.get('user_id')
    if not patientid:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            """
            SELECT * FROM medications WHERE patientid = %s;
            """,
            (patientid,)
        )
        medications = cursor.fetchall()

        for medication in medications:
            medication['startdate'] = medication['startdate'].strftime('%d %b %Y')
            medication['enddate'] = medication['enddate'].strftime('%d %b %Y')
            
        cursor.close()
        conn.close()
        return jsonify(medications), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@medications_blueprint.route('/medications/<int:medication_id>/status', methods=['PATCH'])
def update_medication_status(medication_id):
    data = request.json
    patientid = session.get('user_id')
    if not patientid:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            UPDATE medications SET status = %s WHERE medicationid = %s AND patientid = %s;
            """,
            (data['status'], medication_id, patientid)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500