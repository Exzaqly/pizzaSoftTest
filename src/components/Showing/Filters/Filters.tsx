import { ChangeEvent, FC } from "react";
import {
  actions,
  Dispatch,
  roleFiltering,
  RoleFilterType,
} from "../../../redux/filterReducer";
import { useDispatch, useSelector } from "react-redux";
import { archiveFilterSelector } from "../../../redux/selectors";
import s from "./Filters.module.scss";

export const Filters: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const isArchive = useSelector(archiveFilterSelector);
  const showFilteredByRoleHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setRoleFilterValue(event.target.value as RoleFilterType));
  };
  const showFilteringByArchiveHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(actions.setArchiveFilterValue(event.target.checked));
  };
  return (
    <div className={s.filters}>
      <div className={s.select}>
        <label htmlFor="{'roleSelect'}">Должность </label>
        <select
          defaultValue={roleFiltering.SHOW_COOKS}
          onChange={showFilteredByRoleHandler}
          id={"roleSelect"}
        >
          <option value={roleFiltering.SHOW_COOKS}>Повар</option>
          <option value={roleFiltering.SHOW_DRIVERS}>Водитель</option>
          <option value={roleFiltering.SHOW_WAITERS}>Официант</option>
        </select>
      </div>

      <div className={s.checkbox}>
        <label htmlFor="Archive">В Архиве</label>
        <input
          defaultChecked={isArchive}
          type={"checkbox"}
          id={"Archive"}
          onChange={showFilteringByArchiveHandler}
        />
      </div>
    </div>
  );
};

type ArchiveForm = {
  isArchive: boolean;
};
