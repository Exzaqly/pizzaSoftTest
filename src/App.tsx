import React from 'react'
import { Header } from './components/Header/Header'
import { Employees } from './components/EmployeesPage/Employees'
import { Route, Routes } from 'react-router-dom'
import { EmployeeAddPage } from './components/EmployeeAddPage/EmployeeAddPage'
import { EmployeeEditPage } from './components/EmployeeEditPage/EmployeeEditPage'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={'/employees'} element={<Employees />} />
        <Route path={`/employees/:id`} element={<EmployeeEditPage />} />
        <Route path={`/employees/form`} element={<EmployeeAddPage />} />
        <Route path={'*'} element={<Employees />} />
      </Routes>
    </div>
  )
}

export default App
