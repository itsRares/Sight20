import {
  UPDATED_PARENTALLOCK,
  UPDATED_HIDESTOP,
  UPDATED_HIDESCHEDULE,
  UPDATED_SCHEDULE,
} from "../actions/defaultsActions";

const initialState = {
  parentalLock: false,
  hideStop: false,
  hideSchedule: false,
  scheduleType: "Forever",
  scheduleInterval: 5,
  schedule: {},
};

const defaultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_PARENTALLOCK:
      return {
        ...state,
        parentalLock: action.payload,
      };
    case UPDATED_HIDESTOP:
      return {
        ...state,
        hideStop: action.payload,
      };
    case UPDATED_HIDESCHEDULE:
      return {
        ...state,
        hideSchedule: action.payload,
      };
    case UPDATED_SCHEDULE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default defaultsReducer;