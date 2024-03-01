import { useQuery } from "@tanstack/react-query";
import AllDatabasePlayerTable from "../features/cabins/AllDatabasePlayerTable";
import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
function AllDatabasePlayerCabin() {
  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getPlayers,
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Database Players</Heading>
      </Row>
      <Row>
        <AllDatabasePlayerTable players={players} />
      </Row>
    </>
  );
}

export default AllDatabasePlayerCabin;
