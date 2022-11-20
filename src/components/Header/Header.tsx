import { FC } from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  return (
    <div className={s.header}>
      <h1 className={s.title}>Список сотрудников </h1>
      <div className={s.add_button}>
        <NavLink to={"/employees/form"}>Добавить сотрудника</NavLink>
      </div>
    </div>
  );
};
