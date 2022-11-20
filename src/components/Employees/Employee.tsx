import { FC } from "react";
import s from "./Employees.module.scss";
import { RoleType } from "../../redux/employeesReducer";

export const Employee: FC<Props> = ({ name, role, phone, birthday }) => {
  return (
    <div className={s.employee}>
      <div className={s.name}>{name}</div>
      <div className={s.role}>
        {role === "cook"
          ? "Повар"
          : role === "waiter"
          ? "Официант"
          : "Водитель"}
      </div>
      <div className={s.phone}>{phone}</div>
      <div className={s.birthday}>{birthday}</div>
    </div>
  );
};

type Props = {
  name: string;
  role: RoleType;
  phone: string;
  birthday: string;
};
