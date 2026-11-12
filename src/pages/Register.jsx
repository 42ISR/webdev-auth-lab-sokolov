import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import { api } from "../api/api"

export const Register = () => {
    const [error, setError] = useState("")
    const setSession = useUserStore(state => state.setSession)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (e.target.password.value !== e.target.password2.value) {
            setError("Пароли не совпадают")
            return
        }

        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
        }

        if (e.target.email.value) {
            user.email = e.target.email.value
        }

        try {
            const session = await api.registerUser(user)
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
                <input name="email" type="email" />
                <input name="password" type="password" />
                <input name="password2" type="password" />

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}