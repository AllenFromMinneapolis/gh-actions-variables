import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  console.log('Trying to connect to db');

  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    return client.db(dbName);
  } catch (error) {
    console.log('Connection failed.', error);
    await client.close();
    console.log('Connection closed.');
    throw error;
  }
}

export default connectToDatabase;


