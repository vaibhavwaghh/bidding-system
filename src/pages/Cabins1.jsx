import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import CabinTable from "../features/cabins/CabinTable";
import CabinTable1 from "../features/cabins/CabinTable1";
function Cabins1() {
  const data = getPlayers();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Teams</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <CabinTable1 />
      </Row>
    </>
  );
}

export default Cabins1;
