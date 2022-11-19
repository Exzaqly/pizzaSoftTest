import { ChangeEvent, FC } from "react";
import {
  actions,
  Dispatch,
  roleFiltering,
  RoleFilterType,
} from "../../../redux/filterReducer";
import {useDispatch, useSelector} from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import {archiveFilterSelector} from "../../../redux/selectors";

export const Filters: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const isArchive = useSelector(archiveFilterSelector)
  const showFilteredByRoleHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setRoleFilterValue(event.target.value as RoleFilterType));
  };
  const showFilteringByArchiveHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setArchiveFilterValue(event.target.checked))
  };
  return (
    <div>
      <select
        defaultValue={roleFiltering.SHOW_COOKS}
        onChange={showFilteredByRoleHandler}
      >
        <option value={roleFiltering.SHOW_COOKS}>Повара</option>
        <option value={roleFiltering.SHOW_DRIVERS}>Водители</option>
        <option value={roleFiltering.SHOW_WAITERS}>Официанты</option>
      </select>

        <label htmlFor="Archive">В Архиве</label>
        <input defaultChecked={isArchive} type={"checkbox"} id={"Archive"} onChange={showFilteringByArchiveHandler}/>
    </div>
  );
};

type ArchiveForm = {
  isArchive: boolean
}