import { trigger, transition } from '@angular/animations';

import { slideIn, slideOut, zoomIn } from './../../shared/animations';

export const socialBtnStateTrigger = trigger('socialBtnState', [
  transition(':enter',  slideIn('0, 20px', '200ms ease-out'))
]);

export const errorStateTrigger = trigger('errorState', [
  transition(':enter', slideIn('0, -20px', '200ms ease-out'))
]);

export const imgPreviewStateTrigger = trigger('imgPreviewState', [
  transition(':enter', zoomIn('0.6', '200ms ease-out'))
]);