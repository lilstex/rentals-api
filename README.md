# Rental API Documentation

Welcome to the Rental API documentation! This API will power a robust application that facilitates the process of renting houses. It allows users to find houses for rent and enables house agents or owners to list houses available for rent. With the application that will be powered by this API, users in need of a house to rent can easily connect with house agents or owners to facilitate transactions securely and efficiently.

## Overview

The Rental API provides endpoints for various functionalities including user authentication, house listing, searching for available houses, and managing user profiles. Below is an overview of the main features provided by the API:

- **User Authentication**: Users can register, log in, and manage their accounts securely.
- **House Listing**: House agents or owners can list their available houses for rent, providing details such as location, rent amount, number of bedrooms, and amenities.
- **House Searching**: Users can search for available houses based on various criteria such as location, rent amount, and number of bedrooms.
- **Profile Management**: Users can update their profiles, including personal information and contact details.

## Getting Started

To get started with using the Rental API, follow these steps:

1. **Installation**: Clone the repository and install the dependencies using npm or yarn.

```bash
git clone <repository-url>
cd rental-api
npm install
```

2. **Environment Configuration**: Create a `.env` file based on the provided `.env.example` file and configure the necessary environment variables.

3. **Database Setup**: Set up your database (e.g., MongoDB) and configure the connection details in the `.env` file.

4. **Start the Server**: Run the following command to start the server.

```bash
npm start
```

5. **Explore the API**: Access the API documentation to explore the available endpoints and their functionalities.

## API Endpoints

The Rental API provides the following endpoints:

- **Authentication Endpoints**:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `POST /api/auth/logout`: Log out the current user.
  - `POST /api/auth/forgot-password`: Send a password reset email to the user's email address.
  - `POST /api/auth/reset-password`: Reset the user's password using a reset token.

- **House Endpoints**:
  - `GET /api/houses`: Get a list of available houses.
  - `GET /api/houses/:id`: Get details of a specific house.
  - `POST /api/houses`: Create a new house listing.
  - `PUT /api/houses/:id`: Update details of a house listing.
  - `DELETE /api/houses/:id`: Delete a house listing.

- **User Profile Endpoints**:
  - `GET /api/profile`: Get the user's profile information.
  - `PUT /api/profile`: Update the user's profile information.

## Authentication

Authentication is required for certain endpoints to ensure the security of user data. When making requests to authenticated endpoints, include the user's access token in the request headers as follows:

```http
Authorization: Bearer <access-token>
```

## Error Handling

The API provides detailed error responses with appropriate status codes and error messages. When an error occurs, the response will include a JSON object with the following structure:

```json
{
  "status": false,
  "message": "Error message"
}
```

## Conclusion

The Rental API provides a powerful platform for users to find houses for rent and for house agents or owners to list their available properties. By following the documentation and utilizing the provided endpoints, you can easily integrate the API into your application and create a seamless experience for users seeking to rent houses. If you have any questions or issues, please refer to the API documentation or contact the support team for assistance. Happy renting!