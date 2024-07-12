import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (userData) {
        const { username } = JSON.parse(userData);
        setUserName(username);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00796b; /* Darker blue text */
  flex-direction: column;
  background: linear-gradient(to right, #2196F3, #ffffff); /* Blue to white gradient */
  height: 100%;
  span {
    color: #00796b; /* Darker blue text */
  }
`;