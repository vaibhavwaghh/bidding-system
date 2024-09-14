import {
  getPlayers,
  getWalletByUserNo,
  insertAndDeletePlayer,
} from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CountdownComponent from "../features/cabins/CountdownComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AllPlayerTable from "../features/cabins/AllPlayerTable";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Spinner from "../ui/Spinner";
async function fetchWalletData(player, setWallet, setExpense) {
  try {
    // Call getWalletByUserNo function to fetch wallet data for a user
    const walletData = await getWalletByUserNo(player);
    setWallet(walletData[0].Wallet); // Update wallet state with fetched wallet amount
    setExpense(walletData[0].totalExpense);
  } catch (error) {
    console.error("Error fetching wallet data:", error.message);
  }
}
function AllPlayersCabin() {
  const [userJoined, setUserJoined] = useState(""); // State to track user joining
  const [wallet, setWallet] = useState(0); // State to store wallet amount
  const [expense, setExpense] = useState(0);
  const socket = io();
  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getPlayers,
  });
  useEffect(() => {
    if (players && players.length > 0) {
      // Set the latest player
      fetchWalletData(players[0].playerorder, setWallet, setExpense); // Fetch wallet data for the latest player
    }
  }, []);

  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate } = useMutation(
    (currplayer) => insertAndDeletePlayer(currplayer, userJoined),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["allPlayers"],
        });
      },
      onError: (error) => {
        console.error("Mutation error:", error);
        // Handle mutation errors appropriately
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    socket.on("countdownend", async () => {
      console.log("THIS HAPPENS WHEN COUNTDOWN ENDS", latestPlayer);
      mutate(latestPlayer, {
        onSuccess: async () => {
          await fetchWalletData(
            latestPlayer.playerorder,
            setWallet,
            setExpense
          );
        },
        // Add onError and onSettled handlers if needed
      });
    });

    return () => {
      socket.off("countdownend");
    };
  }, [socket, latestPlayer, mutate, setWallet, setExpense]);

  if (isLoading || isUpdating) return <Spinner />;
  var latestPlayer = "VAIBHAV";
  if (players) {
    if (players.length === 0) return <p>NO PLAYER FOUND</p>;
    latestPlayer = players[0];
  }

  // State to store total expense

  // Handle userJoined event

  // Listen for the message when a user clicks the button
  socket.on("userClickedUpdate", (message) => {
    setUserJoined(message); // Update the message in the UI
    socket.emit("resetCountdown");
  });
  console.log("THIS IS MY WALLET AND EXPENSE", wallet, expense);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Current contest</Heading>
        <div>WALLET AMOUNT :- {wallet}</div>
        <div>TOTAL EXPENSE :- {expense}</div>
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
