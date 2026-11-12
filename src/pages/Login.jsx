import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import { api } from "../api/api"

export const Login = () => {
    const [error, setError] = useState("")
    const setSession = useUserStore(state => state.setSession)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
        }

        try {
            const session = await api.loginUser(user)
            setSession(session)
            navigate("/")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            {error && (
                <div className="alert alert-error active">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input name="username" type="text" />
                <input name="password" type="password" />

                <button type="submit">Войти</button>
            </form>
        </div>
    )
}