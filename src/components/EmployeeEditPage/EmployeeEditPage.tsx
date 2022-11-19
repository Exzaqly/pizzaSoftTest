import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  actions,
  Dispatch,
  Employee,
  RoleType,
} from "../../redux/employeesReducer";
import { IMask, IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "../../redux/selectors";

export const EmployeeEditPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams() as Params;
  const { register, handleSubmit, control } = useForm<FormData>();
  const dispatch: Dispatch = useDispatch();
  const editSubmitHandler: SubmitHandler<FormData> = (data) => {
    dispatch(actions.editEmployee({ id: employee.id, ...data }));
    navigate('/employees')
  };
  const employee = useSelector(getEmployeeById(+params.id)) as Employee;
  return (
    <div>
      <form onSubmit={handleSubmit(editSubmitHandler)}>
        <label htmlFor="name">имя сотрудника</label>
        <input
          {...register("name", {
            value: employee.name,
          })}
          id={"name"}
        />
        <label htmlFor="phone">телефон </label>
        <Controller
          name="phone"
          control={control}
          defaultValue={employee.phone}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask="+7 (000) 000-0000"
              lazy={false}
              definitions={{
                "#": /[1-9]/,
              }}
            />
          )}
        />
        <label htmlFor="birthday">Дата рождения</label>
        <Controller
          name="birthday"
          control={control}
          defaultValue={employee.birthday}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask={"DD.MM.YYYY"}
              lazy={false}
              blocks={{
                YYYY: {
                  mask: IMask.MaskedRange,
                  from: 1900,
                  to: 2022,
                },
                MM: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 12,
                },
                DD: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 31,
                },
              }}
            />
          )}
        />
        <select
          {...register("role", {
            value: employee.role,
          })}
        >
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        <label htmlFor="isArchive">в архиве</label>
        <input
          {...register("isArchive", { value: employee.isArchive })}
          id={"isArchive"}
          type={"checkbox"}
        />
        <button type={"submit"}>Подтвердить</button>
      </form>
    </div>
  );
};

type FormData = {
  name: string;
  phone: string;
  birthday: string;
  role: RoleType;
  isArchive: boolean;
};

type Params = {
    id: string
}