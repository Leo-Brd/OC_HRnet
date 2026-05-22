import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import states from "../../data/states"
import departments from "../../data/departments"
import Modal from "../../components/Modal/Modal"
import { addEmployee } from "../../store/employeesSlice"

function CreateEmployee() {
  const dispatch     = useDispatch()
  const dobRef       = useRef(null)
  const startDateRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const $ = globalThis.$
    if (!$) return

    // Plugin 1 - jquery.datetimepicker (conservé — sera converti en composant React npm)
    const dobEl = dobRef.current
    const sdEl  = startDateRef.current
    $(dobEl).datetimepicker({ timepicker: false, format: "m/d/Y" })
    $(sdEl).datetimepicker({ timepicker: false, format: "m/d/Y" })

    return () => {
      $(dobEl).datetimepicker("destroy")
      $(sdEl).datetimepicker("destroy")
    }
  }, [])

  const saveEmployee = (e) => {
    e.preventDefault()
    const employee = {
      firstName:   document.getElementById("first-name").value,
      lastName:    document.getElementById("last-name").value,
      dateOfBirth: dobRef.current.value,
      startDate:   startDateRef.current.value,
      department:  document.getElementById("department").value,
      street:      document.getElementById("street").value,
      city:        document.getElementById("city").value,
      state:       document.getElementById("state").value,
      zipCode:     document.getElementById("zip-code").value,
    }
    dispatch(addEmployee(employee))
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    document.getElementById("create-employee").reset()
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
              <select id="state" name="state" className="form-select" defaultValue={states[0].abbreviation}>
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
            <select id="department" name="department" className="form-select" defaultValue={departments[0]}>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <button type="submit">Save Employee</button>
          </form>
        </div>
      </main>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <p>Employee Created!</p>
      </Modal>
    </div>
  )
}

export default CreateEmployee
