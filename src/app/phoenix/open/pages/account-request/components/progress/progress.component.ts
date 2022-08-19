import {Component, Input, OnInit} from '@angular/core';
import {AccountRequestStep} from '../../store/account-request.reducer';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() steps: AccountRequestStep[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
