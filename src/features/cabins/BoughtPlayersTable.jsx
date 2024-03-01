import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getBookedPlayer, getTeams } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";

import BoughtPlayersRow from "./BoughtPlayersRow";
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

function BoughtPlayersTable({ userNo }) {
  const {
    isLoading,
    data: boughtPlayers,
    error,
  } = useQuery(
    ["getBoughtPlayers", userNo], // Unique query key based on userNo
    () => getBookedPlayer(userNo), // Pass userNo as a parameter to the query function
    {
      refetchOnWindowFocus: false, // Optional: Disable refetching on window focus
    }
  );

  console.log(isLoading);
  if (isLoading) return <Spinner />;
  if (error) return <p>NOT FOUND</p>;
  if (boughtPlayers) {
    if (boughtPlayers.length === 0) return <p>NO PLAYERS WERE BOUGHT</p>;
  }
  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Player Name</div>
          <div>Total Runs Scored</div>
          <div>Previous Year sold</div>
          <div>InitialAmount</div>
        </TableHeader>
        {boughtPlayers.map((boughtPlayer) => (
          <BoughtPlayersRow boughtPlayer={boughtPlayer} key={boughtPlayer.id} />
        ))}
      </Table>
    </>
  );
}

export default BoughtPlayersTable;
