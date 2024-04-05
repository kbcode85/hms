import jwt from 'jsonwebtoken'
const runtimeConfig = useRuntimeConfig()

export const createJwtToken = async () => {
	return jwt.sign({ success: true }, runtimeConfig.tokenSecret, {
		expiresIn: runtimeConfig.tokenExpiration,
	})
}

export const checkJwtToken = async (token: string) => {
	try {
		const decoded = jwt.verify(token, runtimeConfig.tokenSecret)
		return decoded
	} catch (err: any) {
		let { name, message } = err
		return {
			name: name,
			message: message,
			success: false,
		}
	}
}
