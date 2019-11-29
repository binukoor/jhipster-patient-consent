import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsentDiag } from 'app/shared/model/consent-diag.model';
import { ConsentDiagService } from './consent-diag.service';

@Component({
  templateUrl: './consent-diag-delete-dialog.component.html'
})
export class ConsentDiagDeleteDialogComponent {
  consentDiag: IConsentDiag;

  constructor(
    protected consentDiagService: ConsentDiagService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consentDiagService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'consentDiagListModification',
        content: 'Deleted an consentDiag'
      });
      this.activeModal.dismiss(true);
    });
  }
}
