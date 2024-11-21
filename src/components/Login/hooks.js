import { useState, useCallback } from 'react'

export const useLogin = () => {
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)

    const handleChangePassword = useCallback((e) => setPassword(e.target.value), [])

    const login = useCallback(() => {
        setError(false)
        fetch('/login', { body: JSON.stringify({ password }), method: 'POST' })
            .then(async response => {
                if (response.status == 404) return setError('error')
                if (response.status == 200) setTimeout(() => window.location.href = '/case', 100)
            })
    }, [password])

    const closeSession = useCallback((e) => {
        setError(false)
        fetch('/login', { body: JSON.stringify({ password }), method: 'POST' })
            .then(async response => {
                if (response.status == 404) return setError('error')
                if (response.status == 200) setTimeout(() => window.location.href = '/logout', 100)
            })
    }, [password])

    return { login, closeSession, error, password, handleChangePassword }
}