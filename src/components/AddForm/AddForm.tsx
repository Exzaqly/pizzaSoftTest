import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RoleType } from '../../redux/employeesReducer'
import s from './AddForm.module.scss'
import { Noop } from 'react-hook-form/dist/types'
import { MaskedDateInput } from './MaskedDateInput'
import { MaskedPhoneInput } from './MaskedPhoneInput'

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
  } = useForm<AddFormData>()

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
      <div className={s.block}>
        <label htmlFor="name">Имя сотрудника</label>
        <input
          {...register('name', {
            value: name,
            required: true,
          })}
          id={'name'}
        />
      </div>

      {errors?.name?.type === 'required' && <p>Это обязательное поле</p>}

      <div className={s.block}>
        <label htmlFor="phone">Телефон</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: true,
            minLength: 17,
          }}
          render={({ field, fieldState }) => (
            <MaskedPhoneInput defaultValue={phone} {...field} ref={null} />
          )}
        />
      </div>
      {errors?.phone?.type === 'required' && <p>Это обязательное поле</p>}
      {errors?.phone?.type === 'minLength' && (
        <p>Введите корректный номер телефона</p>
      )}
      <div className={s.block}>
        <label htmlFor="birthday">Дата рождения</label>
        <Controller
          name="birthday"
          control={control}
          rules={{
            required: true,
            minLength: 10,
          }}
          render={({ field }) => (
            <MaskedDateInput defaultValue={birthday} {...field} ref={null} />
          )}
        />
      </div>
      {errors?.birthday?.type === 'required' && <p>Это обязательное поле</p>}
      {errors?.birthday?.type === 'minLength' && (
        <p>Введите корректную дату рождения</p>
      )}
      <div className={s.block}>
        <label htmlFor="select">Должность</label>
        <select
          {...register('role', {
            value: role,
          })}
          id={'select'}
        >
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </div>
      <div className={s.checkbox}>
        Статус
        <div className={s.checkbox_input}>
          <label htmlFor="isArchive"> В архиве </label>
          <input
            {...register('isArchive', { value: isArchive })}
            id={'isArchive'}
            type={'checkbox'}
          />
        </div>
      </div>
      <button type={'submit'}>Подтвердить</button>
    </form>
  )
}

export type InputProps = {
  defaultValue?: string
  onChange: (...event: any[]) => void
  onBlur: Noop
  value: any
  name: string
  ref: null
}

export type AddFormData = {
  name: string
  phone: string
  birthday: string
  role: RoleType
  isArchive: boolean
}

type Props = {
  submitHandler: (data: AddFormData) => void
  name?: string
  phone?: string
  birthday?: string
  role?: RoleType
  isArchive?: boolean
}
