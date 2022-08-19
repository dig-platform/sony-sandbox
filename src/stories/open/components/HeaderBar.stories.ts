// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {AccountRequestComponent} from '../../../app/phoenix/open/pages/account-request/components/account-request/account-request.component';
import {HeaderBarComponent} from '../../../app/phoenix/open/components/header-bar/header-bar.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Open/Components/HeaderBar',
  component: HeaderBarComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<HeaderBarComponent> = (args: HeaderBarComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
};
