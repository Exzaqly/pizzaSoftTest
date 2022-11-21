import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { actions, Dispatch, Employee } from '../../redux/employeesReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeById } from '../../redux/selectors'
import { AddForm, AddFormData } from '../AddForm/AddForm'

export const EmployeeEditPage: FC = () => {
  const navigate = useNavigate()
  const params = useParams() as Params
  const employee = useSelector(getEmployeeById(+params.id)) as Employee
  const dispatch: Dispatch = useDispatch()

  const editSubmitHandler: SubmitHandler<AddFormData> = (data) => {
    dispatch(actions.editEmployee({ id: employee.id, ...data }))
    navigate('/employees')
  }

  return (
    <AddForm
      submitHandler={editSubmitHandler}
      name={employee.name}
      phone={employee.phone}
      role={employee.role}
      birthday={employee.birthday}
      isArchive={employee.isArchive}
    />
  )
}

type Params = {
  id: string
}
