import React from "react";

import { Story, Meta } from "@storybook/react";

import SearchTerms, { SearchTermsProps } from "./SearchTerms";

export default {
  component: SearchTerms,
  title: "Library/Details/Notifications/SearchTerms",
} as Meta;

const basic: SearchTermsProps = {
  searchTermsChanged: (selectedSearchTerms) => {
    console.log(`New set of search terms: ${JSON.stringify(selectedSearchTerms)}`);
  },
};

const Template: Story<SearchTermsProps> = (args) => <SearchTerms {...args} />;

export const Selector = Template.bind({});
Selector.args = basic;
