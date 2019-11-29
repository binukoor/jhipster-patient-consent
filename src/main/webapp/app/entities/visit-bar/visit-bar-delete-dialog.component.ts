import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitBar } from 'app/shared/model/visit-bar.model';
import { VisitBarService } from './visit-bar.service';

@Component({
  templateUrl: './visit-bar-delete-dialog.component.html'
})
export class VisitBarDeleteDialogComponent {
  visitBar: IVisitBar;

  constructor(protected visitBarService: VisitBarService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.visitBarService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'visitBarListModification',
        content: 'Deleted an visitBar'
      });
      this.activeModal.dismiss(true);
    });
  }
}
