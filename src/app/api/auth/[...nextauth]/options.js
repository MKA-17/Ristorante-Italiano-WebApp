import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"


export const options = {
  adapter: PrismaAdapter(prisma),


  // Configure one or more authentication providers
  // pages: {signIn: '/login'},
  providers: [
    GoogleProvider({
      //   profile(profile){
      //     console.log("googleprovider profile: ", profile)
      //If not entered values correctly, this would make issues in authentication!

      //     return profile
      //   },
      clientId: process.env.Google_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
       
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          // console.log("credentials received : ", credentials, `${process.env.Domain_Name}/api/user/login`)
          let resp = await fetch(`${process.env.Domain_Name}/api/user/login`, {
            method: "POST",
            headers:{
              "content-Type": "application/json" 
            },
            body: JSON.stringify(credentials),

          });
          if(resp.ok){
            let user = await resp.json();   
            // console.log("userFetch: ", user)
            if(user.success === true)
              return user.user
            else 
              return null
          }
          else
            return null
        }
      })
  ],

  secret: process.env.TOKEN_SECRET,
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // the session will last 30 days(days*hours*min*sec)
  },
  
  // debug: true
     callbacks:{
      async jwt({token, user, account}) {
        //Whatever I'll pass in token cb, would be sent to the session cb, which is the real thing. 
        //The token in session cb would be what we returned from token cb and in token cb we receive true user data etc
        // console.log("token: ", user)

        if (user) token.user = user;
        return token; 

      },
      async session({session, token}) {
        // console.log("token inside session cb: ", token)
         if(!token?.user) return session;

        const {password, emailVerified, ...userInfo} = token.user 
        // console.log("session cb: ",token.user) 
        return  {...session, user: userInfo}
         
      }
     }
};
 

export const getAuthSession = ()=>getServerSession(options)