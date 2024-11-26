from werkzeug.security import generate_password_hash

class UserSchema:
    def __init__(self, db=None):
        # Initialize the collection with db if provided, else None
        self.collection = db['users'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_user(self, email, password, links):
        if self.collection is None:  # Explicitly check if collection is None
            raise ValueError("Database collection not initialized.")

        # Debug print to confirm collection type
        print("Collection type:", type(self.collection))

        # Check if the user already exists
        if self.collection.find_one({"email": email}):  # Ensure self.collection is correct
            raise ValueError("Email already exists")

        # Hash password
        hashed_password = generate_password_hash(password)

        # Create user document
        user = {
            "email": email,
            "password": hashed_password,
            "links": links  # Include the links provided by the user
        }
        self.collection.insert_one(user)
        return user

    def find_user_by_email(self, email):
        if self.collection is None:  # Explicitly check if collection is None
            raise ValueError("Database collection not initialized.")
        
        # Debug print to confirm collection type
        print("Collection type:", type(self.collection))

        return self.collection.find_one({"email": email})  # Ensure self.collection is correct
