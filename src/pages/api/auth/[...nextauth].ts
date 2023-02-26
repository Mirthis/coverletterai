import NextAuth, { type NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { env } from "~/env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // async signIn({ account, profile }) {
    //   if (account && account.provider === "google") {
    //     return profile.email_verified;
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    // brandColor: "", // Hex color code
    // logo: "", // Absolute URL to image
    // buttonText: "" // Hex color code
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     scope: "r_liteprofile r_emailaddress",
      //   },
      // },
      // profile: (profileData) => {
      //   console.log({ profileData });

      //   return {
      //     id: profileData.id,
      //     name:
      //       profileData.localizedFirstName +
      //       " " +
      //       profileData.localizedLastName,
      //     email: null,
      //   };
      // },
    }),
  ],
};

export default NextAuth(authOptions);
