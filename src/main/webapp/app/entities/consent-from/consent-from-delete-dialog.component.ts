import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsentFrom } from 'app/shared/model/consent-from.model';
import { ConsentFromService } from './consent-from.service';

@Component({
  templateUrl: './consent-from-delete-dialog.component.html'
})
export class ConsentFromDeleteDialogComponent {
  consentFrom: IConsentFrom;

  constructor(
    protected consentFromService: ConsentFromService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consentFromService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'consentFromListModification',
        content: 'Deleted an consentFrom'
      });
      this.activeModal.dismiss(true);
    });
  }
}
