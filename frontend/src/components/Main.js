import {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
                  onEditProfileClick, onEditAvatarClick, onAddPlaceClick, onCardClick, onConfirmDeleteClick, cards,
                  onCardDelete, onCardLike
              }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__image">
                {Boolean(currentUser.avatar) && (<div className="profile__avatar"
                     style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>)}
                <div className="profile__image-overlay"
                     onClick={onEditAvatarClick}></div>
            </div>
            <div className="profile__info">
                <div className="profile__content">
                    {Boolean(currentUser.name) && (<h1 className="profile__hero">{currentUser.name}</h1>)}
                    <button className="button profile__button-unusual"
                            type="button"
                            aria-label="edit"
                            onClick={onEditProfileClick}>
                    </button>
                </div>
                {Boolean(currentUser.about) && (<p className="profile__role">{currentUser.about}</p>)}
            </div>
            <button className="button profile__button"
                    type="button"
                    aria-label="add"
                    onClick={onAddPlaceClick}>
            </button>
        </section>
        <section className="elements">
            <ul className="elements__items">
                {cards && cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onConfirmDeleteClick={onConfirmDeleteClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />))}
            </ul>
        </section>
    </main>)
}

export default Main;