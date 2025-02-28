# ECommerceUi

This project is frontend to [E-Commerce-App](https://github.com/DevDastider/E-commerce-App) project. It provides all the necessary functions for an e-commerce application. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Overview

This is an E-Commerce application built with Angular. The application allows users to browse products, add/remove products in/from cart, buy the products through RazorPay Payment gateway, view orders and also allows admin to list update inventory details, marking deliverd products, etc. It includes authentication and authorization features to ensure secure access to different parts of the application.

# Features

- **User Authentication**: Users can log in and register. The authentication service stores JWT tokens and user roles in local storage.
- **Role-Based Access Control**: The application supports different user roles (e.g., admin, user) and restricts access to certain routes based on the user's role.
- **Product Management**: Admins can add new products to the catalog.
- **Cart Management**: Users can add/remove product in/from cart to buy them. 2 options are provided for user to buy the product: Add to Cart & Buy now.
- **Order Management**: Users can view their orders, and admins can view all orders.
- **Navigation**: The application includes a header component that provides navigation links and displays the user's login status.
- **Payment**- Payment through Razorpay API.

## Services

### UserAuthService

The `UserAuthService` provides methods to manage user authentication and authorization:

- `setRoles(roles: [])`: Stores user roles in local storage.
- `getRoles(): []`: Retrieves user roles from local storage.
- `setToken(jwtToken: string)`: Stores the JWT token in local storage.
- `getToken(): string`: Retrieves the JWT token from local storage.
- `clear()`: Clears all data from local storage.
- `isLoggedIn(): boolean`: Checks if the user is logged in by verifying the presence of roles and a JWT token.
- `isAdmin(): boolean`: Checks if the user has an admin role.
- `isUser(): boolean`: Checks if the user has a user role.

### UserService

The `UserService` handles user-related operations such as login and registration.

## Components

### LoginComponent

The `LoginComponent` handles user login functionality:

- Submits the login form.
- Stores the JWT token and user roles in local storage upon successful login.
- Redirects users based on their roles.

### AppRoutingModule

The `AppRoutingModule` defines the routes for the application:

- `/admin`: Admin dashboard, accessible only to admin users.
- `/user`: User dashboard, accessible only to user roles.
- `/login`: Login page.
- `/forbidden`: Forbidden access page.
- `/addNewProduct`: Page for adding new products, accessible only to admin users.
- `/showProductDetails`: Page for showing product details, accessible only to admin users.
- `/productViewDetails`: Page for viewing product details.
- `/buyProduct`: Page for buying products, accessible only to user roles.
- `/orderConfirm`: Order confirmation page, accessible only to user roles.
- `/register`: User registration page.
- `/cart`: Cart page, accessible only to user roles.
- `/orders`: Page for viewing user orders, accessible only to user roles.
- `/allOrders`: Page for viewing all orders, accessible only to admin users.
- 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author

- **Sayantan Ghosh Dastider** - [DevDastider](https://github.com/DevDastider)
