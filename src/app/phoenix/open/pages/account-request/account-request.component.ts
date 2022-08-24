import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {Store} from '@ngrx/store';
import {Observable, take} from 'rxjs';
import {selectStepper} from '../../../lib/modules/ngrx-stepper/store/ngrx-stepper.selectors';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.scss']
})
export class AccountRequestComponent implements OnInit {
  public accountRequest$: Observable<any>;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private store: Store) {
    this.accountRequest$ = store.select(selectStepper('accountRequest'))
  }

  ngOnInit(): void {
  }

  save() {
    this.accountRequest$.pipe(
      take(1),
    ).subscribe(request => {
      console.log(request);
      this.stepper.next();
      // todo handle request
    })
  }

}
