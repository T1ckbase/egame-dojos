import { MongoClient } from 'mongodb';

const dbUri = Deno.env.get('MONGODB_URI')!;
const client = new MongoClient(dbUri);

export async function connectDB() {
  if (!client.db) {
    await client.connect();
    console.log('MongoDB is connected');
  }
  return client.db('egame');
}
