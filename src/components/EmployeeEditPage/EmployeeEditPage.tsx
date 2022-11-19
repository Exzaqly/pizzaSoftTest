import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RoleType } from "../../redux/employeesReducer";
import InputMask from 'react-input-mask'

export const EmployeeEditPage: FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<FormData>();
  const editSubmitHandler: SubmitHandler<FormData> = (data) =>{
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(editSubmitHandler)}>
        <label htmlFor="name">имя сотрудника</label>
        <input {...register("name")} id={"name"} />
        <label htmlFor="phone">телефон </label>
        <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
                <InputMask {...field} mask="+7 (999) 999-9999" maskChar=" " placeholder={'+7 (999) 999-9999'}/>
            )}
        />
        <input {...register("birthday")} id={"birthday"} type={"date"}/>
        <select {...register("role")}>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
        <label htmlFor="isArchive">в архиве</label>
        <input {...register("isArchive")} id={"isArchive"} type={"checkbox"} />
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