import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatientBar } from 'app/shared/model/patient-bar.model';
import { PatientBarService } from './patient-bar.service';

@Component({
  templateUrl: './patient-bar-delete-dialog.component.html'
})
export class PatientBarDeleteDialogComponent {
  patientBar: IPatientBar;

  constructor(
    protected patientBarService: PatientBarService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.patientBarService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'patientBarListModification',
        content: 'Deleted an patientBar'
      });
      this.activeModal.dismiss(true);
    });
  }
}
