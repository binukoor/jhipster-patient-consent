import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientBar } from 'app/shared/model/patient-bar.model';

@Component({
  selector: 'jhi-patient-bar-detail',
  templateUrl: './patient-bar-detail.component.html'
})
export class PatientBarDetailComponent implements OnInit {
  patientBar: IPatientBar;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ patientBar }) => {
      this.patientBar = patientBar;
    });
  }

  previousState() {
    window.history.back();
  }
}
