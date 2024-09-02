import { APIGatewayProxyHandler } from 'aws-lambda';
import {DynamoDB} from 'aws-sdk'
import { validateUser } from '../utils/validateUser';
import { handleError } from '../utils/handleError';
import logger from '../utils/logger';
import { config } from '../config/loadEnv';

const dynamoDb = new DynamoDB.DocumentClient();

interface User {
  Name: string;
  Email: string;
  DOB: string;
}

export const updateUser: APIGatewayProxyHandler = async (event) => {
  try {
    logger.info('UpdateUser function called', { event });

    const { UserID } = event.pathParameters!;
    const { Name, Email, DOB }: User = JSON.parse(event.body as string);
    validateUser({ UserID, Name, Email, DOB });

    const params = {
      TableName: config.USER_TABLE, // Use USER_TABLE from environment variable
      Key: { UserID },
      UpdateExpression: 'set #name = :name, email = :email, dob = :dob',
      ExpressionAttributeNames: { '#name': 'Name' },
      ExpressionAttributeValues: {
        ':name': Name,
        ':email': Email,
        ':dob': DOB,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    logger.error('Error updating user', { error });
    return handleError(error);
  }
};
