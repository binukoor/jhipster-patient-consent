import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstMast } from 'app/shared/model/est-mast.model';
import { EstMastService } from './est-mast.service';

@Component({
  templateUrl: './est-mast-delete-dialog.component.html'
})
export class EstMastDeleteDialogComponent {
  estMast: IEstMast;

  constructor(protected estMastService: EstMastService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.estMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'estMastListModification',
        content: 'Deleted an estMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
