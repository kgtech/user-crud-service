import { APIGatewayProxyHandler } from 'aws-lambda';
import {DynamoDB} from 'aws-sdk'
import { handleError } from '../utils/handleError';
import logger from '../utils/logger';
import { config } from '../config/loadEnv';

const dynamoDb = new DynamoDB.DocumentClient();

export const listUsers: APIGatewayProxyHandler = async (event) => {
    try {
        logger.info('ListUsers function called', { event });

        const params = {
            TableName: config.USER_TABLE, // Use USER_TABLE from environment variable
            Limit: config.USER_PAGINATION_LIMIT, // Use limit from environment variable
            ExclusiveStartKey: event.queryStringParameters?.LastEvaluatedKey || null,
        };

        const result = await dynamoDb.scan(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                users: result.Items,
                lastEvaluatedKey: result.LastEvaluatedKey, // Use this key for the next page
            }),
        };
    } catch (error) {
        logger.error('Error listing users', { error });
        return handleError(error);
    }
};
