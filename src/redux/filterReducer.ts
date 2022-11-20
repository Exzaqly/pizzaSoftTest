import { AppStateType, InferActionsType } from './store'
import { ThunkDispatch } from 'redux-thunk'

const SET_ROLE_FILTER_VALUE = 'filter/SET_ROLE_FILTER_VALUE'
const SET_ARCHIVE_FILTER_VALUE = 'filter/SET_ARCHIVE_FILTER_VALUE'
const SET_SORTING_VALUE = 'filter/SET_SORTING_VALUE'
export const roleFiltering = {
  SHOW_DRIVERS: 'SHOW_DRIVERS',
  SHOW_WAITERS: 'SHOW_WAITERS',
  SHOW_COOKS: 'SHOW_COOKS',
}
export const sortingMethod = {
  BY_BIRTHDAY_ASCENDING: 'BY_BIRTHDAY_ASCENDING',
  BY_BIRTHDAY_DESCENDING: 'BY_BIRTHDAY_DESCENDING',
  BY_NAME_ASCENDING: 'BY_NAME_ASCENDING',
  BY_NAME_DESCENDING: 'BY_NAME_DESCENDING',
}

let initialState = {
  roleFilter: roleFiltering.SHOW_COOKS as RoleFilterType,
  archiveFilter: false,
  sort: sortingMethod.BY_NAME_ASCENDING as SortingType,
}

const filterReducer = (
  state = initialState,
  action: Actions
): initialStateType => {
  switch (action.type) {
    case SET_ROLE_FILTER_VALUE: {
      return {
        ...state,
        roleFilter: action.payload.filter,
      }
    }
    case SET_ARCHIVE_FILTER_VALUE: {
      return {
        ...state,
        archiveFilter: action.payload.filter,
      }
    }
    case SET_SORTING_VALUE: {
      return {
        ...state,
        sort: action.payload.sort,
      }
    }
    default:
      return state
  }
}

export const actions = {
  setRoleFilterValue: (filter: RoleFilterType) =>
    ({ type: SET_ROLE_FILTER_VALUE, payload: { filter } } as const),
  setArchiveFilterValue: (filter: boolean) =>
    ({ type: SET_ARCHIVE_FILTER_VALUE, payload: { filter } } as const),
  setSortingValue: (sort: SortingType) =>
    ({ type: SET_SORTING_VALUE, payload: { sort } } as const),
}

export default filterReducer
type initialStateType = typeof initialState
type Actions = InferActionsType<typeof actions>
export type Dispatch = ThunkDispatch<AppStateType, any, Actions>
export type SortingType = keyof typeof sortingMethod
export type RoleFilterType = keyof typeof roleFiltering
