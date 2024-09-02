export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

interface User {
    UserID?: string;
    Name: string;
    Email: string;
    DOB: string;
}

export const validateUser = ({ UserID, Name, Email, DOB }: User) => {
    if (!UserID || !Name || !Email || !DOB) {
        throw new ValidationError('Missing required fields');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        throw new ValidationError('Invalid email format');
    }
    if (isNaN(Date.parse(DOB))) {
        throw new ValidationError('Invalid date of birth');
    }
};
