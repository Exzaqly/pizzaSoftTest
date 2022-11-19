import { FC } from "react";
import { useSelector } from "react-redux";
import { getSuitableEmployees } from "../../redux/selectors";
import { Employee } from "./Employee";
import { Filters } from "../Showing/Filters/Filters";
import { Sorting } from "../Showing/Sorting/Sorting";
import { NavLink } from "react-router-dom";

export const Employees: FC = () => {
  const employees = useSelector(getSuitableEmployees);
  return (
    <div>
      <Filters />
      <Sorting />
      {employees.map((e) => (
        <NavLink to={`/employees/${e.id}`}>
          <Employee key={e.id} name={e.name} phone={e.phone} role={e.role} />
        </NavLink>
      ))}
    </div>
  );
};