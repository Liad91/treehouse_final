
import { animate, transition, trigger, style } from '@angular/animations';

export const placeStateTrigger = trigger('placeState', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0.8)'
    }),
    animate('300ms ease-out')
  ])
]);
