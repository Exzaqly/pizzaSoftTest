import { ChangeEvent, FC } from "react";
import {
  actions,
  Dispatch,
  sortingMethod,
  SortingType,
} from "../../../redux/filterReducer";
import { useDispatch } from "react-redux";
import s from "./Sorting.module.scss";

export const Sorting: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const sortingHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setSortingValue(event.target.value as SortingType));
  };
  return (
    <div className={s.select}>
      <label htmlFor="sorting"> Сортировка </label>
      <select
        defaultValue={sortingMethod.BY_NAME_ASCENDING}
        onChange={sortingHandle}
        id={"sorting"}
      >
        <option value={sortingMethod.BY_NAME_DESCENDING}>
          По имени &#9650;
        </option>
        <option value={sortingMethod.BY_NAME_ASCENDING}>
          По имени &#9660;
        </option>
        <option value={sortingMethod.BY_BIRTHDAY_DESCENDING}>
          По дате рождения &#9650;
        </option>
        <option value={sortingMethod.BY_BIRTHDAY_ASCENDING}>
          По дате рождения &#9660;
        </option>
      </select>
    </div>
  );
};
