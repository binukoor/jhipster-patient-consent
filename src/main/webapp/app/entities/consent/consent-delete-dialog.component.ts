import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';

@Component({
  templateUrl: './consent-delete-dialog.component.html'
})
export class ConsentDeleteDialogComponent {
  consent: IConsent;

  constructor(protected consentService: ConsentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'consentListModification',
        content: 'Deleted an consent'
      });
      this.activeModal.dismiss(true);
    });
  }
}
