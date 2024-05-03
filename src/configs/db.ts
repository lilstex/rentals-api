import mongoose from 'mongoose';
import config from './env';

class DatabaseManager {
  private DATABASE_URL: string;

  constructor() {
    const { env, dbProdUrl, dbUrl } = config;
    this.DATABASE_URL = env === 'production' ? dbProdUrl : dbUrl;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Error connecting to Database:', error);
    }
  }
}

const databaseManager = new DatabaseManager();
export = databaseManager;
