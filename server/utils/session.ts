import jwt from 'jsonwebtoken'
import { prisma } from '~~/prisma/db'
const runtimeConfig = useRuntimeConfig()

export function createAccessToken(userId: string) {
	return jwt.sign({ userId }, runtimeConfig.AccessTokenSecret, { expiresIn: runtimeConfig.AccessTokenExpiration })
}

export function createRefreshToken(userId: string) {
	return jwt.sign({ userId }, runtimeConfig.RefreshTokenSecret, { expiresIn: runtimeConfig.RefreshTokenExpiration })
}

export function verifyAccessToken(token: string) {
	try {
		const decoded = jwt.verify(token, runtimeConfig.AccessTokenSecret)
		return { valid: true, expired: false, decoded }
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return { valid: false, expired: true, decoded: null }
		} else {
			return { valid: false, expired: false, decoded: null }
		}
	}
}

export function verifyRefreshToken(token: string) {
	try {
		const decoded = jwt.verify(token, runtimeConfig.RefreshTokenSecret)
		return { valid: true, expired: false, decoded }
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return { valid: false, expired: true, decoded: null }
		} else {
			return { valid: false, expired: false, decoded: null }
		}
	}
}

export function getUserIdFromToken(token: string): string | null {
	try {
		const decoded = decodeToken(token)

		if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
			return decoded.userId
		} else {
			return null
		}
	} catch (err) {
		return null
	}
}

export function decodeToken(token: string): any {
	return jwt.decode(token)
}

export async function getStoreRefreshToken(userId: string | null): Promise<string | null> {
	if (!userId) {
		return null
	}
	try {
		const storedRefreshToken = await prisma.user.findUnique({
			where: { id: userId },
		})

		return storedRefreshToken ? storedRefreshToken.refreshToken : null
	} catch (error) {
		return null
	}
}