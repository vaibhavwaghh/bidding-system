import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getTeams } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow1 from "./CabinRow1";
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

function CabinTable1() {
  const {
    isLoading,
    data: teams,
    error,
  } = useQuery({
    queryKey: ["allTeams"],
    queryFn: getTeams,
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div></div>
          <div>Team Name</div>
          <div>Number of players</div>
          <div>Capacity</div>
          <div>Wallet</div>
          <div></div>
        </TableHeader>
        {teams.map((team) => (
          <CabinRow1 team={team} key={team.id} />
        ))}
      </Table>
    </>
  );
}

export default CabinTable1;
