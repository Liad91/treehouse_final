import { ComponentRef, Injectable, Type } from '@angular/core';
import { MzModalService, MzBaseModal,  } from 'ng2-materialize/dist';

import { AlertModalOptions, AlertModalComponent } from '../../shared/components/alert-modal/alert-modal.component';
import { LightboxModalOptions, LightboxModalComponent } from '../../shared/components/lightbox-modal/lightbox-modal.component';

@Injectable()
export class ModalService {

  constructor(private mzModalService: MzModalService) {}

  public open(componentClass: Type<MzBaseModal>, options?: any): ComponentRef<MzBaseModal> {
    return this.mzModalService.open(componentClass, options);
  }

  public openAlert(options: AlertModalOptions): ComponentRef<MzBaseModal> {
    return this.mzModalService.open(AlertModalComponent, { options });
  }

  public openLightbox(options: LightboxModalOptions): ComponentRef<MzBaseModal> {
    return this.mzModalService.open(LightboxModalComponent, { options });
  }
}
