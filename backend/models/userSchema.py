from werkzeug.security import generate_password_hash

class UserSchema:
    def __init__(self, db=None):
        self.collection = db['users'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_user(self, email, password):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")

        # Check if the user already exists
        if self.collection.find_one({"email": email}):
            raise ValueError("Email already exists")

        # Hash password
        hashed_password = generate_password_hash(password)

        # Create user document
        user = {
            "email": email,
            "password": hashed_password
        }
        inserted = self.collection.insert_one(user)
        user["_id"] = inserted.inserted_id  # Include ObjectID in response
        return user

    def find_user_by_email(self, email):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")
        return self.collection.find_one({"email": email})
