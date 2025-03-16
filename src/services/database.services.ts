import { Collection, Db, MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { ObjectId } from 'mongodb';
import User from '@/models/schemas/User.schemas';
config();
const encodePassword = encodeURIComponent(process.env.DB_PASSWORD as string);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${encodePassword}@cluster0.w4kit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

class DatabaseService {
  private static instance: DatabaseService;
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(`${process.env.DB_NAME}`);
  }

  public static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect() {
    try {
      await this.client.connect();
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    } finally {
      // await this.client.close();
    }
  }

  public async getClient() {
    return this.client;
  }
  public async getUserById(id: string) {
    const user = await this.db.collection('users').findOne({ _id: new ObjectId(id) });
    return user;
  }
  public get users(): Collection<User> {
    return this.db.collection('users');
  }
}

const databaseService = DatabaseService.getInstance();
export default databaseService;
