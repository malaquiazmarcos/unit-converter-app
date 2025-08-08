import ConvertUnits from "../components/ConvertUnits/ConvertUnits";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
      document.title = 'Units Forge';
    }, []);
    
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <h1 className={`text-center mt-4`}>Simple and Fast Unit Converter</h1>
        <ConvertUnits />
      </div>
    </>
  );
}

export default Home;