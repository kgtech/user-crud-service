Certainly! Here’s the `README.md` content in plain text:

---

# User CRUD Microservice

This project is a CRUD (Create, Read, Update, Delete) microservice for user management. It is built using the Serverless Framework, AWS Lambda, API Gateway, and DynamoDB. The service is written in TypeScript and leverages environment variables for configuration.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Configuration](#configuration)
- [Running the Service Locally](#running-the-service-locally)
- [Deploying the Service](#deploying-the-service)
- [Running Tests](#running-tests)
- [Linting](#linting)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [AWS CLI](https://aws.amazon.com/cli/) (configured with your credentials)
- [Serverless Framework](https://www.serverless.com/)

You can install the Serverless Framework globally using npm:

```bash
npm install -g serverless
```

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kgtech/user-crud-service.git
   cd user-crud-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of your project and add your configuration. You can use the provided `.env.example` as a template.

   ```bash
   cp .env.example .env
   ```

   Then, open `.env` and configure it according to your needs.

## Configuration

- **`.env` File**: This file contains environment-specific settings like table names and pagination limits.

  Example:

  ```env
  # .env

  USER_TABLE=Users
  ORDER_TABLE=Orders
  PRODUCT_TABLE=Products

  USER_PAGINATION_LIMIT=10
  ```

- **TypeScript Configuration**: The `tsconfig.json` file contains the TypeScript compiler options.

## Running the Service Locally

To run the service locally for development and testing purposes:

```bash
npm run start
```

This command will start the Serverless service locally using the `serverless-offline` plugin, allowing you to invoke functions via HTTP requests.

## Deploying the Service

To deploy the service to AWS:

```bash
npm run deploy
```

This command will use the Serverless Framework to deploy your service to AWS Lambda, API Gateway, and DynamoDB.

## Running Tests

To run the test suite:

```bash
npm run test
```

This project uses Jest for unit testing. Ensure that you have written tests in the `__tests__` directory.

## Linting

To check your code for linting errors:

```bash
npm run lint
```

This command will run ESLint against your TypeScript code to ensure it adheres to the coding standards defined in the `.eslintrc` configuration.

## Environment Variables

The service relies on environment variables defined in the `.env` file for configuration. Key environment variables include:

- **USER_TABLE**: The name of the DynamoDB table used to store user data.
- **ORDER_TABLE**: The name of the DynamoDB table used to store order data.
- **PRODUCT_TABLE**: The name of the DynamoDB table used to store product data.
- **USER_PAGINATION_LIMIT**: The default pagination limit for listing users.

## Folder Structure

```
user-crud-service/
│
├── .env                    # Environment configuration file
├── .env.example            # Example environment configuration file
├── .gitignore              # Git ignore file
├── __tests__/              # Unit tests directory
│   ├── createUser.test.ts  # Test for createUser function
│   ├── getUser.test.ts     # Test for getUser function
│   ├── updateUser.test.ts  # Test for updateUser function
│   └── deleteUser.test.ts  # Test for deleteUser function
│
├── src/                    # Source code directory
│   ├── handlers/           # Lambda function handlers
│   │   ├── createUser.ts   # Handler for creating a user
│   │   ├── getUser.ts      # Handler for getting a user
│   │   ├── updateUser.ts   # Handler for updating a user
│   │   ├── deleteUser.ts   # Handler for deleting a user
│   │   └── listUsers.ts    # Handler for listing users
│   │
│   ├── utils/              # Utility functions
│   │   ├── validateUser.ts # User input validation logic
│   │   ├── handleError.ts  # Error handling logic
│   │   └── logger.ts       # Logger utility
│   │
│   └── config/             # Configuration files
│       └── loadEnv.ts      # Load environment variables
│
├── serverless.yml          # Serverless Framework configuration file
├── tsconfig.json           # TypeScript configuration file
└── package.json            # Project metadata and scripts
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This is the full text of the README that outlines the setup, configuration, and usage of the User CRUD microservice.