from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.registration_db
users_collection = db.users

@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")

    # Validation
    if not name or not email or not password or not confirm_password:
        return jsonify({"message": "All fields are required."}), 400

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match."}), 400

    # Check if email already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists."}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    # Save the user in the database
    user = {
        "name": name,
        "email": email,
        "password": hashed_password
    }
    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully!"}), 201

# Run the Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000 )
