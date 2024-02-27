import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
function Cabins() {
  const data = getPlayers();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Players</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
