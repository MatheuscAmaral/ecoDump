import { PrismaClient } from './generated/prisma'
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create and export the Prisma client instance
export const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
}); 
