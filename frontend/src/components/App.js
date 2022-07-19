import Header from './Header';
import Footer from "./Footer";
import Main from "./Main";
import React from "react";
import {useState, useEffect } from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {registerUser, registeredUser, checkToken} from '../utils/auth';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

export function App() {
    const [isAuthSuccessPopupOpen, setIsAuthSuccessPopupOpen] = React.useState(false);
    const [isAuthOopsPopupOpen, setIsAuthOopsPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(undefined);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((id) => id === currentUser._id);

        api
            .changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((currentCard) =>
                        currentCard._id === card._id ? newCard : currentCard
                    )
                );
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }

    const handleCardDelete = (card) => {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) =>
                    state.filter((currentCard) => currentCard._id !== card._id)
                );
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }

    useEffect(() => {
        const getUserInfoFromToken = () => {
            const jwt = localStorage.getItem('jwt');
            if (jwt) return checkToken(jwt);
        };
        api
            .getInitialCards()
            .then((cardsData) => {
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });

        Promise.allSettled([api.getUserInfo(), getUserInfoFromToken()])
            .then((values) => {
                const userFromAPI = values[0].value;
                const userFromToken = values[1].value;
                setCurrentUser({ ...userFromToken, ...userFromAPI });
                if (userFromToken) {
                    setIsLoggedIn(true);
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));

    }, []);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsAuthSuccessPopupOpen(false);
        setIsAuthOopsPopupOpen(false);
    }

    const handleUpdateUser = (currentUser) => {
        api
            .editProfile({ name: currentUser.name, about: currentUser.about })
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }
    const handleUpdateAvatar = (currentUser) => {
        api
            .editAvatar({ avatar: currentUser.avatar })
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }

    const handleAddPlaceSubmit = (newCard) => {
        api
            .createCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }
    const handleNewUserSubmit = ({ email, password }) => {
        setIsLoading(true);
        registerUser({ email, password })
            .then((user) => {
                setIsAuthSuccessPopupOpen(true);
                navigate('/signin');
            })
            .catch((err) => {
                setIsAuthOopsPopupOpen(true);
            })
            .finally(() => setIsLoading(false));
    }
    const handleLogin = ({ email, password }) => {
        setIsLoading(true);
        registeredUser({ email, password })
            .then((user) => {
                localStorage.setItem('jwt', user.token);
                setIsLoggedIn(true);
                setCurrentUser({ ...currentUser, email });
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setIsAuthOopsPopupOpen(true);
            })
            .finally(() => setIsLoading(false));
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
    };


    return (<div className="page">
        <div className="wrapper">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}

                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute redirectPath="/signin" isLoggedIn={isLoggedIn}>
                                <Main
                                    onEditAvatarClick={handleEditAvatarClick}
                                    onEditProfileClick={handleEditProfileClick}
                                    onAddPlaceClick={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/signin" element={<Login isLoading={isLoading} onSubmit={handleLogin} isLoggedIn />} />
                    <Route path="/signup" element={<Register onSubmit={handleNewUserSubmit} isLoading={isLoading} isLoggedIn />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <InfoTooltip isOpen={isAuthSuccessPopupOpen} onClose={closeAllPopups} isSuccessful={true} />
                <InfoTooltip isOpen={isAuthOopsPopupOpen} onClose={closeAllPopups} isSuccessful={false} />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                />
               {/*deleting card*/}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup card={selectedCard}
                            onClose={closeAllPopups}
                />
            </CurrentUserContext.Provider>
        </div>
    </div>);
}