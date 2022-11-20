import { FC } from "react";
import { useSelector } from "react-redux";
import { getSuitableEmployees } from "../../redux/selectors";
import { Employee } from "./Employee";
import { Filters } from "../Showing/Filters/Filters";
import { Sorting } from "../Showing/Sorting/Sorting";
import { NavLink } from "react-router-dom";
import s from "./Employees.module.scss";

export const Employees: FC = () => {
  const employees = useSelector(getSuitableEmployees);
  return (
    <div className={s.container}>
      <div className={s.showing}>
        <Filters />
        <Sorting />
      </div>
      <div className={s.employees}>
        <div className={s.naming}>
          <div className={s.name}>Имя</div>
          <div className={s.role}>Должность</div>
          <div className={s.phone}>Номер телефона</div>
          <div className={s.birthday}>Дата рождения</div>
        </div>
        {employees.map((e) => (
          <NavLink to={`/employees/${e.id}`}>
            <Employee
              key={e.id}
              name={e.name}
              phone={e.phone}
              role={e.role}
              birthday={e.birthday}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};
