import { useAuth } from "../context/AuthProvider";
import { supabase } from "../client/client";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/cards.scss";

const limitText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

const Cards = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const popUpRef = useRef();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("user_id", user.id);
      if (error) console.log(error);
      else setUserInfo(data);
    };
    fetchUserInfo();
  }, [user.id]);

  const handleInfoButtonClick = (creator) => {
    setSelectedCreator(creator);
  };

  const handleCloseButtonClick = () => {
    setSelectedCreator(null);
  };

  const handleOverlayClick = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      handleCloseButtonClick();
    }
  };

  if (userInfo?.length === 0)
    return <div>You have no creators cards available</div>;

  return (
    <>
      {userInfo?.map((creator) => (
        <div key={creator.id} className="creator-container">
          <div className="creator">
            <img src={creator.imageURL} alt={creator.name} />
            <div className="creator-content">
              <h2>{creator.name}</h2>
              <p>{limitText(creator.description, 100)}</p>
              <div className="creator-buttons">
                <a
                  href={creator.url}
                  className="creator-url-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    <i className="fa-solid fa-link"></i>
                  </span>
                </a>
                <button
                  className="creator-info-btn"
                  onClick={() => handleInfoButtonClick(creator)}
                >
                  <span>
                    <i className="fa-solid fa-info"></i>
                  </span>
                </button>
                <Link
                  to={`/dashboard/edit/${creator.id}`}
                  className="creator-edit-btn"
                >
                  <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedCreator && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="popup-content">
            <span className="popup-close-btn" onClick={handleCloseButtonClick}>
              &times;
            </span>
            <h2 className="popup-title">{selectedCreator.name}</h2>
            <img
              className="popup-picture"
              src={selectedCreator.imageURL}
              alt={selectedCreator.name}
            />
            <p className="popup-description">{selectedCreator.description}</p>
            <div className="popup-buttons">
              <a href={selectedCreator.url} target="_blank" rel="noreferrer">
                <button className="popup-button">Profile</button>
              </a>
              <button
                className="popup-button-close"
                onClick={handleCloseButtonClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
