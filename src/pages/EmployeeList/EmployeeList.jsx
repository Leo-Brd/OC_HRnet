import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component"

const columns = [
  { name: "First Name",    selector: (row) => row.firstName,   sortable: true },
  { name: "Last Name",     selector: (row) => row.lastName,    sortable: true },
  { name: "Start Date",    selector: (row) => row.startDate,   sortable: true },
  { name: "Department",    selector: (row) => row.department,  sortable: true },
  { name: "Date of Birth", selector: (row) => row.dateOfBirth, sortable: true },
  { name: "Street",        selector: (row) => row.street,      sortable: true },
  { name: "City",          selector: (row) => row.city,        sortable: true },
  { name: "State",         selector: (row) => row.state,       sortable: true },
  { name: "Zip Code",      selector: (row) => row.zipCode,     sortable: true },
]

// Style injecté dans react-data-table pour correspondre au thème navy
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#1e3a5f",
      borderRadius: "6px 6px 0 0",
    },
  },
  headCells: {
    style: {
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  rows: {
    style: { fontSize: "0.875rem", paddingLeft: "0.25rem", paddingRight: "0.25rem" },
    stripedStyle: { backgroundColor: "#f8fafc" },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(59,130,246,0.04)",
      transitionDuration: "0.1s",
    },
  },
  cells: {
    style: { paddingLeft: "1rem", paddingRight: "1rem" },
  },
  pagination: {
    style: { fontSize: "0.85rem", color: "#64748b" },
  },
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
          <DataTable
            columns={columns}
            data={filteredEmployees}
            customStyles={customStyles}
            pagination
            striped
            highlightOnHover
            noDataComponent={<p className="no-data">No employees found.</p>}
          />
        </div>
      </main>
    </div>
  )
}

export default EmployeeList
