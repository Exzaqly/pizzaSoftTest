import {FC} from "react";

export const Employee: FC<Props> = ({name, role, phone}) => {
  return(
      <div>
          {name} {role} {phone}
      </div>
  )
}

type Props = {
    name: string
    role: string
    phone: string
}