import { Routes, Route } from 'react-router-dom'
import CreateEmployee from './pages/CreateEmployee/CreateEmployee'
import EmployeeList from './pages/EmployeeList/EmployeeList'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/employee-list" element={<EmployeeList />} />
    </Routes>
  )
}

export default App
