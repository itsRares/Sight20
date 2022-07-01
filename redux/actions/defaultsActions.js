// Define action types
export const UPDATED_PARENTALLOCK = "UPDATED_PARENTALLOCK";
export const UPDATED_HIDESTOP = "UPDATED_HIDESTOP";
export const UPDATED_HIDESCHEDULE = "UPDATED_HIDESCHEDULE";
export const UPDATED_SCHEDULE = "UPDATED_SCHEDULE";
export const LETMEIN = "LETMEIN";

export const updatedParentalLock = (value) => (dispatch) => {
  dispatch({
    type: UPDATED_PARENTALLOCK,
    payload: value,
  });
};

export const updateHideStop = (value) => (dispatch) => {
  dispatch({
    type: UPDATED_HIDESTOP,
    payload: value,
  });
};

export const updateHideSchedule = (value) => (dispatch) => {
  dispatch({
    type: UPDATED_HIDESCHEDULE,
    payload: value,
  });
};

export const updateSchedule = (value) => (dispatch) => {
  dispatch({
    type: UPDATED_SCHEDULE,
    payload: value,
  });
};

export const letMeIn = () => (dispatch) => {
  dispatch({
    type: UPDATED_SCHEDULE,
    payload: true,
  });
};
