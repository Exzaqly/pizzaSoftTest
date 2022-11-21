import { FC, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { InputProps } from './AddForm'

export const MaskedPhoneInput: FC<InputProps> = ({
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
      mask="+7 (000) 000-0000"
      lazy={true}
      definitions={{
        '#': /[1-9]/,
      }}
      onAccept={handleAccept}
      value={value}
    />
  )
}
