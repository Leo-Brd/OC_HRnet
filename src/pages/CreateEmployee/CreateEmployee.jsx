import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import DateTimePicker from "@leo_brd/react-datetimepicker"
import "@leo_brd/react-datetimepicker/dist/react-datetimepicker.css"
import states from "../../data/states"
import departments from "../../data/departments"
import Modal from "../../components/Modal/Modal"
import { addEmployee } from "../../store/employeesSlice"

function CreateEmployee() {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [department, setDepartment] = useState(departments[0])
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(states[0].abbreviation)
  const [zipCode, setZipCode] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const formatDate = (date) => {
    if (!date) return ""
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const saveEmployee = (e) => {
    e.preventDefault()
    const employee = {
      firstName,
      lastName,
      dateOfBirth: formatDate(dateOfBirth),
      startDate: formatDate(startDate),
      department,
      street,
      city,
      state,
      zipCode,
    }
    dispatch(addEmployee(employee))
    setModalOpen(true)
    handleResetForm()
  }

  const handleResetForm = () => {
    setFirstName("")
    setLastName("")
    setDateOfBirth(null)
    setStartDate(null)
    setDepartment(departments[0])
    setStreet("")
    setCity("")
    setState(states[0].abbreviation)
    setZipCode("")
  }

  const handleCloseModal = () => {
    setModalOpen(false)
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
          <form onSubmit={saveEmployee}>

            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <DateTimePicker
              value={dateOfBirth}
              onChange={setDateOfBirth}
              format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
            />

            <label htmlFor="start-date">Start Date</label>
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
            />

            <fieldset className="address">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                className="form-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {states.map((s) => (
                  <option key={s.abbreviation} value={s.abbreviation}>
                    {s.name}
                  </option>
                ))}
              </select>

              <label htmlFor="zip-code">Zip Code</label>
              <input
                id="zip-code"
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </fieldset>

            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
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
