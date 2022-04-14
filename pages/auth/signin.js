import React from 'react'
import {
	providers,
	getProviders,
	getCsrfToken,
	signIn,
	getSession,
	csrfToken,
} from 'next-auth/react'

export default function SignIn({ providers, csrfToken }) {
	return (
		<div className=' flex items-center h-full w-full max-w-xs mr-auto ml-auto'>
			<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<div className=''>
					<form method='post' action='/api/auth/signin/email'>
						<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Email address
							<input
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								type='email'
								id='email'
								name='email'
							/>
						</label>
						<button
							className='bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='submit'>
							submit
						</button>
					</form>
				</div>
				<div>
					{Object.values(providers).map((provider) => {
						if (provider.name === 'Email') {
							return
						}
						return (
							<div key={provider.name}>
								<button
									className='bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline'
									onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
									Sign in with {provider.name}
								</button>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

SignIn.getInitialProps = async (context) => {
	const { req, res } = context
	const session = await getSession({ req })

	if (session && res && session.accessToken) {
		res.writeHead(302, {
			Location: '/',
		})
		res.end()
		return
	}

	return {
		session: undefined,
		providers: await getProviders(context),
		csrfToken: await getCsrfToken(context),
	}
}
