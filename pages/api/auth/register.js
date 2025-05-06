import { MongoClient } from 'mongodb';
import connect from '@/lib/mongo';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;

  try {
    const client = await connect();

    const existingUser = await client
      .db('demostrator-forms')
      .collection('users')
      .findOne({ Correo: data.Correo });

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.Contraseña, saltRounds);

    const newUser = {
      ...data,
      Contraseña: hashedPassword, 
      repetirContraseña: undefined
    };

    const result = await client
      .db('demostrator-forms')
      .collection('users')
      .insertOne(newUser);

    console.log(`Usuario creado con _id: ${result.insertedId}`);
    res.status(201).json({ message: "Usuario creado" });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
