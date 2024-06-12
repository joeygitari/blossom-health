from flask import Blueprint, request, jsonify, current_app, url_for
from flask_mail import Message
import psycopg2
import hashlib
from itsdangerous import URLSafeTimedSerializer

reset_password = Blueprint('reset_password', __name__)

# Database connection details
db_host = 'localhost'
db_name = 'blossom_health'
db_user = 'joanne'
db_password = ''

@reset_password.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.json  # Ensure request.json is used to parse JSON data
        email = data.get('email')
        s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        token = s.dumps(email, salt='password-reset-salt')
        
        # Ensure the reset URL points to the frontend route
        reset_url = f"http://localhost:3000/reset/{token}"
        
        # Send email with reset link
        msg = Message('Password Reset Request', recipients=[email])
        msg.body = f"Please click the link to reset your password: {reset_url}"
        mail = current_app.extensions.get('mail')
        mail.send(msg)

        return jsonify({'message': 'Password reset link sent to your email'})

    except Exception as e:
        return jsonify({'error': str(e)})

@reset_password.route('/reset/<token>', methods=['GET', 'POST'])
def reset_with_token(token):
    try:
        s = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        email = s.loads(token, salt='password-reset-salt', max_age=3600)
        if request.method == 'POST':
            data = request.json  # Ensure request.json is used to parse JSON data
            new_password = data.get('password')
            hashed_password = hashlib.sha256(new_password.encode()).hexdigest()

            with psycopg2.connect(host=db_host, dbname=db_name, user=db_user, password=db_password) as conn:
                with conn.cursor() as cursor:
                    cursor.execute("UPDATE patients SET password = %s WHERE patientemail = %s", (hashed_password, email))
                    cursor.execute("UPDATE medicalpractitioner SET password = %s WHERE practitioneremail = %s", (hashed_password, email))
                    conn.commit()

            return jsonify({'message': 'Password reset successful'})

        return '''
        <script>
            function handleSubmit(event) {
                event.preventDefault();
                const password = document.getElementById("password").value;
                fetch(location.href, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert(data.message);
                        window.location.href = "/login";  // Redirect to login page
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred. Please try again later.");
                });
            }
        </script>
        <form onsubmit="handleSubmit(event)">
            <input type="password" id="password" name="password" placeholder="Enter your new password" required/>
            <button type="submit">Reset Password</button>
        </form>
        '''
    except Exception as e:
        return jsonify({'error': str(e)})
