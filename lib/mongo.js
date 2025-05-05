import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local",
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { client: null };
}

async function connect() {
  if (cached.client) {
    return cached.client;
  }

  const client = new MongoClient(MONGO_URL);
  client.connect();

  cached.client = client;

  return client;
}

export default connect;
