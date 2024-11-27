from bson import ObjectId

class LinkSchema:
    def __init__(self, db=None):
        self.collection = db['links'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_link(self, user_id, product_name, product_url):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")

        # Validate user_id
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format.")

        # Create link document
        link = {
            "user_id": ObjectId(user_id),
            "product_name": product_name,
            "product_url": product_url
        }
        inserted = self.collection.insert_one(link)
        link["_id"] = inserted.inserted_id
        return link

    def find_links_by_user_id(self, user_id):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format.")
        return list(self.collection.find({"user_id": ObjectId(user_id)}))
