import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateEmployee from './pages/CreateEmployee/CreateEmployee'
import './App.css'

const EmployeeList = lazy(() => import('./pages/EmployeeList/EmployeeList'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route
        path="/employee-list"
        element={
          <Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
            <EmployeeList />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
