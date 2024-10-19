import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import GitHubProvider from 'next-auth/providers/github'

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks:{
        async session({session, token}){
            session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;
});
// export default NextAuth(authOptions);
export {handler as GET, handler as POST, handler as PUT}

        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),

        // CredentialsProvider({
        //     name: "Email",
        //     credentials:{
        //         username:{label:'Email', type:'text', placeholder:'Email'},
        //         password:{label:'Password', type:'text', placeholder:'password'}
        //     },
        //     async authorize(credentials){
        //         console.log(credentials);
        //         return {
        //             id: 'user',
        //             name: 'vishal',
        //             email:'vishallohar@gmail.com'
        //         }
        //     }
        // })
