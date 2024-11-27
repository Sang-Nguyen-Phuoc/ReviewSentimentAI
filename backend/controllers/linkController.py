from utils.appError import AppError
from models.linkSchema import LinkSchema
from flask import jsonify


class LinkController:
    @staticmethod
    def add_link(data, db):
        user_id = data.get("user_id")
        product_name = data.get("product_name")
        product_url = data.get("product_url")

        if not user_id or not product_name or not product_url:
            raise AppError("Missing required fields: user_id, product_name, or product_url.", 400)

        link_model = LinkSchema(db)
        link = link_model.create_link(user_id, product_name, product_url)

        return jsonify({
            "status": "success",
            "message": "Link added successfully!",
            "link": {
                "id": str(link["_id"]),
                "product_name": link["product_name"],
                "product_url": link["product_url"]
            }
        }), 201
        
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
                    "product_url": link["product_url"]
                }
                for link in links
            ]
        }), 200