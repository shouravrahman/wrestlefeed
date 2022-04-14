import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
function user() {
	const { data: session } = useSession()
	if (!session) {
		return (
			<p className='font-bold py-4 text-center text-red-600'>
				{' '}
				You are not logged in.
			</p>
		)
	}

	return (
		<>
			<h1 className='font-bold py-4 text-center text-green-800'>
				you are logged in as{' '}
				<span className='text-blue-800'>{session?.user?.name}</span>
			</h1>
			<Link href='/'>
				<a className='ml-4 text-center text-blue-800'>Home</a>
			</Link>
		</>
	)
}
export default user
