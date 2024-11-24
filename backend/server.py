from flask import Flask
from routes.productRoutes import productRoutes
from controllers.productController import ProductController

app = Flask(__name__)

app.register_blueprint(productRoutes, url_prefix='/api/v1/product')

if __name__ == '__main__':
    ProductController.initialize()
    app.run(debug=True, port=3000)