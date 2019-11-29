import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatientBar } from 'app/shared/model/patient-bar.model';
import { PatientBarService } from './patient-bar.service';
import { PatientBarDeleteDialogComponent } from './patient-bar-delete-dialog.component';

@Component({
  selector: 'jhi-patient-bar',
  templateUrl: './patient-bar.component.html'
})
export class PatientBarComponent implements OnInit, OnDestroy {
  patientBars: IPatientBar[];
  eventSubscriber: Subscription;

  constructor(protected patientBarService: PatientBarService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.patientBarService.query().subscribe((res: HttpResponse<IPatientBar[]>) => {
      this.patientBars = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPatientBars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPatientBar) {
    return item.id;
  }

  registerChangeInPatientBars() {
    this.eventSubscriber = this.eventManager.subscribe('patientBarListModification', () => this.loadAll());
  }

  delete(patientBar: IPatientBar) {
    const modalRef = this.modalService.open(PatientBarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.patientBar = patientBar;
  }
}
