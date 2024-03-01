import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlayer } from "../../services/apiCabins";
import { useState } from "react";
import io from "socket.io-client";

import Cookies from "js-cookie";
import Spinner from "../../ui/Spinner";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function AllPlayersRow({ player, userJoined }) {
  const {
    id: playerId,
    PlayerName,
    TotalRunsScored,
    bidAmount,
    PreviousYearSold,
    image,
  } = player;

  const queryClient = useQueryClient();
  const socket = io();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: (data) => updatePlayer(data.id, data.newBidAmount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allPlayers"],
      });
    },
  });

  const handleClick = () => {
    const myCookieValue = Cookies.get("userId");

    const newBidAmount = bidAmount + 20;

    mutate({ id: playerId, newBidAmount });

    console.log("THIS IS COOKIE FROM CLIENT", myCookieValue);
    socket.emit("updateUserId", myCookieValue);
  };

  if (isUpdating) return <Spinner />;
  return (
    <>
      <TableRow role="row">
        {/* Display userJoined message */}

        <div>
          {userJoined &&
            `User ${userJoined} has clicked on update Amount Button`}
        </div>

        <Cabin>{PlayerName}</Cabin>
        <div>{TotalRunsScored} </div>
        <Price>{formatCurrency(bidAmount)}</Price>
        <Discount>{formatCurrency(PreviousYearSold)}</Discount>
        <button onClick={handleClick} disabled={isUpdating}>
          Update InitialAmount
        </button>
      </TableRow>
    </>
  );
}

export default AllPlayersRow;
