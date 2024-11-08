// src/components/LogOut.js
import React from 'react';
import {
  disconnect
} from '../api';
import styled from 'styled-components';

// Styled components
const LogOutContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f7fa;
  min-height: 100vh;
  padding: 20px;
`;

const LogOutTitle = styled.h2 `
  font-size: 24px;
  color: #555;
  margin-bottom: 20px;
`;

const LogOutButton = styled.button `
  padding: 12px 25px;
  background-color: #ff4d4d;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04444;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LogOut = ({
  onDisConnect
}) => {
  const handleLogOut = async () => {
    try {
      const response = await disconnect();
      onDisConnect(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return ( <
    LogOutContainer >
    <
    LogOutTitle > Disconnect from SFTP </LogOutTitle> <
    LogOutButton onClick = {
      handleLogOut
    } > Log Out </LogOutButton> </LogOutContainer>
  );
};

export default LogOut;
