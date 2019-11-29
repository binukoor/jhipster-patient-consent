import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcMast } from 'app/shared/model/proc-mast.model';
import { ProcMastService } from './proc-mast.service';

@Component({
  templateUrl: './proc-mast-delete-dialog.component.html'
})
export class ProcMastDeleteDialogComponent {
  procMast: IProcMast;

  constructor(protected procMastService: ProcMastService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.procMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'procMastListModification',
        content: 'Deleted an procMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
