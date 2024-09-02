import { APIGatewayProxyHandler } from 'aws-lambda';
import { handleError } from '../utils/handleError';
import logger from '../utils/logger';
import { config } from '../config/loadEnv';
import {DynamoDB} from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient();

export const deleteUser: APIGatewayProxyHandler = async (event) => {
    try {
        logger.info('DeleteUser function called', { event });

        const { UserID } = event.pathParameters!;

        const params = {
            TableName: config.USER_TABLE, // Use USER_TABLE from environment variable
            Key: { UserID },
        };

        await dynamoDb.delete(params).promise();
        logger.info('User deleted successfully', { UserID });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully' }),
        };
    } catch (error) {
        logger.error('Error deleting user', { error });
        return handleError(error);
    }
};
