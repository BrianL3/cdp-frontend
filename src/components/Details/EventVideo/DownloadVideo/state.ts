import { timePointToSeconds, secondsToTimePointStr } from "../ShareVideo/utils";

export interface TimePointState {
  /** The starting time point str */
  startValue: string;
  /** The ending time point str */
  endValue: string;
  /** Does the share link URL contain a timepoint query parameter? */
  isActive: boolean;
  /** Is the the modal open? */
  isOpen: boolean;
  /** What format does the user want the clip in? */
  format: string;
}

export enum TimePointActionType {
  UPDATE_START,
  UPDATE_END,
  VALIDATE_VALUES,
  OPEN,
  CLOSE,
  UPDATE_FORMAT,
}

export type TimePointAction =
  | { type: TimePointActionType.UPDATE_START; payload: string }
  | { type: TimePointActionType.UPDATE_END; payload: string }
  // The payload is for `isActive`
  | { type: TimePointActionType.VALIDATE_VALUES; payload?: boolean }
  | { type: TimePointActionType.OPEN; payload: number }
  | { type: TimePointActionType.CLOSE }
  | { type: TimePointActionType.UPDATE_FORMAT; payload: string };

export const initialTimePoint = {
  startValue: "",
  endValue: "",
  isActive: false,
  isOpen: false,
  format: "mp4",
};

export const timePointReducer = (state: TimePointState, action: TimePointAction) => {
  switch (action.type) {
    case TimePointActionType.UPDATE_START: {
      return { ...state, startValue: action.payload };
    }
    case TimePointActionType.UPDATE_END: {
      return { ...state, endValue: action.payload };
    }
    case TimePointActionType.UPDATE_FORMAT: {
      return { ...state, format: action.payload };
    }
    case TimePointActionType.VALIDATE_VALUES: {
      let startValue = timePointToSeconds(state.startValue);
      const endValue = timePointToSeconds(state.endValue);
      if (startValue > endValue) startValue = endValue - 1;
      const newStart = secondsToTimePointStr(startValue);
      const newEnd = secondsToTimePointStr(endValue);
      return action.payload
        ? {
            ...state,
            startValue: newStart,
            endValue: newEnd,
            isActive: action.payload,
          }
        : { ...state, endValue: newEnd, startValue: newStart };
    }
    case TimePointActionType.OPEN: {
      const newValue = secondsToTimePointStr(action.payload);
      const defaultClipSize = secondsToTimePointStr(action.payload + 30);
      return {
        ...state,
        isOpen: true,
        startValue: newValue,
        endValue: defaultClipSize,
        isActive: false,
      };
    }
    case TimePointActionType.CLOSE: {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
};
