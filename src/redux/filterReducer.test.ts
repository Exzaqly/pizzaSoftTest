import filterReducer, {
  actions,
  ArchiveFilterType,
  PositionFilterType,
  SortingType,
} from "./filterReducer";

let state = {
  positionFilter: "SHOW_DRIVERS" as PositionFilterType,
  archiveFilter: "SHOW_NOT_ARCHIVED" as ArchiveFilterType,
  sort: "BY_NAME" as SortingType,
};

it("Position filter should be changed", () => {
  let action = actions.setPositionFilterValue("SHOW_COOKS");
  let newState = filterReducer(state, action);
  expect(newState.positionFilter).toBe("SHOW_COOKS");
});

it("Archive filter should be changed", () => {
  let action = actions.setArchiveFilterValue("SHOW_ARCHIVED");
  let newState = filterReducer(state, action);
  expect(newState.archiveFilter).toBe("SHOW_ARCHIVED");
});

it("sorting method should be changed", () => {
  let action = actions.setSortingValue("BY_BIRTHDAY_ASCENDING");
  let newState = filterReducer(state, action);
  expect(newState.sort).toBe("BY_BIRTHDAY");
});
