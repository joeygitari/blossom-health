from flask import Flask

app = Flask(__name__)

# members api route
@app.route("/members")
def members():
    return {"members": ["Test 1", "Test 2", "Test 3"]}

if __name__ == "__main__":
    app.run(debug=True)