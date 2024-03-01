import { getPlayers } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AllTeamsTable from "../features/cabins/AllTeamsTable";
function AllTeamsCabin() {
  const data = getPlayers();
  console.log(data);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Teams</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <AllTeamsTable />
      </Row>
    </>
  );
}

export default AllTeamsCabin;
