import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        user: {},
      },
      authorize: async (credentials, req) => {
        const values = {
          email: credentials?.email,
          password: credentials?.password,
        };
        try {
          // login
          const { data } = await axios.post("/users/login", values);
          console.log(data);
          if (data.status === "success") return data.data.user;
        } catch (error: any) {
          throw new Error(JSON.stringify(error?.response?.data?.errors));
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (user.provider === "credentials") {
        return true;
      } else {
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
      }
    },
    async jwt({ token, user, account }) {
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
      if (token) {
        session.user._id = token._id as string;
        session.user.role = token.role as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
});
