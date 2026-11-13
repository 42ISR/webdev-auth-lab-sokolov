import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { api } from '../api/api'
import { useItemStore } from '../store/useItemStore'
import { useUserStore } from '../store/useUserStore'

const ItemDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const getItems = useItemStore((state) => state.getItems)
    const session = useUserStore((state) => state.session)

    const [item, setItem] = useState(null)
    const [bids, setBids] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const getErrorMessage = (err) => {
        return (
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            'Произошла ошибка'
        )
    }

    const loadBids = async () => {
        try {
            const data = await api.getItemBids(id)
            setBids(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const loadItem = async () => {
            try {
                setIsLoading(true)
                setError('')

                const data = await api.getItem(id)
                setItem(data)

                await loadBids()
            } catch (err) {
                setError(getErrorMessage(err))
            } finally {
                setIsLoading(false)
            }
        }

        loadItem()
    }, [id])

    const handleBid = async (e) => {
        e.preventDefault()
        setError('')

        const form = e.target
        const amount = Number(form.bidInput.value)

        try {
            await api.createBid({
                id,
                amount,
            })

            form.reset()

            await getItems()

            const updatedItem = await api.getItem(id)
            setItem(updatedItem)

            await loadBids()
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    const handleDelete = async () => {
        setError('')

        try {
            await api.deleteItems(id)
            await getItems()
            navigate('/')
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    if (isLoading) {
        return (
            <div className="container">
                Загрузка...
            </div>
        )
    }

    if (!item) {
        return (
            <div className="container">
                <div className="alert alert-error active">
                    {error || 'Товар не найден'}
                </div>

                <Link to="/">
                    ← Вернуться к списку товаров
                </Link>
            </div>
        )
    }

    const isOwner = session?.user?.id === item.userId

    return (
        <div className="container">
            <Link to="/">
                ← Вернуться к списку товаров
            </Link>

            <div className="item-detail">
                <div className="item-header">
                    <div>
                        <img
                            src={item.imageUrl}
                            className="item-image-large"
                            alt={item.title}
                        />
                    </div>

                    <div className="item-info">
                        <span className="item-status">
                            {item.status === 'active' ? 'Активное' : item.status}
                        </span>

                        <h1 className="item-title-large">
                            {item.title}
                        </h1>

                        <div className="item-seller-info">
                            <div className="seller-avatar">
                                {item.username?.slice(0, 2).toUpperCase()}
                            </div>

                            <div className="seller-details">
                                <div className="seller-name">
                                    {item.username}
                                </div>

                                <div className="seller-date">
                                    {new Date(item.createdAt).toLocaleString('ru-RU')}
                                </div>
                            </div>
                        </div>

                        <div className="item-description-full">
                            {item.description}
                        </div>

                        <div className="price-section">
                            <div className="starting-price">
                                Начальная цена:
                            </div>

                            <div className="current-price">
                                {item.price} ₽
                            </div>

                            <div className="highest-bid">
                                Текущая ставка:{' '}
                                {item.highestBid ?? 'ставок нет'}
                                {item.highestBid != null ? ' ₽' : ''}
                            </div>

                            {error && (
                                <div className="alert alert-error active">
                                    {error}
                                </div>
                            )}

                            {!isOwner && (
                                <form
                                    className="bid-form"
                                    onSubmit={handleBid}
                                >
                                    <Input
                                        type="number"
                                        name="bidInput"
                                        className="bid-input"
                                        placeholder="Введите вашу ставку"
                                        min={(item.highestBid ?? item.price) + 1}
                                        step="1"
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        className="btn-bid"
                                    >
                                        Сделать ставку
                                    </Button>
                                </form>
                            )}

                            {isOwner && (
                                <button
                                    type="button"
                                    className="btn-delete"
                                    onClick={handleDelete}
                                >
                                    Удалить товар
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bids-section">
                    <div className="bids-header">
                        <h2 className="bids-title">
                            История ставок
                        </h2>

                        <span className="bids-count">
                            {bids.length}
                        </span>
                    </div>

                    <div className="bids-list">
                        {bids.map((bid, index) => (
                            <div
                                key={bid.id}
                                className={`bid-item ${index === 0 ? 'highest-bid-item' : ''}`}
                            >
                                <div className="bid-user">
                                    <div className="bid-avatar">
                                        {bid.username?.slice(0, 2).toUpperCase()}
                                    </div>

                                    <div className="bid-details">
                                        <span className="bid-username">
                                            {bid.username}
                                        </span>

                                        <span className="bid-time">
                                            {new Date(bid.createdAt).toLocaleString('ru-RU')}
                                        </span>
                                    </div>

                                    {index === 0 && (
                                        <span className="highest-badge">
                                            🏆 Лидирует
                                        </span>
                                    )}
                                </div>

                                <div className="bid-amount">
                                    {bid.amount} ₽
                                </div>
                            </div>
                        ))}

                        {bids.length === 0 && (
                            <div className="bid-item">
                                Ставок пока нет
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
