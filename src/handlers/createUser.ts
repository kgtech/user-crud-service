import { APIGatewayProxyHandler } from 'aws-lambda';
import {DynamoDB} from 'aws-sdk'
import { validateUser } from '../utils/validateUser';
import { handleError } from '../utils/handleError';
import logger from '../utils/logger';
import { config } from '../config/loadEnv';

const dynamoDb = new DynamoDB.DocumentClient();

interface User {
    UserID: string;
    Name: string;
    Email: string;
    DOB: string;
}

export const createUser: APIGatewayProxyHandler = async (event) => {
    try {
        logger.info('CreateUser function called', { event });

        const { UserID, Name, Email, DOB }: User = JSON.parse(event.body as string);
        validateUser({ UserID, Name, Email, DOB });

        const params = {
            TableName: config.USER_TABLE, // Use USER_TABLE from environment variable
            Item: { UserID, Name, Email, DOB },
        };

        await dynamoDb.put(params).promise();
        logger.info('User created successfully', { UserID });

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User created successfully' }),
        };
    } catch (error) {
        logger.error('Error creating user', { error });
        return handleError(error);
    }
};
