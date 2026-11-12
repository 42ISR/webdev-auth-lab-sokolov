import { Link } from 'react-router-dom'

const ItemCard = ({ id }) => {
    return (
        <Link to={`/item/${id}`}>
            <div className="item-card">
                <img
                    src={imageUrl}
                    className="item-image"
                />

                <div className="item-content">
                    <span className="status-badge status-active">
                        Активное
                    </span>

                    <h3 className="item-title">
                        Название
                    </h3>

                    <p className="item-description">
                        Описание
                    </p>

                    <div className="item-footer">
                        <div>
                            <div className="item-price">
                                5000 Р
                            </div>

                            <div className="bid-info">
                                5000 P
                                <span className="bid-count">
                                    2
                                </span>
                            </div>
                        </div>

                        <div className="item-meta">
                            <span className="item-seller">
                                Продавец: Пользователь
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard