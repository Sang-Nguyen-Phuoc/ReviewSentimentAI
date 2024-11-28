from bson import ObjectId

class LinkSchema:
    def __init__(self, db=None):
        self.collection = db['links'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_link(self, user_id, product_name, product_url, price, imgs_url=None, comments=None, description="", rating="", summerization=None):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")

        # Validate user_id
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format.")

        # Default values for optional fields
        price = price if price else 0
        product_url = product_url if product_url else ""
        product_name = product_name if product_name else ""
        imgs_url = imgs_url if imgs_url else [""]
        comments = comments if comments else {"positive": [""], "neutral": [""], "negative": [""]}
        summerization = summerization if summerization else {"positive": "", "neutral": "", "negative": ""}

        # Create link document
        link = {
            "user_id": ObjectId(user_id),
            "product_name": product_name,
            "product_url": product_url,
            "price": price,
            "imgs_url": imgs_url,
            "comments": comments,
            "description": description,
            "rating": rating,
            "summerization": summerization
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
