import AllUnits from "../components/AllUnits/AllUnits";
import ScrollButton from "../components/ScrollButton/ScrollButton";
import { useEffect } from "react";

function AllData() {
  useEffect(() => {
        document.title = 'All Units Info';
      }, []);
  return (
    <>
      <AllUnits />
      <ScrollButton />
    </>
  )
}

export default AllData;