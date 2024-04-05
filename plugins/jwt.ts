import jwt from 'jsonwebtoken'
const runtimeConfig = useRuntimeConfig()

export const createJwtToken = async () => {
	return jwt.sign({ success: true }, runtimeConfig.tokenSecret, {
		expiresIn: runtimeConfig.tokenExpiration,
	})
}

export const checkJwtToken = async (token: string) => {
	return jwt.verify(token, runtimeConfig.tokenSecret, (err, decoded) => {
		if (err) {
			let { name, message } = err
			return {
				name: name,
				message: message,
				success: false,
			}
		}

		return decoded
	})
}
