import re
from urllib.parse import urlparse
from utils.appError import AppError
from models.userSchema import UserSchema
from flask import jsonify

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])  # Check if scheme and netloc exist
    except ValueError:
        return False

class AuthController:
    @staticmethod
    def signup(data, db):
        # Initialize UserSchema with the database
        user_model = UserSchema(db)

        email = data.get("email")
        password = data.get("password")
        links = data.get("links", [])

        # Validate email format
        if not is_valid_email(email):
            raise AppError("Invalid email format.", 400)

        # Validate links
        for idx, link in enumerate(links):
            if not is_valid_url(link):
                raise AppError(f"Invalid link at index {idx}: {link}", 400)

        # Create the user using UserSchema
        try:
            user = user_model.create_user(email, password, links)
        except ValueError as e:
            raise AppError(str(e), 400)

        # Return a valid response using jsonify
        return jsonify({
            "status": "success",
            "message": "User signed up successfully!",
            "user": {
                "email": user["email"],
                "links": user["links"]
            }
        }), 201  # Ensure status code 201 for successful creation

