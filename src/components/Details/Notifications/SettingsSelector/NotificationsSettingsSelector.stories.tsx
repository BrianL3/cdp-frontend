import React from "react";

import { Story, Meta } from "@storybook/react";

import NotificationsSettingsSelector, {
  NotificationsSettingsSelectorProps,
} from "./NotificationsSettingsSelector";

export default {
  component: NotificationsSettingsSelector,
  title: "Library/Details/Notifications/SettingsSelector",
} as Meta;

const basic: NotificationsSettingsSelectorProps = {
  notificationsSettingSelected: (selected) => {
    console.log(selected);
  },
};

const Template: Story<NotificationsSettingsSelectorProps> = (args) => (
  <NotificationsSettingsSelector {...args} />
);

export const Selector = Template.bind({});
Selector.args = basic;
