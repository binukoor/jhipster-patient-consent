import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIcdMast } from 'app/shared/model/icd-mast.model';
import { IcdMastService } from './icd-mast.service';

@Component({
  templateUrl: './icd-mast-delete-dialog.component.html'
})
export class IcdMastDeleteDialogComponent {
  icdMast: IIcdMast;

  constructor(protected icdMastService: IcdMastService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.icdMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'icdMastListModification',
        content: 'Deleted an icdMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
