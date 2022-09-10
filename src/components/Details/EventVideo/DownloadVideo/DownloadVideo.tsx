import React, { FC, useRef, useReducer, ChangeEvent, useCallback, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { Form, Modal, Radio } from "semantic-ui-react";

import { useAppConfigContext } from "../../../../app";
import { TimePointActionType, timePointReducer, initialTimePoint } from "./state";
import DownloadIcon from "../../../Shared/DownloadIcon";
import FunctionsCallerService from "../../../../networking/FunctionsCallerService";

const DownloadBtn = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: 4,
  border: 0,
  padding: "8px 16px",
  fontWeight: 600,
  "& > svg": {
    width: "1rem",
    height: "1rem",
  },
});

const TimePoint = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: 8,
  "& > label": {
    padding: 0,
  },
});

const TimePointInput = styled.input<{ disabled: boolean }>((props) => ({
  border: 0,
  borderBottomColor: props.disabled ? "white" : "black",
  borderBottomStyle: "solid",
  borderBottomWidth: "1.5px",
  width: 64,
}));

const DownloadVideoModal = styled(Modal)({
  "i.close.icon": {
    // move close icon inside modal
    top: 0,
    right: 0,
    color: "black",
  },
  "i.close::before": {
    // change icon to ✖
    content: '"\u2716"',
  },
});

interface DownloadVideoProps {
  sessionId: string;
  getCurrentTime(): number;
}

const DownloadVideo: FC<DownloadVideoProps> = ({
  sessionId,
  getCurrentTime,
}: DownloadVideoProps) => {
  // the event id
  const { id } = useParams<{ id: string }>();
  // used for the creation of the function caller service
  const { firebaseConfig } = useAppConfigContext();
  // A reference to the html element where the modal is mounted
  const mountNodeRef = useRef<HTMLDivElement>(null);
  // A reference to the time point input html element
  const timePointInputRef = useRef<HTMLInputElement>(null);
  // timePointState is a React state. dispatch timePointDispatch is used to send an action to timePointReducer
  // to change the timePoint state
  const [timePointState, timePointDispatch] = useReducer(timePointReducer, initialTimePoint);

  // Callback to handle opening of modal
  const handleOpen = useCallback(() => {
    const currentTime = getCurrentTime();
    // initially, the time point value is the video's current time
    timePointDispatch({ type: TimePointActionType.OPEN, payload: currentTime });
  }, [getCurrentTime]);

  // Callback to handle closing of modal
  const handleClose = () => {
    timePointDispatch({ type: TimePointActionType.CLOSE });
  };

  const onCreateDownloadLink = async () => {
    // get the inputs (start and end times), feed them to firebase function
    console.log(
      `Download Pressed ${timePointState.startValue} - ${timePointState.endValue}, event ID ${id}`
    );
    const functionCallerService = new FunctionsCallerService(firebaseConfig);
    // set loading state
    const url = await functionCallerService.getClip(
      timePointState.startValue,
      timePointState.endValue,
      id,
      sessionId,
      timePointState.format
    );
    timePointDispatch({ type: TimePointActionType.UPDATE_URL, payload: url });
  };

  // Callback to handle starting time point value changes
  const onStartTimePointInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    timePointDispatch({ type: TimePointActionType.UPDATE_START, payload: e.target.value });
  };

  // Callback to handle ending time point value changes
  const onEndTimePointInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    timePointDispatch({ type: TimePointActionType.UPDATE_END, payload: e.target.value });
  };

  // callback to handle format change
  const onChangeRadio = (e: React.FormEvent<HTMLInputElement>, data: any): void => {
    timePointDispatch({ type: TimePointActionType.UPDATE_FORMAT, payload: data.value });
  };

  // Callback to handle when the time point input html element becomes out of focus
  const onExitTimePointInput = () => {
    timePointDispatch({ type: TimePointActionType.VALIDATE_VALUES });
  };

  // Callback to handle when the user press enter while the time point input html element is in focus
  const onSubmitTimePointInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      timePointDispatch({ type: TimePointActionType.VALIDATE_VALUES });
    }
  };

  return (
    <>
      <DownloadVideoModal
        closeIcon
        trigger={
          <DownloadBtn className="mzp-c-button mzp-t-secondary" onClick={handleOpen}>
            <DownloadIcon />
            DOWNLOAD VIDEO CLIP
          </DownloadBtn>
        }
        open={timePointState.isOpen}
        onClose={handleClose}
        mountNode={mountNodeRef.current}
        size="small"
      >
        <Modal.Header>Create a Video Clip</Modal.Header>
        <Modal.Content>
          <button className="mzp-c-button mzp-t-secondary" onClick={onCreateDownloadLink}>
            Prepare Clip
          </button>
          <br />
          {timePointState.generatedUrl && (
            <a href={timePointState.generatedUrl} target="_blank" rel="noopener noreferrer">
              Your download is ready
            </a>
          )}
          <TimePoint>
            <label htmlFor="download-start-time-point">Start at</label>
            <TimePointInput
              disabled={false}
              value={timePointState.startValue}
              onChange={onStartTimePointInputChange}
              onBlur={onExitTimePointInput}
              onKeyUp={onSubmitTimePointInput}
              ref={timePointInputRef}
            />
          </TimePoint>
          <TimePoint>
            <label htmlFor="download-end-time-point">End at</label>
            <TimePointInput
              disabled={false}
              value={timePointState.endValue}
              onChange={onEndTimePointInputChange}
              onBlur={onExitTimePointInput}
              onKeyUp={onSubmitTimePointInput}
              ref={timePointInputRef}
            />
          </TimePoint>
          <Form>
            <Form.Field>Format</Form.Field>
            <Form.Field>
              <Radio
                label="Video"
                name="radioGroup"
                value="mp4"
                checked={timePointState.format === "mp4"}
                onChange={onChangeRadio}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Audio"
                name="radioGroup"
                value="mp3"
                checked={timePointState.format === "mp3"}
                onChange={onChangeRadio}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
      </DownloadVideoModal>
      <div ref={mountNodeRef} />
    </>
  );
};

export default DownloadVideo;
