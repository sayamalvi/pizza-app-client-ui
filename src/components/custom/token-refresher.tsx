'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import jwt, { JwtPayload } from 'jsonwebtoken'

const TokenRefresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>()
    const getAccessToken = async () => {
        const res = await fetch('/api/auth/accessToken')
        if (!res.ok) {
            return;
        }
        const accessToken = await res.json()
        return accessToken.token
    }

    const refreshAccessToken = async () => {
        try {
            const res = await fetch('/api/auth/refresh', { method: "POST" })
            if (!res.ok) {
                console.error("Failed to refresh access token")
            }
        } catch (error) {
            console.error("Error while refreshing token")
        }
        startRefresh()
    }

    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current)
        }
        try {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                return;
            }
            const token = await jwt.decode(accessToken) as JwtPayload

            const exp = token.exp! * 1000 // convert to milliseconds
            const currentTime = Date.now()
            const refreshTime = exp - currentTime - 5000;

            timeoutId.current = setTimeout(() => {
                refreshAccessToken()
            }, refreshTime);

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        startRefresh()

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }
    }, [startRefresh, timeoutId])

    return (
        <div>{children}</div>
    )
}

export default TokenRefresher