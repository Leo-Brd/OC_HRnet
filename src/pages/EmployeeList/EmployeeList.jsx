import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component"
import "./EmployeeList.css"

const columns = [
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
    reorder: true,
  },
  {
    name: "Last Name",
    selector: (row) => row.lastName,
    sortable: true,
    reorder: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
    reorder: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    reorder: true,
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dateOfBirth,
    sortable: true,
    reorder: true,
  },
  {
    name: "Street",
    selector: (row) => row.street,
    sortable: true,
    reorder: true,
  },
  {
    name: "City",
    selector: (row) => row.city,
    sortable: true,
    reorder: true,
  },
  {
    name: "State",
    selector: (row) => row.state,
    sortable: true,
    reorder: true,
  },
  {
    name: "Zip Code",
    selector: (row) => row.zipCode,
    sortable: true,
    reorder: true,
  },
]

// Custom styling for DataTable
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#1e3a5f",
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "2px solid #1e3a5f",
    },
  },
  headCells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "rgba(59,130,246,0.04)",
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(59,130,246,0.08)",
      outline: "none",
    },
  },
  cells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f8fafc",
      borderTop: "1px solid #e2e8f0",
      padding: "1rem",
    },
  },
}

function EmployeeList() {
  const [filterText, setFilterText] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
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

  const handlePerRowsChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage)
  }

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
            pagination
            paginationPerPage={rowsPerPage}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationRowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            sortServer={false}
            defaultSortFieldId={1}
            customStyles={customStyles}
            noDataComponent={<div className="no-data">No employees found.</div>}
            highlightOnHover
            pointerOnHover
            striped
            dense
          />
        </div>
      </main>
    </div>
  )
}

export default EmployeeList
