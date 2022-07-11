import React, { FC } from "react";

import styled from "@emotion/styled";

export enum NOTIFICATIONS_SETTING_MATCH_TYPE {
  SIMILAR = "similar",
  EXACT = "exact",
}

const OptionBlock = styled.div({ marginTop: 8 });

const OptionAndTitle = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Label = styled.label({
  display: "block",
  marginLeft: 8,
  alignItems: "center",
});

const FieldSet = styled.fieldset({
  borderWidth: 1,
  borderColor: "cdp-bg-light-neutral_grey",
  borderBlockStyle: "solid",
  paddingLeft: 16,
  paddingRight: 16,
});

const Legend = styled.legend({
  paddingLeft: 8,
  paddingRight: 8,
});

export interface NotificationsSettingsSelectorProps {
  /** the parent component should know when the user has selected an option */
  notificationsSettingSelected(selected: string): void;
}

const NotificationsSettingsSelector: FC<NotificationsSettingsSelectorProps> = ({
  notificationsSettingSelected,
}: NotificationsSettingsSelectorProps) => {
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    notificationsSettingSelected(event.target.value);
  };

  return (
    <FieldSet>
      <Legend>Notification Setting</Legend>
      <OptionBlock>
        <OptionAndTitle>
          <input
            type="radio"
            id="setting_similar_match"
            name="notification_pref"
            value={NOTIFICATIONS_SETTING_MATCH_TYPE.SIMILAR}
            onChange={radioHandler}
          />
          <Label htmlFor="setting_similar_match">Similar Match</Label>
        </OptionAndTitle>
        <p>
          We will notify you of all events that match your selected terms as well as any terms with
          a similar word stem.
        </p>
      </OptionBlock>
      <OptionBlock>
        <OptionAndTitle>
          <input
            type="radio"
            id="setting_exact_match"
            name="notification_pref"
            value={NOTIFICATIONS_SETTING_MATCH_TYPE.EXACT}
            onChange={radioHandler}
          />
          <Label htmlFor="setting_exact_match">Exact Match</Label>
        </OptionAndTitle>
        <p>We will only notify you of events that include an exact match to the above terms</p>
      </OptionBlock>
    </FieldSet>
  );
};

export default NotificationsSettingsSelector;
