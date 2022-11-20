import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RoleType } from "../../redux/employeesReducer";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import { IMask, IMaskInput } from "react-imask";
import s from "./AddForm.module.scss";

export const AddForm: FC<Props> = ({
  submitHandler,
  name,
  phone,
  isArchive,
  role,
  birthday,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddFormData>();
  return (
    <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
      <div className={s.block}>
        <label htmlFor="name">Имя сотрудника</label>
        <input
          {...register("name", {
            value: name,
            required: true,
          })}
          id={"name"}
        />
      </div>

      {errors?.name?.type === "required" && <p>Это обязательное поле</p>}

      <div className={s.block}>
        <label htmlFor="phone">Телефон</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <MaskedPhoneInput defaultValue={phone} {...field} />
          )}
        />
      </div>
      {errors?.phone?.type === "required" && <p>Это обязательное поле</p>}
      <div className={s.block}>
        <label htmlFor="birthday">Дата рождения</label>
        <Controller
          name="birthday"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <MaskedDateInput defaultValue={birthday} {...field} />
          )}
        />
      </div>
      {errors?.birthday?.type === "required" && <p>Это обязательное поле</p>}
      <div className={s.block}>
        <label htmlFor="select">Должность</label>
        <select
          {...register("role", {
            value: role,
          })}
          id={"select"}
        >
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </div>
      <div className={s.checkbox}>
        <label htmlFor="isArchive">В архиве</label>
        <input
          {...register("isArchive", { value: isArchive })}
          id={"isArchive"}
          type={"checkbox"}
        />
      </div>
      <button type={"submit"}>Подтвердить</button>
    </form>
  );
};

const MaskedPhoneInput: FC<
  ControllerRenderProps & { defaultValue?: string }
> = ({ defaultValue, onChange, ...props }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const handleAccept = (v: any) => {
    setValue(v);
    onChange(v);
  };
  return (
    <IMaskInput
      {...props}
      mask="+7 (000) 000-0000"
      lazy={false}
      definitions={{
        "#": /[1-9]/,
      }}
      onAccept={handleAccept}
      value={value}
    />
  );
};

const MaskedDateInput: FC<
  ControllerRenderProps & { defaultValue?: string }
> = ({ defaultValue, onChange, ...props }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : "");
  const handleAccept = (v: any) => {
    setValue(v);
    onChange(v);
  };

  return (
    <IMaskInput
      {...props}
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
      onAccept={handleAccept}
      value={value}
    />
  );
};

export type AddFormData = {
  name: string;
  phone: string;
  birthday: string;
  role: RoleType;
  isArchive: boolean;
};

type Props = {
  submitHandler: (data: AddFormData) => void;
  name?: string;
  phone?: string;
  birthday?: string;
  role?: RoleType;
  isArchive?: boolean;
};
