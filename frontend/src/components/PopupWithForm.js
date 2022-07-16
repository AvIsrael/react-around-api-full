const PopupWithForm = ({name, isOpen, title, onClose, onSubmit, submitButton, children}) => {
    return (
        <div onClick={onClose} className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div onClick={(e) => e.stopPropagation()}  className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form name={`form-${name}`} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button-sbmt">
                        {submitButton}
                    </button>
                    <button
                        className="button-reset popup__button"
                        type="button"
                        aria-label="cancel"
                        onClick={onClose}
                    ></button>
                </form>
            </div>
        </div>)
}
export default PopupWithForm;