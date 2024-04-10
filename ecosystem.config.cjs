module.exports = {
	apps: [
		{
			name: 'HMS',
			port: '3000',
			exec_mode: 'cluster',
			instances: 'max',
			script: './.output/server/index.mjs',
			env: {
				NODE_ENV: 'production',
				DATABASE_URL: 'process.env.DATABASE_URL',
				DIRECT_URL: 'process.env.DIRECT_URL',
				ACCESS_TOKEN_SECRET: 'process.env.ACCESS_TOKEN_SECRET',
				ACCESS_TOKEN_EXPIRATION: 'process.env.ACCESS_TOKEN_EXPIRATION',
				REFRESH_TOKEN_SECRET: 'process.env.REFRESH_TOKEN_SECRET',
				REFRESH_TOKEN_EXPIRATION: 'process.env.REFRESH_TOKEN_EXPIRATION',
			},
		},
	],
}
