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
        user._id = data.data.user._id;
        user.role = data.data.user.role;
        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user, account }) {
      // console.log("JWT TOKEN", token);
      // console.log("JWT USER", user);
      // console.log("JWT ACCOUNT  ", account);

      if (account) {
        token.provider = account.provider;
      }
      if (user) {
        token._id = user._id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("SESSION TOKEN", token);
      if (token) {
        session.user._id = token._id as string;
        session.user.role = token.role as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
});
