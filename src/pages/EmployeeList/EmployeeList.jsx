import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const columns = [
  { title: "First Name",   data: "firstName"   },
  { title: "Last Name",    data: "lastName"    },
  { title: "Start Date",   data: "startDate"   },
  { title: "Department",   data: "department"  },
  { title: "Date of Birth",data: "dateOfBirth" },
  { title: "Street",       data: "street"      },
  { title: "City",         data: "city"        },
  { title: "State",        data: "state"       },
  { title: "Zip Code",     data: "zipCode"     },
]

function EmployeeList() {
  const tableRef = useRef(null)

  useEffect(() => {
    const $ = globalThis.$
    if (!$) return

    const tableEl = tableRef.current
    const employees = JSON.parse(localStorage.getItem("employees")) || []

    const dt = $(tableEl).DataTable({
      data: employees,
      columns,
    })

    return () => {
      if ($.fn.DataTable.isDataTable(tableEl)) {
        dt.destroy()
      }
    }
  }, [])

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="display" ref={tableRef}></table>
      <Link to="/">Home</Link>
    </div>
  )
}

export default EmployeeList
