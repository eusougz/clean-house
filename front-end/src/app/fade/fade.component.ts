import { Input, OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-fade',
  templateUrl: './fade.component.html',
  styleUrls: ['./fade.component.scss'],
  animations: [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0'
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FadeComponent implements OnInit{
  state: FadeState;
  // tslint:disable-next-line: variable-name
  private _show: boolean;

  ngOnInit(): void {
  }
  get show() {
    return this._show;
  }
  @Input()
  set show(value: boolean) {
    if (value) {
      // show the content and set it's state to trigger fade in animation
      this._show = value;
      this.state = 'visible';
    } else {
      // just trigger the fade out animation
      this.state = 'hidden';
    }
  }

  animationDone(event: AnimationEvent) {
    // now remove the
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this._show = false;
    }
  }
}
