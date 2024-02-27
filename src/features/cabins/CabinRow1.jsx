import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlayer, deleteTeam } from "../../services/apiCabins";

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

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
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

function CabinRow1({ team }) {
  const {
    id: teamId,
    TeamName,
    NumberofPlayers,
    capacity,
    Wallet,
    image,
  } = team;
  const queryClient = useQueryClient();
  const { isLoading: isDeleteing, mutate } = useMutation({
    mutationFn: (id) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTeams"],
      });
    },
  });
  function handleClick() {
    mutate(teamId);
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{TeamName}</Cabin>
        <div>{NumberofPlayers} in Team Now </div>
        <Price>{capacity}</Price>
        <Discount>{formatCurrency(Wallet)}</Discount>
        <button onClick={handleClick} disabled={isDeleteing}>
          Delete
        </button>
      </TableRow>
    </>
  );
}

export default CabinRow1;
