import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {patchAccountRequest} from './store/account-request.actions';
import {Observable} from 'rxjs';
import {selectAccountRequest} from './store/account-request.selectors';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {
  public account$: Observable<any>;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private store: Store) {
    this.account$ = store.select(selectAccountRequest);
  }

  ngOnInit(): void {
    this.store.dispatch(patchAccountRequest({patch: {firstName: 'forrest'}}))
    this.account$.subscribe(console.log);
  }

}
