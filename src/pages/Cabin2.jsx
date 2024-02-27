import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable2 from "../features/cabins/CabinTable2";
function Cabins2() {
  const data = getPlayers();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Players</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <CabinTable2 />
      </Row>
    </>
  );
}

export default Cabins2;
