import { useAllData } from "../../hooks";
import styles from "./AllUnits.module.css"

function AllUnits() {
  const { data } = useAllData();

  return (
    <div className="container-fluid px-3 pt-3">
      {/* small nav with all magnitudes */}
      <nav className={`${styles.nav} flex-wrap justify-content-center`}>
        {Object.keys(data).map(category => (
          <a
            key={category}
            className={`${styles.navLink} text-capitalize`}
            href={`#${category}`}
          >
            {category}
          </a>
        ))}
      </nav>

      {/* table with all info data */}
      {Object.keys(data).map(category => (
        <div key={category} id={category}>
          <h2 className="text-capitalize">{category}</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>System</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data[category]).map(unitKey => {
                  const unit = data[category][unitKey];
                  return (
                    <tr key={unitKey}>
                      <td className="text-capitalize">{unit.name}</td>
                      <td>{unit.symbol}</td>
                      <td>{unit.system}</td>
                      <td>{unit.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    
  )
}

export default AllUnits;