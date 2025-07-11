import { useState, useEffect } from "react";

function AllUnits() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://unitbridgeapi.pythonanywhere.com/v1/units-available')
            .then(response => response.json())
            .then(data => { 
                setUnits(data);
                setLoading(false); 
            })
            .catch(err => {
                console.log('Error when request the data.');
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>All Units Available</h1>
            {loading ? (
                <p>Loading units available...</p>
            ) : (
                <ul>
                    {units.map((unit, index) => (
                        <li key={index}>{unit}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AllUnits;