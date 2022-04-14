import { getSession, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Homepage = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <>Loading...</>
	}

	if (status === 'authenticated') {
		return (
			<div className='flex flex-col items-center justify-center'>
				<h1 className='font-bold py-4 text-center text-green-800'>
					you are logged in as{' '}
					<span className='text-blue-800'>{session?.user?.email}</span>
				</h1>{' '}
				<br />
				<button
					className='bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					onClick={() => signOut()}>
					Sign out
				</button>
			</div>
		)
	}
	if (status === 'unauthenticated') {
		return (
			<div className='flex flex-col items-center justify-center'>
				<h4 className='font-bold py-4 text-center text-green-800'>Not signed in</h4>{' '}
				<br />
				<Link href='/auth/signin'>
					<a className='bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
						Login
					</a>
				</Link>
			</div>
		)
	}
}

export const getServerSideProps = async (ctx) => {
	// Check if the user is authenticated from the server
	const session = await getSession(ctx)
	console.log({ session })
	return {
		props: {
			session,
		},
	}
}
export default Homepage
