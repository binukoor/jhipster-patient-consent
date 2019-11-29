import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScopeMast } from 'app/shared/model/scope-mast.model';
import { ScopeMastService } from './scope-mast.service';

@Component({
  templateUrl: './scope-mast-delete-dialog.component.html'
})
export class ScopeMastDeleteDialogComponent {
  scopeMast: IScopeMast;

  constructor(protected scopeMastService: ScopeMastService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.scopeMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'scopeMastListModification',
        content: 'Deleted an scopeMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
