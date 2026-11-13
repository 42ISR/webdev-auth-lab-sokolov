import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { useItemStore } from '../store/useItemStore'
import { api } from '../api/api'

const ItemsList = () => {
    const { items, getItems } = useItemStore()
    const [stats, setStats] = useState(null)

    useEffect(() => {
        getItems()

        const loadStats = async () => {
            try {
                const data = await api.getStats()
                setStats(data)
            } catch (error) {
                console.error(error)
            }
        }

        loadStats()
    }, [getItems])

    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>

            <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">
                        {stats?.totalItems ?? 0}
                    </span>
                    <span className="stat-label">
                        Товаров
                    </span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">
                        {stats?.totalBids ?? 0}
                    </span>
                    <span className="stat-label">
                        Ставок
                    </span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">
                        {stats?.activeItems ?? 0}
                    </span>
                    <span className="stat-label">
                        Активных
                    </span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">
                        {stats?.averageItemPrice ?? 0} ₽
                    </span>
                    <span className="stat-label">
                        Средняя цена
                    </span>
                </div>
            </div>

            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        highestBid={item.highestBid}
                        username={item.username}
                        bidsCount={item.bidsCount}
                    />
                ))}

                {items.length === 0 && (
                    <p>Товаров пока нет.</p>
                )}
            </div>
        </div>
    )
}

export default ItemsList