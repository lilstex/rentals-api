import mongoose from 'mongoose';
import config from './env';

const { env, dbProdUrl, dbUrl  } = config;

const DATABASE_URL = env === 'production' ? dbProdUrl : dbUrl;

(async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }
})();

export = mongoose;