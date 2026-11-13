import { Link } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

export const NavBar = () => {
    const session = useUserStore(state => state.session)

    return (
        <header>
            <nav>
                <Link to="/" className="logo">
                    Marketplace
                </Link>

                <div className="nav-links">
                    <Link to="/">Домой</Link>

                    {session ? (
                        <>
                            <Link to="/create-item">Создать товар</Link>
                            <Link to="/bids">Мои ставки</Link>
                            <Link to="/logout" className="btn-logout">
                                Выйти
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Войти</Link>
                            <Link to="/register" className="btn-primary">
                                Зарегистрироваться
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}