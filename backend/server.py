from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.productRoutes import productRoutes
from controllers.productController import ProductController

# Initialize Flask app
app = Flask(__name__)

# Configure CORS to allow requests from your frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Register the product blueprint
app.register_blueprint(productRoutes, url_prefix='/api/v1/product')

# Handle preflight requests explicitly
@app.before_request
def handle_preflight():
    if request.method == 'OPTIONS':
        # Allow preflight requests
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response

# Catch-all route for debugging (optional)
@app.route('/api/v1/debug', methods=['GET', 'POST'])
def debug_endpoint():
    return jsonify({"message": "Debugging route working!"})

# Main entry point
if __name__ == '__main__':
    # Initialize any controllers or models
    ProductController.initialize()
    
    # Start the Flask server
    app.run(debug=True, port=3001)
