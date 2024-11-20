from flask import Flask, request, jsonify
from routes.productRoutes import productRoutes

app = Flask(__name__)

app.register_blueprint(productRoutes, url_prefix='/api/v1/product')

if __name__ == '__main__':
    app.run(debug=True, port=3000)