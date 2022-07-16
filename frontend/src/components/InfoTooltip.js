import successImage from '../images/registered-status-success.svg';
import oopsImage from '../images/registered-status-oops.svg';

export default function InfoTooltip(props) {
    const { isOpen, onClose, isSuccessful } = props;
    return (
        <div onClick={onClose} className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
            <div onClick={(e) => e.stopPropagation()} className="popup__container popup__container_type_info">
                <button type="button" className="button-reset popup__button" aria-label="cancel" onClick={onClose}></button>
                <img
                    className="popup__auth"
                    alt={isSuccessful ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}
                    src={isSuccessful ? successImage : oopsImage}
                ></img>
                <h2 className="popup__title">{isSuccessful ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</h2>
            </div>
        </div>
    );
}
