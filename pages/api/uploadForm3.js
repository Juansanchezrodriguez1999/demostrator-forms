//import schema from '@/schema/samples.js';
import { MongoClient } from 'mongodb';
//import { getSession } from 'next-auth/react';

import connect from '@/lib/mongo';

export default async function handler(req, res) {
  const data = req.body;
    try {
      const client = await connect();
      const document = await client.db('demostrator-forms').collection('form3').findOne({ _id: data._id });
      if (document) {
        res.status(409).end();
      } else {
        const collection = await client.db('demostrator-forms').collection('form3');
        const result = await collection.insertOne(data);
        console.log(`A document was inserted with _id: ${result.insertedId}`);
        res.status(200).end(`${result.insertedId}`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
