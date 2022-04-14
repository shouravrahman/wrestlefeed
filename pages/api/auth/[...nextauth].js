import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../lib/mongodb'
import EmailProvider from 'next-auth/providers/email'

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt',
		maxAge: THIRTY_DAYS,
		updateAge: THIRTY_MINUTES,
	},
	jwt: {
		secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnX', //use a random secret token here
		encryption: true,
	},
	secret: process.env.SECRET,
	providers: [
		EmailProvider({
			pages: {
				signIn: '/auth/signin',
				signOut: '/auth/signout',
				error: '/auth/error', // Error code passed in query string as ?error=
				verifyRequest: '/auth/verify-request', // (used for check email message)
				newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
			},
			// server: process.env.EMAIL_SERVER,
			// from: process.env.EMAIL_FROM,
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: Number(process.env.EMAIL_SERVER_PORT),
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
})
