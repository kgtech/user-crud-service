import { APIGatewayProxyResult } from 'aws-lambda';

export const handleError = (error: Error): APIGatewayProxyResult => {
    if (error.name === 'ValidationError') {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: error.message,
                },
            }),
        };
    }
    return {
        statusCode: 500,
        body: JSON.stringify({
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred. Please try again later.',
            },
        }),
    };
};
