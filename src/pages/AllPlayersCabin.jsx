import { getPlayers, insertAndDeletePlayer } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CountdownComponent from "../features/cabins/CountdownComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AllPlayerTable from "../features/cabins/AllPlayerTable";
import { useState } from "react";
import { io } from "socket.io-client";
import Spinner from "../ui/Spinner";
function AllPlayersCabin() {
  const [userJoined, setUserJoined] = useState(""); // State to track user joining
  const socket = io();
  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getPlayers,
  });
  if (isLoading) return <Spinner />;
  var latestPlayer = "VAIBHAV";
  if (players) {
    if (players.length === 0) return <p>NO PLAYER FOUND</p>;
    latestPlayer = players[0];
  }

  // Handle userJoined event

  // Listen for the message when a user clicks the button
  socket.on("userClickedUpdate", (message) => {
    setUserJoined(message); // Update the message in the UI
    socket.emit("resetCountdown");
  });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Players</Heading>
        <CountdownComponent />
      </Row>
      <Row>
        <AllPlayerTable
          isLoading={isLoading}
          latestPlayer={latestPlayer}
          userJoined={userJoined}
        />
      </Row>
    </>
  );
}

export default AllPlayersCabin;
