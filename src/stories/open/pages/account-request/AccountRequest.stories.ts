// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {AccountRequestComponent} from 'src/app/phoenix/open/pages/account-request/account-request.component';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {AccountRequestModule} from 'src/app/phoenix/open/pages/account-request/account-request.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReactiveFormsModule} from '@angular/forms';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Open/AccountRequest/Index',
  component: AccountRequestComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        AccountRequestModule,
        ReactiveFormsModule
      ]
    })
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<AccountRequestComponent> = (args: AccountRequestComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
};
