import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
            setError(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error.message ||
                "Ошибка входа"
            )
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-icon">🔐</div>
                <h1 className="auth-title">Вход в аккаунт</h1>
                <p className="auth-subtitle">
                    Войдите, чтобы участвовать в торгах
                </p>
            </div>

            {error && (
                <div className="alert alert-error active">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        Имя пользователя
                    </label>
                    <input
                        className="form-input"
                        name="username"
                        type="text"
                        placeholder="Введите ваш логин"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Пароль
                    </label>
                    <input
                        className="form-input"
                        name="password"
                        type="password"
                        placeholder="Введите ваш пароль"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Войти
                </button>
            </form>

            <div className="auth-link">
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            </div>
        </div>
    )
}