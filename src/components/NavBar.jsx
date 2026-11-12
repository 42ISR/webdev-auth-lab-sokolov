import { Link } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"

export const NavBar = () => {
    const session = useUserStore(state => state.session)

    return (
        <nav>
            <Link to="/">Домой</Link>

            {session ? (
                <>
                    <Link to="/create-item">Создать товар</Link>
                    <Link to="/bids">Мои ставки</Link>
                    <Link to="/logout">Выйти</Link>
                </>
            ) : (
                <Link to="/login">Войти</Link>
            )}
        </nav>
    )
}