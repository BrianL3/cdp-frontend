import React, { FC } from "react";

import NotificationsModal from "./NotificationsModal";

const NotificationsModalDemoDisplay: FC = () => {
  return (
    <React.Fragment>
      <NotificationsModal
        searchTermsChanged={() => {
          return;
        }}
        notificationsSettingSelected={() => {
          return;
        }}
      />
    </React.Fragment>
  );
};
export default NotificationsModalDemoDisplay;
