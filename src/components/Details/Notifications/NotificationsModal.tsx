import React, { FC, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "semantic-ui-react";

import CDPModal from "../../Shared/util/CDPModal";
import NotificationsIcon from "../../Shared/NotificationsIcon";
import SearchTerms from "./SearchTerms/SearchTerms";
import NotificationsSettingsSelector from "./SettingsSelector/NotificationsSettingsSelector";

const NotificationsButton = styled.button({
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

export interface NotificationsModalProps {
  searchTermsChanged(selected?: string[]): void;
  notificationsSettingSelected(selected: string): void;
}

const NotificationsModal: FC<NotificationsModalProps> = ({
  searchTermsChanged,
  notificationsSettingSelected,
}: NotificationsModalProps) => {
  // A reference to the html element where the modal is mounted
  const mountNodeRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <CDPModal
        closeIcon
        trigger={
          <NotificationsButton
            className="mzp-c-button mzp-t-secondary"
            onClick={() => {
              setOpen(true);
            }}
          >
            <NotificationsIcon />
          </NotificationsButton>
        }
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        mountNode={mountNodeRef.current}
        size="small"
      >
        <Modal.Header>Create Notification</Modal.Header>
        <Modal.Content>
          <>
            <SearchTerms searchTermsChanged={searchTermsChanged} />
            <NotificationsSettingsSelector
              notificationsSettingSelected={notificationsSettingSelected}
            />
          </>
        </Modal.Content>
      </CDPModal>
      <div ref={mountNodeRef} />
    </>
  );
};

export default NotificationsModal;
