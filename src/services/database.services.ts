import { Collection, Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import User from "~/models/schemas/User.schema";

dotenv.config();
// dotenv.config({ path: "./config.env" });

const uri = process.env.DB_URI?.replace(
  "<username>",
  process.env.DB_USERNAME as string
).replace("<password>", process.env.DB_PASSWORD as string);

class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri as string);
    this.db = this.client.db(process.env.DB_NAME);
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_COLLECTION_USERS as string);
  }
}

const databaseService = new DatabaseService();
export default databaseService;