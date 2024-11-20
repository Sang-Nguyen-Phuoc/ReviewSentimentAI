from controllers.productController import ProductController
from flask import Blueprint

productRoutes = Blueprint('userRoutes', __name__)

@productRoutes.route('/', methods=['GET'])
def getCommentsOfProducts():
    return ProductController.getCommentsOfProducts()