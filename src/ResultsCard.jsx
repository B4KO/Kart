

function ResultsCard() {
  return (
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <div className="card-body">
              <div className="overflow-x-auto">
                  <table className="table">
                      <thead>
                      <tr>
                          <th>Prosjektnavn</th>
                          <th>Fylke</th>
                          <th>Eier</th>
                      </tr>
                      </thead>
                      <tbody>
                      {/* row 1 */}
                      <tr>
                          <td>Cy Ganderton</td>
                          <td>Quality Control Specialist</td>
                          <td>Blue</td>
                      </tr>
                      {/* row 2 */}
                      <tr className="hover">
                          <td>Hart Hagerty</td>
                          <td>Desktop Support Technician</td>
                          <td>Purple</td>
                      </tr>
                      {/* row 3 */}
                      <tr>
                          <td>Brice Swyre</td>
                          <td>Tax Accountant</td>
                          <td>Red</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="join grid grid-cols-2">
              <button className="join-item btn btn-outline">Previous page</button>
              <button className="join-item btn btn-outline">Next</button>
          </div>
      </div>
  );
}

export default ResultsCard;