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
}

export enum TimePointActionType {
  UPDATE_START,
  UPDATE_END,
  VALIDATE_VALUES,
  OPEN,
  CLOSE,
}

export type TimePointAction =
  | { type: TimePointActionType.UPDATE_START; payload: string }
  | { type: TimePointActionType.UPDATE_END; payload: string }
  // The payload is for `isActive`
  | { type: TimePointActionType.VALIDATE_VALUES; payload?: boolean }
  | { type: TimePointActionType.OPEN; payload: number }
  | { type: TimePointActionType.CLOSE };

export const initialTimePoint = {
  startValue: "",
  endValue: "",
  isActive: false,
  isOpen: false,
};

export const timePointReducer = (state: TimePointState, action: TimePointAction) => {
  switch (action.type) {
    case TimePointActionType.UPDATE_START: {
      return { ...state, value: action.payload };
    }
    case TimePointActionType.UPDATE_END: {
      return { ...state, value: action.payload };
    }
    case TimePointActionType.VALIDATE_VALUES: {
      const newStart = secondsToTimePointStr(timePointToSeconds(state.startValue));
      const newEnd = secondsToTimePointStr(timePointToSeconds(state.endValue));
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
