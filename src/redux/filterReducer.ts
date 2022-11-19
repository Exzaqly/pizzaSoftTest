import { AppStateType, BaseThunk, InferActionsType } from "./store";
import { ThunkDispatch } from "redux-thunk";

const SET_POSITION_FILTER_VALUE = "filter/SET_POSITION_FILTER_VALUE";
const SET_ARCHIVE_FILTER_VALUE = "filter/SET_ARCHIVE_FILTER_VALUE";
const SET_SORTING_VALUE = "filter/SET_SORTING_VALUE";
export const positionFiltering = {
  SHOW_DRIVERS: "SHOW_DRIVERS",
  SHOW_WAITERS: "SHOW_WAITERS",
  SHOW_COOKS: "SHOW_COOKS",
};
export const archiveFiltering = {
  SHOW_ARCHIVED: "SHOW_ARCHIVED",
  SHOW_NOT_ARCHIVED: "SHOW_NOT_ARCHIVED",
};
export const sortingMethod = {
  BY_BIRTHDAY_ASCENDING: "BY_BIRTHDAY_ASCENDING",
  BY_BIRTHDAY_DESCENDING: "BY_BIRTHDAY_DESCENDING",
  BY_NAME_ASCENDING: "BY_NAME_ASCENDING",
  BY_NAME_DESCENDING: "BY_NAME_DESCENDING",
};

let initialState = {
  positionFilter: positionFiltering.SHOW_COOKS as PositionFilterType,
  archiveFilter: archiveFiltering.SHOW_NOT_ARCHIVED as ArchiveFilterType,
  sort: sortingMethod.BY_NAME_ASCENDING as SortingType,
};

const filterReducer = (
  state = initialState,
  action: Actions
): initialStateType => {
  switch (action.type) {
    case SET_POSITION_FILTER_VALUE: {
      return {
        ...state,
        positionFilter: action.payload.filter,
      };
    }
    case SET_ARCHIVE_FILTER_VALUE: {
      return {
        ...state,
        archiveFilter: action.payload.filter,
      };
    }
    case SET_SORTING_VALUE: {
      return {
        ...state,
        sort: action.payload.sort,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setPositionFilterValue: (filter: PositionFilterType) =>
    ({ type: SET_POSITION_FILTER_VALUE, payload: { filter } } as const),
  setArchiveFilterValue: (filter: ArchiveFilterType) =>
    ({ type: SET_ARCHIVE_FILTER_VALUE, payload: { filter } } as const),
  setSortingValue: (sort: SortingType) =>
    ({ type: SET_SORTING_VALUE, payload: { sort } } as const),
};

export default filterReducer;
type initialStateType = typeof initialState;
type Actions = InferActionsType<typeof actions>;
export type Dispatch = ThunkDispatch<AppStateType, any, Actions>;
export type SortingType = keyof typeof sortingMethod;
export type PositionFilterType = keyof typeof positionFiltering;
export type ArchiveFilterType = keyof typeof archiveFiltering;
