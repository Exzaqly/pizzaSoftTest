import { FC, useState } from 'react'
import { IMask, IMaskInput } from 'react-imask'
import { InputProps } from './AddForm'

export const MaskedDateInput: FC<InputProps> = ({
                                                  defaultValue,
                                                  onChange,
                                                  ...props
                                                }) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '')

  const handleAccept = (v: any) => {
    setValue(v)
    onChange(v)
  }

  return (
    <IMaskInput
      {...props}
      ref={null}
      mask={'DD.MM.YYYY'}
      lazy={true}
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
  )
}
