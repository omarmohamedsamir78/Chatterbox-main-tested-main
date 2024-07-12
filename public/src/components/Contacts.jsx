import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default-avatar.png"; // Changed import path

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      if (data.avatarImage) {
        setCurrentUserImage(DefaultAvatar);
      } else {
        setCurrentUserImage(`data:image/jpeg;base64,${data.avatarImage}`);
      }
    };
    fetchCurrentUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // Update the handleAvatarChange function to set DefaultAvatar if no file is selected
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = reader.result ? reader.result.replace("data:", "").replace(/^.+,/, "") : DefaultAvatar;
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        data.avatarImage = base64String;
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data));
        setCurrentUserImage(`data:image/jpeg;base64,${base64String}`);
    };
    if (file) {
        reader.readAsDataURL(file);
    } else {
        setCurrentUserImage(DefaultAvatar);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    navigate("/login");
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <h3>Chatterbox</h3>
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage || DefaultAvatar}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <label htmlFor="avatar-upload" className="upload-label">
              Change Photo
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg, image/jpg"
              onChange={handleAvatarChange}
            />
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={DefaultAvatar}
                      alt="default avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff; /* White background */
  border-right: 1px solid #e0f7fa; /* Light blue border */
  padding: 1rem;
  gap: 1rem;
  overflow: hidden;
  height: 100%;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #00796b; /* Darker blue text */
      text-transform: uppercase;
    }
  }
  .current-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    .avatar {
      img {
        height: 3.1rem; /* Increased by 0.1rem (1mm) */
        width: 3.1rem;  /* Increased by 0.1rem (1mm) */
        border-radius: 50%; /* Make the avatar circular */
        object-fit: cover; /* Ensure the image covers the circle */
      }
    }
    .username {
      h2 {
        color: #00796b; /* Darker blue text */
      }
    }
    .upload-label {
      cursor: pointer;
      color: #00796b; /* Darker blue text */
      text-decoration: underline;
    }
    input[type="file"] {
      display: none;
    }
    .logout-button {
      cursor: pointer;
      color: #ffffff; /* White text */
      background-color: #00796b; /* Darker blue background */
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.2rem;
      text-transform: uppercase;
      margin-top: 0.5rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    width: 100%;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #00796b; /* Darker blue scrollbar */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #e0f7fa; /* Light blue background */
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3.1rem; /* Increased by 0.1rem (1mm) */
          width: 3.1rem;  /* Increased by 0.1rem (1mm) */
          border-radius: 50%; /* Make the avatar circular */
          object-fit: cover; /* Ensure the image covers the circle */
        }
      }
      .username {
        h3 {
          color: #00796b; /* Darker blue text */
        }
      }
    }
    .selected {
      background-color: #00796b; /* Black background */
      .username {
        h3 {
          color: #ffffff; /* White text */
        }
      }
    }
  }
`;