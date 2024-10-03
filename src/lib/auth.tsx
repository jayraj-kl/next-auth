import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

let GLOBAL_ID = 1;

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "example@example.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any) {
              if (!credentials) {
                console.log("No credentials provided");
                return null;
              }
              const { email, password } = credentials;
              const user = { id: (GLOBAL_ID++).toString(), name: "N.A", email: email, image: "https://www.iconbolt.com/iconsets/weather-icons/na.svg" }
              return user
            }
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
    ],
    secret: process.env.NEXTAUTH_URL,
    callbacks: {
      jwt: async ({ user, token }: any) => {
	      if (user) {
	          token.uid = user.id;
	      }
	      return token;
      },
    session: ({ session, token, user }: any) => {
        if (session.user) {
            session.user.id = token.uid
        }
        return session
      }
    }
}