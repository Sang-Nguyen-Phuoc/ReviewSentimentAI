from utils.appError import AppError
from models.userSchema import UserSchema
from flask import jsonify
class AuthController:
    @staticmethod
    def signup(data, db):
        try:
            user_model = UserSchema(db)

            email = data.get("email")
            password = data.get("password")
            user_model.create_user(email, password)

            # Return success response
            return jsonify({
                "status": "success",
                "message": "User signed up successfully!"
            }), 201

        except AppError as e:
            return jsonify(e.to_dict()), e.status_code


    @staticmethod
    def signin(data, db):
        try:
            user_model = UserSchema(db)

            email = data.get("email")
            password = data.get("password")


            # Fetch user and validate credentials
            user = user_model.find_user(email, password)

            # Return success response
            return jsonify({
                "status": "success",
                "message": "Sign-in successful!",
                "data": {
                    "id": str(user["_id"]),
                    "email": user["email"]
                }
            }), 200

        except AppError as e:
            return jsonify(e.to_dict()), e.status_code