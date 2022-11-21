import { FC } from 'react'
import { AddForm, AddFormData } from '../AddForm/AddForm'
import { SubmitHandler } from 'react-hook-form'
import { addEmployee, Dispatch } from '../../redux/employeesReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const EmployeeAddPage: FC = () => {
  const navigate = useNavigate()
  const dispatch: Dispatch = useDispatch()

  const addSubmitHandler: SubmitHandler<AddFormData> = (data) => {

    dispatch(
      addEmployee(
        data.name,
        data.isArchive,
        data.birthday,
        data.role,
        data.phone
      )
    )
    navigate('/employees')
  }

  return <AddForm submitHandler={addSubmitHandler} />
}
