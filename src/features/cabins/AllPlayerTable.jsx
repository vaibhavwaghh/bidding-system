import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { getPlayers, insertAndDeletePlayer } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./AllPlayersRow";
import AllPlayersRow from "./AllPlayersRow";
import { io } from "socket.io-client";
import { useEffect } from "react";
const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// function AllPlayerTable({ isLoading, latestPlayer, userJoined }) {
//   const queryClient = useQueryClient();
//   const socket = io();
//   const { isLoading: isUpdating, mutate } = useMutation(
//     (currplayer) => insertAndDeletePlayer(currplayer, userJoined),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["allPlayers"],
//         });
//       },
//       refetchOnWindowFocus: false, // Optional: Disable refetching on window focus
//     }
//   );

//   socket.on("countdownend", () => {
//     console.log("THIS HAPPENS WHEN COUNTDOWN ENDS", latestPlayer);
//     mutate(latestPlayer);
//   });
//   if (isLoading || isUpdating) return <Spinner />;
function AllPlayerTable({ isLoading, latestPlayer, userJoined }) {
  if (isLoading) return <Spinner />;
  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Player Name</div>
          <div>Runs Scored</div>
          <div>Price</div>
          <div>Last Year price</div>
          <div></div>
        </TableHeader>
        <AllPlayersRow player={latestPlayer} userJoined={userJoined} />
        {/* {players.map((player) => (
          <CabinRow player={player} key={player.id} />
        ))} */}
      </Table>
    </>
  );
}

export default AllPlayerTable;
