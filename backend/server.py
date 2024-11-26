from flask import Flask
from routes.productRoutes import productRoutes
from controllers.productController import ProductController
from routes.authRoutes import authRoutes
from data.database import Database

app = Flask(__name__)

# Initialize database instance
db_instance = Database()

try:
    db = db_instance.get_database()

    # Register blueprints
    app.register_blueprint(productRoutes, url_prefix='/api/v1/product')
    app.register_blueprint(authRoutes, url_prefix='/api/v1/auth')

    if __name__ == '__main__':
        ProductController.initialize()
        app.run(debug=True, port=3000)
except Exception as e:
    print(f"Failed to start the server: {str(e)}")
finally:
    db_instance.close_connection()  # Ensure database connection is closed
