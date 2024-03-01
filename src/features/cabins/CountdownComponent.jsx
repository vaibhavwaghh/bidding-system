import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlayer, insertAndDeletePlayer } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";

const CountdownContainer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: red;
`;

function CountdownComponent() {
  const [countdown, setCountdown] = useState(60);
  const socket = io();

  useEffect(() => {
    socket.on("countdown", (newCountdown) => {
      setCountdown(newCountdown); // Update countdown value when received from the server
    });

    return () => {
      socket.off("countdown"); // Clean up the event listener
    };
  }, [socket]);

  return (
    <CountdownContainer>Time remaining: {countdown} seconds</CountdownContainer>
  );
}

export default CountdownComponent;
