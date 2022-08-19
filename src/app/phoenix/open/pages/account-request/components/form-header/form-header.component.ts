import {Component, Input, OnInit} from '@angular/core';
import {AccountRequestStep} from '../../store/account-request.reducer';
import {Store} from '@ngrx/store';
import {selectSteps} from '../../store/account-request.selectors';
import {setActiveStep} from '../../store/account-request.actions';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  @Input() step: AccountRequestStep | undefined;
  constructor(public readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(setActiveStep({index: 0}));
    this.store.select(selectSteps).subscribe(steps => {
      console.log(steps);
    });
  }

}
