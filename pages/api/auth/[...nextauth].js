import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NEXT_PUBLIC_SECRET } from "../../../config/config";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      secret: NEXT_PUBLIC_SECRET,
    }),
  ],
});
