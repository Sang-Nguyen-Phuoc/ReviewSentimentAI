from controllers.productController import ProductController
from flask import Blueprint, request, jsonify

from utils.appError import AppError

from utils.tikiAPIs import TikiAPIs

productRoutes = Blueprint('productRoutes', __name__)

@productRoutes.route('/', methods=['POST'])
async def getResults():
    try:
        product_url = request.json.get('product_url')

        if product_url is None:
            raise AppError('Please provide a product URL from tiki.vn', 400)
        
        # check if the product_url is a valid URL
        if not product_url.startswith('https://tiki.vn/'):
            raise AppError('Invalid product URL from tiki.vn', 400)

        product_id, spid, seller_id = TikiAPIs.getIDs(product_url)       
       
        comments = await ProductController.getCommentsOfProducts(product_id, spid, seller_id)       
        NEGs, POSs, NEUs =  ProductController.analyzeComments(comments)

        information =  ProductController.getInformation(product_id, spid, seller_id)

        return jsonify({
            "status": "success",
            "status_code": 200,
            "data": {
                "negative_comments": NEGs,
                "positive_comments": POSs,
                "neutral_comments": NEUs, 
                "information": information
            }
        }), 200
    except AppError as e:
        return jsonify(e.to_dict()), e.status_code 
    except Exception as e:
        return jsonify({
            "status": "fail",
            "status_code": 500,
            "message": str(e)
        }), 500