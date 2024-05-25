from flask import Blueprint, request, jsonify, session
import psycopg2

# Define a Blueprint for practitioners
practitioners = Blueprint('practitioners', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@practitioners.route('/practitioners', methods=['GET'])
def get_practitioners():
    try:
        with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM medicalpractitioner")
                practitioners = cursor.fetchall()
        return jsonify(practitioners)
    except psycopg2.Error as e:
        return jsonify({'error': 'Database error: ' + str(e)})
    except Exception as e:
        return jsonify({'error': str(e)})