const ImagePopup = ({card, onClose}) => {
    return (<div onClick={onClose} className={`popup ${card && "popup_opened"}`} id="popup-viewer">
            <div className="popup__viewer-wrapper">
                <img className="popup__viewer-image"
                     src={card && card.link}
                     alt={card && card.name}/>
                <span className="popup__viewer-text">{card && card.name}</span>
                <button className="button-reset popup__button popup__btn-cancel"
                        type="button"
                        aria-label="cancel"
                        onClick={onClose}></button>
            </div>
        </div>);
}
export default ImagePopup;