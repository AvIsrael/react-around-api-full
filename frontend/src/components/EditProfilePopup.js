import {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({name, about: description});
    }

    return (
        <PopupWithForm
            name='profile'
            title='Edit profile'
            submitButton='Save'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="name"
                name="name"
                className="popup__item"
                type="text"
                placeholder="Name"
                minLength='2'
                maxLength='40'
                value={name || ""}
                onChange={handleNameChange}
                required
            />
            <span className="popup__error name-error"></span>
            <input
                id="about"
                name="about"
                className="popup__item"
                type="text"
                placeholder="About me"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={handleDescriptionChange}
                required
            />
            <span className="popup__error about-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
