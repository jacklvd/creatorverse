import { useAuth } from "../context/AuthProvider";
import { supabase } from "../client/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/cards.scss";

const Cards = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
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

  if (userInfo?.length === 0)
    return <div>You have no creators cards available</div>;

  return (
    <>
      {userInfo?.map((creator) => (
        <div key={creator.id} className="creator-container">
          <div className="creator">
            <img src={creator.imageURL} />
            <div className="creator-content">
              <h2>{creator.name}</h2>
              <p>{creator.description}</p>
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
                <a href="#" className="creator-info-btn">
                  <span>
                    <i className="fa-solid fa-info"></i>
                  </span>
                </a>
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
    </>
  );
};

export default Cards;
