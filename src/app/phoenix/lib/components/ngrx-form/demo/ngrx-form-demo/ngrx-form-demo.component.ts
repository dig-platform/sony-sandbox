import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectForm} from '../../store/ngrx-form.selectors';

@Component({
  selector: 'app-ngrx-form-demo',
  templateUrl: './ngrx-form-demo.component.html',
  styleUrls: ['./ngrx-form-demo.component.scss']
})
export class NgrxFormDemoComponent implements OnInit {
  public singleFormState$!: Observable<any>;
  constructor(private store: Store) {
    this.singleFormState$ = store.select(selectForm('registration'));
    this.singleFormState$.subscribe(console.log);
  }

  ngOnInit(): void {
  }

}
