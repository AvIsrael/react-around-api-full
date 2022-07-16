import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({onCardClick, card, onCardLike, onCardDelete}) => {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    const cardDeleteButtonClassName = `elements__button-delete ${
        isOwn ? "" : "elements__button-delete_hidden"
    }`;
    const cardLikeButtonClassName = `elements__button-heart ${
        isLiked ? "elements__button-heart_active" : ""
    }`;
    const handleClick = () => {onCardClick(card);}
    const handleLikeClick = () => {onCardLike(card);}
    const handleDeleteClick = () => {onCardDelete(card);}

    return (<li className="elements__item">
        <img className="elements__grid-image" onClick={handleClick}
             src={card.link} alt={card.name}></img>
        <div className="elements__info">
            <h2 className="elements__description">{card.name}</h2>
            <div className="elements__likes-zone">
                <button className={cardLikeButtonClassName}
                        type="button"
                        aria-label="like"
                        onClick={handleLikeClick}></button>
                <span className="elements__amount-likes">{card.likes.length}</span>
            </div>
        </div>
        <button className={cardDeleteButtonClassName}
                type="button"
                aria-label="delete"
                onClick={handleDeleteClick}></button>
    </li>);
}
export default Card;
