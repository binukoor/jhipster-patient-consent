import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsentProcs } from 'app/shared/model/consent-procs.model';
import { ConsentProcsService } from './consent-procs.service';

@Component({
  templateUrl: './consent-procs-delete-dialog.component.html'
})
export class ConsentProcsDeleteDialogComponent {
  consentProcs: IConsentProcs;

  constructor(
    protected consentProcsService: ConsentProcsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.consentProcsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'consentProcsListModification',
        content: 'Deleted an consentProcs'
      });
      this.activeModal.dismiss(true);
    });
  }
}
