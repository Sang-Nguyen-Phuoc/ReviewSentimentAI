import re
from urllib.parse import urlparse
from utils.appError import AppError
from models.userSchema import UserSchema
from flask import jsonify
from werkzeug.security import check_password_hash

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

class AuthController:
    @staticmethod
    def signup(data, db):
        # Initialize UserSchema with the database
        user_model = UserSchema(db)

        email = data.get("email")
        password = data.get("password")

        # Validate email format
        if not is_valid_email(email):
            raise AppError("Invalid email format.", 400)

    
        # Create the user using UserSchema
        try:
            user = user_model.create_user(email, password)
        except ValueError as e:
            raise AppError(str(e), 400)

        # Return a valid response using jsonify
        return jsonify({
            "status": "success",
            "message": "User signed up successfully!",
            "user": {
                "id": str(user["_id"]),  # Convert ObjectId to string for JSON
                "email": user["email"]
            }
        }), 201  # Ensure status code 201 for successful creation
    def signin(data, db):
        # Initialize UserSchema with the database
        user_model = UserSchema(db)

        email = data.get("email")
        password = data.get("password")

        # Validate email and password presence
        if not email or not password:
            raise AppError("Email and password are required.", 400)

        # Validate email format
        if not is_valid_email(email):
            raise AppError("Invalid email format.", 400)

        # Find the user in the database
        user = user_model.find_user_by_email(email)
        if not user:
            raise AppError("Invalid credentials: User not found.", 401)

        # Check if the provided password matches the stored hash
        if not check_password_hash(user["password"], password):
            raise AppError("Invalid credentials: Incorrect password.", 401)

        # Return a success response
        return jsonify({
            "status": "success",
            "message": "Sign-in successful!",
            "user": {
                "id": str(user["_id"]),  # Convert ObjectId to string
                "email": user["email"]
            }
        }), 200

