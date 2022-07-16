import {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.value = "";
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({avatar: inputRef.current.value});
    }

    return (
        <PopupWithForm
            name="profile-image"
            title="Change profile picture"
            submitButton="Save"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="image-input"
                type="url"
                name="avatar"
                className="popup__item"
                placeholder='Image Link'
                ref={inputRef}
                required
            />
            <span className='popup__error image-input-error'></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
