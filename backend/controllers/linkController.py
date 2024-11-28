from utils.appError import AppError
from models.linkSchema import LinkSchema
from flask import jsonify


class LinkController:
    @staticmethod
    def add_link(data, db):
        user_id = data.get("user_id")
        product_name = data.get("product_name")
        product_url = data.get("product_url")
        price = data.get("price")
        imgs_url = data.get("imgs_url")
        comments = data.get("comments")
        description = data.get("description", "")
        rating = data.get("rating", "")
        summerization = data.get("summerization")

        if not user_id or not product_name or not product_url or not price:
            raise AppError("Missing required fields: user_id, product_name, product_url, or price.", 400)

        link_model = LinkSchema(db)
        link = link_model.create_link(
            user_id, product_name, product_url, price, imgs_url, comments, description, rating, summerization
        )

        return jsonify({
            "status": "success",
            "message": "Link added successfully!",
            "link": {
                "id": str(link["_id"]),
                "product_name": link["product_name"],
                "product_url": link["product_url"],
                "price": link["price"],
                "imgs_url": link["imgs_url"],
                "comments": link["comments"],
                "description": link["description"],
                "rating": link["rating"],
                "summerization": link["summerization"]
            }
        }), 201

        
    @staticmethod
    def get_links(data, db):
        user_id = data.get("user_id")
        if not user_id:
            raise AppError("Missing required field: user_id", 400)
        link_model = LinkSchema(db)
        links = link_model.find_links_by_user_id(user_id)
        # Return the links in a JSON response
        return jsonify({
            "status": "success",
            "message": f"Links fetched for user ID {user_id}",
            "links": [
                {
                    "id": str(link["_id"]),
                    "product_name": link["product_name"],
                    "product_url": link["product_url"],
                    "price": link["price"],
                    "imgs_url": link["imgs_url"],
                    "comments": link["comments"],
                    "description": link["description"],
                    "rating": link["rating"],
                    "summerization": link["summerization"]
                }
                for link in links
            ]
        }), 200
    