import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
            setError(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error.message ||
                "Ошибка регистрации"
            )
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-header">
                <div className="auth-icon">👤</div>
                <h1 className="auth-title">Регистрация</h1>
                <p className="auth-subtitle">
                    Создайте аккаунт для участия в торгах
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
                        placeholder="Например: alex123"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Email <span className="optional">(необязательно)</span>
                    </label>
                    <input
                        className="form-input"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
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
                        placeholder="Придумайте пароль"
                        required
                    />
                    <div className="form-hint">
                        Используйте надёжный пароль
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Повторите пароль
                    </label>
                    <input
                        className="form-input"
                        name="password2"
                        type="password"
                        placeholder="Введите пароль ещё раз"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Зарегистрироваться
                </button>
            </form>

            <div className="auth-link">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>
        </div>
    )
}