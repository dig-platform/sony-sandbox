import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectStepper} from '../../../lib/modules/ngrx-stepper/store/ngrx-stepper.selectors';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {
  public accountRequest$: Observable<any>;
  constructor(private store: Store) {
    this.accountRequest$ = store.select(selectStepper('accountRequest'))
  }

  ngOnInit(): void {
    this.accountRequest$.subscribe(console.warn);
  }

}
