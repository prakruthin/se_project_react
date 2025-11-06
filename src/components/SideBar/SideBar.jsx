import { useContext } from "react";
import "./SideBar.css";
// import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfileClick, onSignout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__content">
        <button
          type="button"
          className="sidebar__btn sidebar__btn_edit-profile-btn"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__btn sidebar__btn_logout-btn"
          onClick={onSignout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
