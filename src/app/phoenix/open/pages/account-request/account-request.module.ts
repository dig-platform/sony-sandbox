import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRequestComponent } from './account-request.component';
import {HeaderBarComponent} from '../../components/header-bar/header-bar.component';
import { EffectsModule } from '@ngrx/effects';
import * as fromAccountRequest from './store/account-request.reducer';
import { AccountRequestEffects } from './store/account-request.effects';
import {StoreModule} from '@ngrx/store';
import { RegistrationComponent } from './components/forms/registration/registration.component';
import { AccessFormComponent } from './components/forms/access-form/access-form.component';
import { ConfirmationComponent } from './components/forms/confirmation/confirmation.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormHeaderComponent} from './components/form-header/form-header.component';
import { AccountRequestStepDirective } from './directives/account-request-step.directive';
import { FormsComponent } from './components/forms/forms.component';
import { ProgressComponent } from './components/progress/progress.component';



@NgModule({
  declarations: [
    AccountRequestComponent,
    RegistrationComponent,
    AccessFormComponent,
    ConfirmationComponent,
    FormHeaderComponent,
    AccountRequestStepDirective,
    FormsComponent,
    ProgressComponent
  ],
  exports: [
    AccountRequestComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HeaderBarComponent,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAccountRequest.accountRequestFeatureKey, fromAccountRequest.reducer),
    EffectsModule.forFeature([AccountRequestEffects])
  ]
})
export class AccountRequestModule { }
