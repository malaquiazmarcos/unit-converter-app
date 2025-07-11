import { useState, useEffect } from "react";

function FullNameUnits() {
  const [nameUnits, setNameUnits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/full-name-all-units');
        const data = await response.json();

        setNameUnits(data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);
   
  return (
    <div>
      <ul>
        {Object.keys(nameUnits).map(category => (
          <li key={category}>
            {category}
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default FullNameUnits;