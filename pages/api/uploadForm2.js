//import schema from '@/schema/samples.js';
import { MongoClient } from 'mongodb';
//import { getSession } from 'next-auth/react';

import connect from '@/lib/mongo';

export default async function handler(req, res) {
  const data = req.body;
  console.log("hola")
  /*const validate = await schema.validate(data);
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthenticated' });
  } else if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
  } else if (validate.error) {
    res.status(400).json({ error: 'Bad request' });
  } else {*/
    try {
      const client = await connect();
      const document = await client.db('demostrator-forms').collection('form2').findOne({ _id: data._id });
      if (document) {
        res.status(409).end();
      } else {
        const collection = await client.db('demostrator-forms').collection('form2');
        const result = await collection.insertOne(data);
        console.log(`A document was inserted with _id: ${result.insertedId}`);
        res.status(200).end(`${result.insertedId}`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
//}
