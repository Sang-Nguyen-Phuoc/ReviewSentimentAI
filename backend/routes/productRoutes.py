from controllers.productController import ProductController
from flask import Blueprint, request, jsonify

from utils.appError import AppError

productRoutes = Blueprint('userRoutes', __name__)

@productRoutes.route('/', methods=['GET'])
async def getResults():
    try:
        comments = await ProductController.getCommentsOfProducts(request.json.get('product_url'))       
        NEGs, POSs, NEUs = ProductController.analyzeComments(comments)
        return jsonify({
            "status": "success",
            "status_code": 200,
            "data": {
                "negative_comments": NEGs,
                "positive_comments": POSs,
                "neutral_comments": NEUs
            }
        })
    except AppError as e:
        return jsonify(e.to_dict())
    except Exception as e:
        return jsonify({
            "status": "fail",
            "status_code": 500,
            "message": str(e)
        })