// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {moduleMetadata} from '@storybook/angular';
import { makeDecorator } from '@storybook/addons';
import {CommonModule} from '@angular/common';
import {FormHeaderComponent} from '../../../../../app/phoenix/open/pages/account-request/components/form-header/form-header.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromAccountRequest
  from '../../../../../app/phoenix/open/pages/account-request/store/account-request.reducer';
import {AngularFramework} from '@storybook/angular/dist/ts3.4/client';
import {ICollection, NgModuleMetadata} from '@storybook/angular/dist/ts3.4/client/preview/types';
import {APP_INITIALIZER, Injector} from '@angular/core';
import {setActiveStep} from '../../../../../app/phoenix/open/pages/account-request/store/account-request.actions';

let storeInstance;
const steps = [
  {
    label: 'Register',
    title: 'Request Access to Runner',
    description: 'Please fill out all fields.',
    active: true
  },
  {
    label: 'Access Form',
    title: '',
    description: ''
  }
];
// the state for the mockStore
const initialState = {
  [fromAccountRequest.accountRequestFeatureKey]: {
    steps: [...steps]
  }
};

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Open/AccountRequest/Components/FormHeader',
  component: FormHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<FormHeaderComponent> = (args: FormHeaderComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
};

const TabTwo: Story<FormHeaderComponent> = (args: FormHeaderComponent) => {
  const {store} = args;
  store.dispatch(setActiveStep({index: 1}));
  return {
    props: args,
  }
};

export const Secondary = TabTwo.bind({});
Secondary.args = {};
