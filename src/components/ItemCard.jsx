import { Link } from 'react-router-dom'

const ItemCard = ({ id, imageUrl, title, price, description, highestBid, username, bidsCount }) => {
    return (
        <Link to={`/item/${id}`}>
            <div className="item-card">
                <img
                    src={imageUrl}
                    alt={title}
                    className="item-image"
                />

                <div className="item-content">
                    <span className="status-badge status-active">
                        Активное
                    </span>

                    <h3 className="item-title">
                        {title}
                    </h3>

                    <p className="item-description">
                        {description}
                    </p>

                    <div className="item-footer">
                        <div>
                            <div className="item-price">
                                {price} ₽
                            </div>

                            <div className="bid-info">
                                {highestBid ?? 'Ставок нет'} 
                                {highestBid != null && ' ₽'}

                                <span className="bid-count">
                                    {bidsCount ?? 0}
                                </span>
                            </div>
                        </div>

                        <div className="item-meta">
                            <span className="item-seller">
                                Продавец: {username ?? 'Пользователь'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard