import { APIGatewayProxyHandler } from 'aws-lambda';
import {DynamoDB} from 'aws-sdk'
import { handleError } from '../utils/handleError';
import logger from '../utils/logger';
import { config } from '../config/loadEnv';

const dynamoDb = new DynamoDB.DocumentClient();

export const getUser: APIGatewayProxyHandler = async (event) => {
    try {
        logger.info('GetUser function called', { event });

        const { UserID } = event.pathParameters!;

        const params = {
            TableName: config.USER_TABLE, // Use USER_TABLE from environment variable
            Key: { UserID },
        };

        const result = await dynamoDb.get(params).promise();

        if (!result.Item) {
            logger.info('User not found', { UserID });
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        logger.error('Error retrieving user', { error });
        return handleError(error);
    }
};
