// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {AccountRequestModule} from 'src/app/phoenix/open/pages/account-request/account-request.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProgressComponent} from 'src/app/phoenix/open/pages/account-request/components/progress/progress.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Open/AccountRequest/Components/Progress',
  component: ProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
      ]
    })
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ProgressComponent> = (args: ProgressComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  steps: [
    {
      label: 'Register',
      title: '',
      description: '',
      active: true
    },
    {
      label: 'Access Form',
      title: '',
      description: '',
      disabled: true
    },
    {
      label: 'Confirmation',
      title: '',
      description: '',
      disabled: true
    }
  ]
};
export const SecondTab = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
SecondTab.args = {
  steps: [
    {
      label: 'Register',
      title: '',
      description: '',
    },
    {
      label: 'Access Form',
      title: '',
      description: '',
      active: true
    },
    {
      label: 'Confirmation',
      title: '',
      description: '',
      disabled: true
    }
  ]
};
