import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRequestRoutingModule } from './account-request-routing.module';
import {AccountRequestComponent} from './account-request.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegistrationComponent } from './components/forms/registration/registration.component';
import {MatCardModule} from '@angular/material/card';
import {NgrxFormModule} from '../../../lib/components/ngrx-form/ngrx-form';
import {NgrxFormStoreModule} from '../../../lib/components/ngrx-form/ngrx-form-store';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { AccessComponent } from './components/forms/access/access.component';
import {NgrxStepperModule} from '../../../lib/modules/ngrx-stepper/ngrx-stepper.module';
import { ConfirmationComponent } from './components/forms/confirmation/confirmation.component';
import {MatRadioModule} from '@angular/material/radio';
import {ConfigModule} from '../../../lib/modules/config/config.module';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {SlotDirective} from '../../../lib/directives/slot.directive';


@NgModule({
  declarations: [
    AccountRequestComponent,
    RegistrationComponent,
    FormHeaderComponent,
    AccessComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ConfigModule,
    AccountRequestRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    NgrxStepperModule,
    SlotDirective
  ]
})
export class AccountRequestModule { }
