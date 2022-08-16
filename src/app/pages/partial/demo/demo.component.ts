import { Component, OnInit } from '@angular/core';
import {partial} from '../lib/partial';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  public readonly partialSrc = partial(() => import('./partials/sample.partial'));
  public readonly partialInputBindings = {
    name: 'Forrest'
  };
  public readonly partialOutputBindings = {
    reply: (reply: string) => this.reply = reply
  }

  public reply: string | undefined;
}
