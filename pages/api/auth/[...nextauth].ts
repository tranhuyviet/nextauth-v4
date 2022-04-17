import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      const signinUser = {
        name: user.name,
        email: user.email,
        image: user.image,
        provider: account.provider,
      };
      try {
        const { data } = await axios.post("/users/signup", signinUser);
        if (data.status !== "success" || data.data.user.banned) {
          return false;
        }
      } catch (error) {
        // console.log("ERRORRRRRR", error);
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});
