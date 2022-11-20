import React from 'react'
import { Header } from './components/Header/Header'
import { Employees } from './components/Employees/Employees'
import { Route, Routes } from 'react-router-dom'
import { EmployeeEditPage } from './components/EmployeePages/EmployeeEditPage'
import { EmployeeAddPage } from './components/EmployeePages/EmployeeAddPage'

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
