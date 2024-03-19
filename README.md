# Products API

This API provides endpoints for managing products within a product catalog. It supports functionalities such as uploading product information, updating product details, deleting products, retrieving products, and filtering products by category.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/emmanuelomejua/dapper_backend/tree/productsBranch.git
   ```

2. Install dependencies:

   ```bash
   cd dapper_backend
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:
   
   ```plaintext
   MONGODB_URI="mongodb+srv://username:password@cluster0.dobfa6u.mongodb.net/"
   PORT=5000
   JWT_SECRET="your_jwt_secret_here"
   CLOUD_NAME='your_cloudinary_cloud_name'
   API_KEY='your_cloudinary_api_key'
   API_SECRET='your_cloudinary_api_secret'
   ```
   
## Important Environment Variables

- `PORT`: The port on which the server will listen for incoming requests.
- `MONGODB_URI`: The MongoDB connection URI for connecting to the database.
- `JWT_SECRET`: A secret key used for JWT token generation and verification
- `CLOUD_NAME`: Your Cloudinary API key for authentication and access to Cloudinary services.
- `API_KEY:`: Username of the company email account (for sending emails).
- `API_SECRET`: Your Cloudinary API secret for secure communication with Cloudinary services.

## Endpoints

### Product Upload Endpoint

This endpoint allows users to upload new product information by providing details such as name, description, price, and category. Upon successful upload, it creates a new product entry in the database and returns a success message along with the details of the newly created product.

- **Method**: `POST`
- **Route**: `/api/products/upload`
- **Request Body**:
  ```json
  {
   "name": "Jaja",
  "description": "A beautifully designed mainnet",
  "price": 300000,
  "category": "children"
  }
  ```
- **Response**:
  ```json
  {
     "message": "Product Created Successfully",
  "product": {
      "name": "Jum",
      "description": "A beautifully designed mainnet",
      "price": 300000,
      "category": "children",
      "images": [],
      "_id": "a4692726-fd3c-4e28-ba67-054ca665044c",
      "__v": 0
  }
  ```

### Product Images Upload Endpoint

This endpoint allows users to upload images for a specific product identified by its unique ID. Users can provide one or more images using form-data. Upon successful upload, it adds the images to the specified product and returns a success message along with the updated product details.


- **Method**: `PUT`
- **Route**: `/api/products/upload-images/:productId`
- **Request Body**:
  ```json
  {
    curl --location --request PUT 'localhost:5000/api/products/upload-images/65f72a7e901650b8ce14e8e0' \
    --form 'images=@"/C:/Users/solaf/OneDrive/Pictures/Screenshots/C17_Q1_fadexadex.png"'
  }
  ```
- **Response**:
  ```json
  {
    "message": "Images Uploaded Successfully",
    "product": {
        "_id": "65f72a7e901650b8ce14e8e0",
        "name": "Firebong",
        "description": "Well distributed ways",
        "price": 10000,
        "category": "Children",
        "images": [
            {
                "url": "https://res.cloudinary.com/dwl6lr9vq/image/upload/v1710791072/aleafocaudfpl425syuu.png",
                "resource_type": "auto"
            }
        ],
        "__v": 0
    }
  ```

### Delete Product Endpoint

This endpoint allows users to delete a product from the system by providing the product's unique identifier. Upon successful deletion, it returns a success message indicating that the product was deleted successfully.

- **Method**: `DELETE`
- **Route**: `/api/products/delete/:productId`
- **Response**:
  ```json
  {
   "message": "Product Deleted Successfully"
  }
  ```

### Edit Product Endpoint

This endpoint allows users to edit the details of an existing product by providing the product's unique identifier (`productId`). Users can update fields such as name, description, price, and category. Upon successful update, it returns a success message along with the updated product details.

- **Method**: `PUT`
- **Route**: `/api/products/edit/:productId`
- **Request Body**:
  ```json
  {
    "name": "Newname",
    "description": "New description",
    "price": 10000,
    "category": "adult"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Product Updated Successfully",
    "product": {
        "_id": "65f93957ed860707fe984ab6",
        "name": "Newname",
        "description": "New description",
        "price": 10000,
        "category": "adult",
        "images": [],
        "__v": 0
    }
  }
  ```

### Get Products Endpoint

This endpoint retrieves a list of all products available in the system.

- **Method**: `GET`
- **Route**: `/api/products`
- **Response**:
  ```json
  {
        "products": [
        {
            "_id": "65f93957ed860707fe984ab6",
            "name": "aja",
            "description": "A beautifully designed mainnet",
            "price": 300000,
            "category": "children",
            "images": [],
            "__v": 0
        }
    ]
  }
  ```

### Filter Products by Category Endpoint

This endpoint retrieves a list of products filtered by a specific category.

- **Method**: `GET`
- **Route**: `/api/products/filter/:category`
- **Response**:
  ```json
  {
    "products": [
        {
            "_id": "65f93957ed860707fe984ab6",
            "name": "aja",
            "description": "A beautifully designed mainnet",
            "price": 300000,
            "category": "children",
            "images": [],
            "__v": 0
        }
    ]
  }
  ```

body-parser: For parsing incoming request bodies.
cloudinary: For cloud-based image storage and management.
cors: For enabling Cross-Origin Resource Sharing (CORS).
dotenv: For loading environment variables from a .env file.
express: For building web applications and APIs.
joi: For data validation and schema definition.
joi-validator: For validating data using Joi schemas.
morgan: For logging HTTP requests.
multer: For handling multipart/form-data, primarily used for file uploads.
sharp: For image processing and manipulation.

## Dependencies

- `body-parser`: For parsing incoming request bodies.
- `cloudinary`: For cloud-based image storage and management.
- `dotenv`: For loading environment variables from a .env file.
- `express`: For building web applications and APIs.
- `joi`: For data validation and schema definition.
- `multer`: For handling multipart/form-data, primarily used for file uploads.
- `sharp`: For image processing and manipulation.

## Usage

To start the server, run:

```bash
nodemon server.js
```

Feel free to modify and extend the functionality as needed for your project!
