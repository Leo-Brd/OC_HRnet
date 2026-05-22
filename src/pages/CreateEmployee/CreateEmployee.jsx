import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import states from "../../data/states"
import departments from "../../data/departments"

function CreateEmployee() {
  const dobRef       = useRef(null)
  const startDateRef = useRef(null)
  const stateRef     = useRef(null)
  const deptRef      = useRef(null)

  useEffect(() => {
    const $ = globalThis.$
    if (!$) return

    const dobEl   = dobRef.current
    const sdEl    = startDateRef.current
    const stateEl = stateRef.current
    const deptEl  = deptRef.current

    // Plugin 1 - jquery.datetimepicker
    $(dobEl).datetimepicker({ timepicker: false, format: "m/d/Y" })
    $(sdEl).datetimepicker({ timepicker: false, format: "m/d/Y" })

    // Plugin 3 - jQuery UI selectmenu
    $(stateEl).selectmenu()
    $(deptEl).selectmenu()

    return () => {
      $(dobEl).datetimepicker("destroy")
      $(sdEl).datetimepicker("destroy")
      $(stateEl).selectmenu("destroy")
      $(deptEl).selectmenu("destroy")
    }
  }, [])

  const saveEmployee = (e) => {
    e.preventDefault()
    const employees = JSON.parse(localStorage.getItem("employees")) || []
    const employee = {
      firstName:   document.getElementById("first-name").value,
      lastName:    document.getElementById("last-name").value,
      dateOfBirth: dobRef.current.value,
      startDate:   startDateRef.current.value,
      department:  deptRef.current.value,
      street:      document.getElementById("street").value,
      city:        document.getElementById("city").value,
      state:       stateRef.current.value,
      zipCode:     document.getElementById("zip-code").value,
    }
    employees.push(employee)
    localStorage.setItem("employees", JSON.stringify(employees))

    // Plugin 2 - jquery.modal
    globalThis.$("#confirmation").modal()
  }

  return (
    <div className="page">
      <header className="app-header">
        <div className="header-inner">
          <h1 className="logo">HRnet</h1>
          <Link to="/employee-list" className="nav-link">View Current Employees →</Link>
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Create Employee</h2>
          <form id="create-employee" onSubmit={saveEmployee}>

            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" />

            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" type="text" ref={dobRef} />

            <label htmlFor="start-date">Start Date</label>
            <input id="start-date" type="text" ref={startDateRef} />

            <fieldset className="address">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input id="street" type="text" />

              <label htmlFor="city">City</label>
              <input id="city" type="text" />

              <label htmlFor="state">State</label>
              <select name="state" id="state" ref={stateRef} defaultValue={states[0].abbreviation}>
                {states.map((s) => (
                  <option key={s.abbreviation} value={s.abbreviation}>
                    {s.name}
                  </option>
                ))}
              </select>

              <label htmlFor="zip-code">Zip Code</label>
              <input id="zip-code" type="number" />
            </fieldset>

            <label htmlFor="department">Department</label>
            <select name="department" id="department" ref={deptRef} defaultValue={departments[0]}>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <button type="submit">Save Employee</button>
          </form>
        </div>
      </main>

      {/* Plugin 2 - div cible pour jquery.modal */}
      <div id="confirmation" className="modal">Employee Created!</div>
    </div>
  )
}

export default CreateEmployee
