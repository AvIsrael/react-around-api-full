import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlaceSubmit}) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    useEffect(() => {
        setTitle("");
        setLink("");
    }, [isOpen]);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = {name: title, link: link};
        onAddPlaceSubmit(newCard);
    }

    return (
        <PopupWithForm
            name="new-place"
            title="New Place"
            submitButton="Create"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="title"
                name="title"
                className="popup__item"
                type="text"
                placeholder="Title"
                minLength="2"
                maxLength="30"
                onChange={handleTitleChange}
                value={title}
                required
            />
            <span className="popup__error title-error"></span>
            <input
                id="image-link"
                type="url"
                name="image-link"
                className="popup__item popup__input_type_image-link"
                placeholder="Image Link"
                onChange={handleLinkChange}
                value={link}
                required
            />
            <span className="popup__error image-link-error"></span>
        </PopupWithForm>
    );
}
export default AddPlacePopup;