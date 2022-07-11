import React from "react";

import { Story, Meta } from "@storybook/react";

import NotificationsModalDemoDisplay from "./NotificationsModalDemoDisplay";

export default {
  component: NotificationsModalDemoDisplay,
  title: "Library/Details/Notifications/NotificationsModalDemoDisplay",
} as Meta;

const Template: Story = () => <NotificationsModalDemoDisplay />;

export const Selector = Template.bind({});
Selector.args = {};
