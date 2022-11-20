import { AppStateType } from './store'
import { createSelector } from 'reselect'
import { Employee } from './employeesReducer'
import {
  roleFiltering,
  RoleFilterType,
  sortingMethod,
  SortingType,
} from './filterReducer'
import { compose } from 'redux'
import dayjs from 'dayjs'

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const employeesSelector = (state: AppStateType) =>
  state.employee.employees
export const roleFilterSelector = (state: AppStateType) =>
  state.filter.roleFilter
export const archiveFilterSelector = (state: AppStateType) =>
  state.filter.archiveFilter
export const sortSelector = (state: AppStateType) => state.filter.sort
export const getEmployeeById = (id: number) =>
  createSelector(employeesSelector, (employees) =>
    [...employees].find((e) => e.id === id)
  )

export const getSuitableEmployees = createSelector(
  employeesSelector,
  roleFilterSelector,
  archiveFilterSelector,
  sortSelector,
  (employees, roleFilter, archiveFilter, sort) => {
    const options = { employees, roleFilter, archiveFilter, sort }
    type Options = typeof options

    const { employees: newEmployees } = compose<Options>(
      getSortedEmployee,
      getArchiveFilteredEmployee,
      getPositionFilteredEmployee
    )(options)
    return newEmployees
  }
)

const getPositionFilteredEmployee = ({
  employees,
  roleFilter,
  ...rest
}: {
  employees: Employee[]
  roleFilter: RoleFilterType
}) => {
  switch (roleFilter) {
    case roleFiltering.SHOW_DRIVERS: {
      return {
        employees: employees.filter((e) => e.role === 'driver'),
        ...rest,
      }
    }
    case roleFiltering.SHOW_WAITERS: {
      return {
        employees: employees.filter((e) => e.role === 'waiter'),
        ...rest,
      }
    }
    case roleFiltering.SHOW_COOKS: {
      return {
        employees: employees.filter((e) => e.role === 'cook'),
        ...rest,
      }
    }
    default: {
      throw new Error('Unknown filtering: ' + roleFilter)
    }
  }
}

const getArchiveFilteredEmployee = ({
  employees,
  archiveFilter,
  ...rest
}: {
  employees: Employee[]
  archiveFilter: boolean
}) => {
  switch (archiveFilter) {
    case false: {
      return {
        employees: employees.filter((e) => !e.isArchive),
        ...rest,
      }
    }
    case true: {
      return {
        employees: employees.filter((e) => e.isArchive),
        ...rest,
      }
    }
    default: {
      throw new Error('Unknown filtering: ' + archiveFilter)
    }
  }
}

const getSortedEmployee = ({
  employees,
  sort,
  ...rest
}: {
  employees: Employee[]
  sort: SortingType
}) => {
  switch (sort) {
    case sortingMethod.BY_NAME_ASCENDING: {
      return {
        employees: [...employees].sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
          return 0
        }),
        ...rest,
      }
    }
    case sortingMethod.BY_NAME_DESCENDING: {
      return {
        employees: [...employees].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
          return 0
        }),
        ...rest,
      }
    }
    case sortingMethod.BY_BIRTHDAY_ASCENDING: {
      return {
        employees: [...employees].sort((a, b) => {
          return (
            dayjs(a.birthday, 'DD.MM.YYYY').valueOf() -
            dayjs(b.birthday, 'DD.MM.YYYY').valueOf()
          )
        }),
        ...rest,
      }
    }
    case sortingMethod.BY_BIRTHDAY_DESCENDING: {
      return {
        employees: [...employees].sort((a, b) => {
          return (
            dayjs(b.birthday, 'DD.MM.YYYY').valueOf() -
            dayjs(a.birthday, 'DD.MM.YYYY').valueOf()
          )
        }),
        ...rest,
      }
    }
    default: {
      throw new Error('Unknown sort: ' + sort)
    }
  }
}
