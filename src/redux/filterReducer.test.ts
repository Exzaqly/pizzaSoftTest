import filterReducer, {
  actions,
  RoleFilterType,
  SortingType,
} from "./filterReducer";

let state = {
  roleFilter: "SHOW_DRIVERS" as RoleFilterType,
  archiveFilter: false,
  sort: "BY_NAME" as SortingType,
};

it("Position filter should be changed", () => {
  let action = actions.setRoleFilterValue("SHOW_COOKS");
  let newState = filterReducer(state, action);
  expect(newState.roleFilter).toBe("SHOW_COOKS");
});

it("Archive filter should be changed", () => {
  let action = actions.setArchiveFilterValue(true);
  let newState = filterReducer(state, action);
  expect(newState.archiveFilter).toBeTruthy();
});

it("sorting method should be changed", () => {
  let action = actions.setSortingValue("BY_BIRTHDAY_ASCENDING");
  let newState = filterReducer(state, action);
  expect(newState.sort).toBe("BY_BIRTHDAY");
});
