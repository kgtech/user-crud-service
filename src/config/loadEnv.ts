// src/config/loadEnv.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    USER_TABLE: process.env.USER_TABLE || 'Users',
    ORDER_TABLE: process.env.ORDER_TABLE || 'Orders',
    PRODUCT_TABLE: process.env.PRODUCT_TABLE || 'Products',
    USER_PAGINATION_LIMIT: parseInt(process.env.USER_PAGINATION_LIMIT || '10', 10),
};
