import {ChangeEvent, FC} from "react";
import {actions, Dispatch, sortingMethod, SortingType} from "../../../redux/filterReducer";
import {useDispatch} from "react-redux";

export const Sorting: FC = () => {
    const dispatch: Dispatch = useDispatch()
    const sortingHandle = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(actions.setSortingValue(event.target.value as SortingType))
    }
    return (
        <div>
            <select defaultValue={sortingMethod.BY_NAME_ASCENDING} onChange={sortingHandle}>
                <option value={sortingMethod.BY_NAME_ASCENDING}>По имени вниз</option>
                <option value={sortingMethod.BY_NAME_DESCENDING}>По имени вверх</option>
                <option value={sortingMethod.BY_BIRTHDAY_ASCENDING}>По дате рождения вниз</option>
                <option value={sortingMethod.BY_BIRTHDAY_DESCENDING}>По дате рождения вверх</option>
            </select>
        </div>
    );
};