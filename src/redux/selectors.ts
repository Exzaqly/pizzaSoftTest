import {AppStateType} from "./store";
import {createSelector} from "reselect";
import {Employee} from "./employeesReducer";
import {
    archiveFiltering,
    ArchiveFilterType,
    positionFiltering,
    PositionFilterType,
    sortingMethod,
    SortingType,
} from "./filterReducer";
import {compose} from "redux";
import dayjs from "dayjs";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat)

export const employeesSelector = (state: AppStateType) =>
    state.employee.employees;
export const positionFilterSelector = (state: AppStateType) =>
    state.filter.positionFilter;
export const archiveFilterSelector = (state: AppStateType) =>
    state.filter.archiveFilter;
export const sortSelector = (state: AppStateType) => state.filter.sort;

export const getSuitableEmployees = createSelector(
    employeesSelector,
    positionFilterSelector,
    archiveFilterSelector,
    sortSelector,
    (employees, positionFilter, archiveFilter, sort) => {
        const options = {employees, positionFilter, archiveFilter, sort};
        type Options = typeof options;

        const {employees: newEmployees} = compose<Options>(
            getSortedEmployee,
            getArchiveFilteredEmployee,
            getPositionFilteredEmployee
        )(options);
        return newEmployees;
    }
);

const getPositionFilteredEmployee = ({
                                         employees,
                                         positionFilter,
                                         ...rest
                                     }: {
    employees: Employee[];
    positionFilter: PositionFilterType;
}) => {
    switch (positionFilter) {
        case positionFiltering.SHOW_DRIVERS: {
            return {
                employees: employees.filter((e) => e.role === "driver"),
                ...rest,
            };
        }
        case positionFiltering.SHOW_WAITERS: {
            return {
                employees: employees.filter((e) => e.role === "waiter"),
                ...rest,
            };
        }
        case positionFiltering.SHOW_COOKS: {
            return {
                employees: employees.filter((e) => e.role === "cook"),
                ...rest,
            };
        }
        default: {
            throw new Error("Unknown filtering: " + positionFilter);
        }
    }
};

const getArchiveFilteredEmployee = ({
                                        employees,
                                        archiveFilter,
                                        ...rest
                                    }: {
    employees: Employee[];
    archiveFilter: ArchiveFilterType;
}) => {
    switch (archiveFilter) {
        case archiveFiltering.SHOW_NOT_ARCHIVED: {
            return {
                employees: employees.filter((e) => !e.isArchive),
                ...rest,
            };
        }
        case archiveFiltering.SHOW_ARCHIVED: {
            return {
                employees: employees.filter((e) => e.isArchive),
                ...rest,
            };
        }
        default: {
            throw new Error("Unknown filtering: " + archiveFilter);
        }
    }
};

const getSortedEmployee = ({
                               employees,
                               sort,
                               ...rest
                           }: {
    employees: Employee[];
    sort: SortingType;
}) => {
    switch (sort) {
        case sortingMethod.BY_NAME_ASCENDING: {
            return {
                employees: [...employees].sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase())
                        return -1
                    if (a.name.toLowerCase() > b.name.toLowerCase())
                        return 1
                    return 0
                }),
                ...rest,
            };
        }
        case sortingMethod.BY_NAME_DESCENDING: {
            return {
                employees: [...employees].sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase())
                        return -1
                    if (a.name.toLowerCase() < b.name.toLowerCase())
                        return 1
                    return 0
                }),
                ...rest,
            };
        }
        case sortingMethod.BY_BIRTHDAY_ASCENDING: {
            return {
                employees: [...employees].sort((a, b) => {
                    return (
                        dayjs(a.birthday, 'DD.MM.YYYY').valueOf() - dayjs(b.birthday, 'DD.MM.YYYY').valueOf())
                }),
                ...rest,
            };
        }
        case sortingMethod.BY_BIRTHDAY_DESCENDING: {
            return {
                employees: [...employees].sort((a, b) => {
                    return (
                        dayjs(b.birthday, 'DD.MM.YYYY').valueOf() - dayjs(a.birthday, 'DD.MM.YYYY').valueOf())
                }),
                ...rest,
            };
        }
        default: {
            throw new Error("Unknown sort: " + sort);
        }
    }
};
