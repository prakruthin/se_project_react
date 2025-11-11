//External library imports
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

//Internal component imports
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import {
  register,
  authorize,
  getUserData,
  editProfile,
} from "../../utils/auth.js";
import { coordinates, apiKey } from "../../utils/constants";
import { getToken, setToken, removeToken } from "../../utils/token.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignup = () => {
    setActiveModal("register-form");
  };

  const handleLogin = () => {
    setActiveModal("login-form");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-form");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setItemToDelete(null);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleItemDelete = (id) => {
    const token = getToken();
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  const handleSignOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleConfirmDelete = () => {
    const id = itemToDelete?._id;
    if (id) {
      handleItemDelete(id);
    }
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(() => closeActiveModal())
      .catch((err) => console.error("Error:", err))
      .finally(() => setIsLoading(false));
  }

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = getToken();
    function makeRequest() {
      return addItem({ name, imageUrl, weather }, token).then((newItem) => {
        setClothingItems((prevItems) => [...prevItems, newItem.data]);
      });
    }

    handleSubmit(makeRequest);
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatar }) => {
    function makeRequest() {
      return register({ email, password, name, avatar })
        .then(() => {
          return authorize({ email, password });
        })
        .then((data) => {
          if (data.token) {
            setToken(data.token);
            setIsLoggedIn(true);
            return getUserData(data.token);
          } else {
            throw new Error("Failed to receive a token");
          }
        })
        .then((user) => {
          setCurrentUser(user);
        });
    }
    handleSubmit(makeRequest);
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    if (!email || !password) {
      console.log("Missing value");
      return;
    }
    function makeRequest() {
      return authorize({ email, password }).then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      });
    }
    handleSubmit(makeRequest);
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    const token = getToken();
    function makeRequest() {
      return editProfile({ name, avatar }, token).then((user) => {
        setCurrentUser(user.data);
      });
    }
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === String(id) ? updatedCard.data : item
              )
            );
          })
          .catch((err) => {
            console.error(err);
          })
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => {
            console.error(err);
          });
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      })
      .finally(() => {
        setIsWeatherDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items", err);
      });
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    getUserData(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleSignup={handleSignup}
              handleLogin={handleLogin}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isWeatherDataLoaded={isWeatherDataLoaded}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                    onEditProfileClick={handleEditProfile}
                    onCardLike={handleCardLike}
                    onSignout={handleSignOut}
                  />
                }
              />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />
          <ConfirmDeleteModal
            onClose={closeActiveModal}
            isOpen={activeModal === "confirm-delete"}
            onConfirmDelete={handleConfirmDelete}
          />
          <RegisterModal
            onClose={closeActiveModal}
            isOpen={activeModal === "register-form"}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            onSwitchForm={handleLogin}
            isLoading={isLoading}
          />
          <LoginModal
            onClose={closeActiveModal}
            isOpen={activeModal === "login-form"}
            onLoginModalSubmit={handleLoginModalSubmit}
            onSwitchForm={handleSignup}
            isLoading={isLoading}
          />
          <EditProfileModal
            onClose={closeActiveModal}
            isOpen={activeModal === "edit-form"}
            onEditProfileModalSubmit={handleEditProfileModalSubmit}
            isLoading={isLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
