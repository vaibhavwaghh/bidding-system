import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import BoughtPlayersTable from "../features/cabins/BoughtPlayersTable";
function BoughtPlayerCabin({ userNo }) {
  const data = getPlayers();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Teams</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <BoughtPlayersTable userNo={userNo} />
      </Row>
    </>
  );
}

export default BoughtPlayerCabin;
