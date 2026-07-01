import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "startDate", label: "Start Date" },
  { key: "department", label: "Department" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
]

// Table styles for proper HTML table
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.875rem",
}

const theadStyle = {
  backgroundColor: "#1e3a5f",
  color: "#ffffff",
}

const thStyle = {
  padding: "1rem",
  fontSize: "0.75rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  textAlign: "left",
  borderBottom: "2px solid #1e3a5f",
}

const tbodyTrStyle = {
  borderBottom: "1px solid #e2e8f0",
  cursor: "pointer",
}

const tbodyTrHoverStyle = {
  backgroundColor: "rgba(59,130,246,0.04)",
}

const tdStyle = {
  padding: "1rem",
}

function EmployeeList() {
  const [filterText, setFilterText] = useState("")
  const employees = useSelector((state) => state.employees)

  const filteredEmployees = useMemo(
    () =>
      employees.filter((emp) =>
        Object.values(emp)
          .join(" ")
          .toLowerCase()
          .includes(filterText.toLowerCase())
      ),
    [employees, filterText]
  )

  return (
    <div className="page">
      <header className="app-header">
        <div className="header-inner">
          <h1 className="logo">HRnet</h1>
          <Link to="/" className="nav-link">← Add Employee</Link>
        </div>
      </header>

      <main className="main-content">
        <div className="card table-card">
          <div className="table-header">
            <h2>Current Employees</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Search…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          
          {filteredEmployees.length === 0 ? (
            <div role="status" aria-live="polite" className="no-data">
              No employees found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead style={theadStyle}>
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} style={thStyle}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((row, idx) => (
                    <tr 
                      key={idx}
                      style={tbodyTrStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tbodyTrHoverStyle.backgroundColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      {columns.map((col) => (
                        <td key={col.key} style={tdStyle}>
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default EmployeeList
