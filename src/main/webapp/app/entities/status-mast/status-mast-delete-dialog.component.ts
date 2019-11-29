import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatusMast } from 'app/shared/model/status-mast.model';
import { StatusMastService } from './status-mast.service';

@Component({
  templateUrl: './status-mast-delete-dialog.component.html'
})
export class StatusMastDeleteDialogComponent {
  statusMast: IStatusMast;

  constructor(
    protected statusMastService: StatusMastService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.statusMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'statusMastListModification',
        content: 'Deleted an statusMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
