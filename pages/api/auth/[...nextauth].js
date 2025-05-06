import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from '@/lib/mongo';
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Correo: { label: "Correo", type: "text" },
        Contraseña: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const client = await connect();
        const user = await client.db('demostrator-forms').collection('users').findOne({ Correo: credentials.Correo });
        console.log(user)
        if (!user) throw new Error("Correo no registrado");
        const isValid = await bcrypt.compare(credentials.Contraseña, user.Contraseña);
        if (!isValid) throw new Error("Contraseña incorrecta");
        return {
          id: user._id.toString(),
          name: user.Nombre || "",
          email: user.Correo,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
});
