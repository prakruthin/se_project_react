import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleSignup,
  handleLogin,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const firstLetter = currentUser?.name?.[0]?.toUpperCase();

  return (
    <header className="header">
      {/* <div className="header__container"> */}
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      {/* </div> */}

      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__nav">
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar--placeholder">
                  {firstLetter}
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="header__nav">
          <button
            type="button"
            className="header__signup-btn"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__login-btn"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
