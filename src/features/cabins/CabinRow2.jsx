import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookedPlayer } from "../../services/apiCabins";

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

function CabinRow2({ boughtPlayer }) {
  const {
    id: teamId,
    PlayerName,
    Price,
    Retained,
    RunsScored,
    image,
  } = boughtPlayer;
  console.log(boughtPlayer);
  const queryClient = useQueryClient();
  const { isLoading: isDeleteing, mutate } = useMutation({
    mutationFn: (id) => deleteBookedPlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getBoughtPlayers"],
      });
    },
  });
  function handleClick() {
    mutate(teamId);
  }
  console.log(Retained);
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{PlayerName}</Cabin>
        <div>{Price}</div>
        <Discount>{formatCurrency(RunsScored)}</Discount>
        <div>{`${Retained ? "Yes is" : "No is not"}`} retained</div>
        <button onClick={handleClick} disabled={isDeleteing}>
          Delete
        </button>
      </TableRow>
    </>
  );
}

export default CabinRow2;
