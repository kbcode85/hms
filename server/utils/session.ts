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

export async function createAndSetRefreshToken(userId: string) {
	try {
		const refreshToken = await createRefreshToken(userId)
		await prisma.user.update({
			where: { id: userId },
			data: {
				refreshToken: refreshToken,
				refreshTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			},
		})
		return refreshToken
	} catch (error) {
		return null
	}
}

export async function getUserData(token: string) {
	const userId = getUserIdFromToken(token)
	if (!userId) {
		return null
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			username: true,
			email: true,
		},
	})

	return user
}
