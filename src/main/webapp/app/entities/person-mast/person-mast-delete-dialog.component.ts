import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonMast } from 'app/shared/model/person-mast.model';
import { PersonMastService } from './person-mast.service';

@Component({
  templateUrl: './person-mast-delete-dialog.component.html'
})
export class PersonMastDeleteDialogComponent {
  personMast: IPersonMast;

  constructor(
    protected personMastService: PersonMastService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.personMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'personMastListModification',
        content: 'Deleted an personMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
