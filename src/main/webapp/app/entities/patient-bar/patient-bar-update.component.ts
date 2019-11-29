import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPatientBar, PatientBar } from 'app/shared/model/patient-bar.model';
import { PatientBarService } from './patient-bar.service';

@Component({
  selector: 'jhi-patient-bar-update',
  templateUrl: './patient-bar-update.component.html'
})
export class PatientBarUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    patientId: [],
    patientNo: [],
    patientName: [],
    age: [],
    gender: []
  });

  constructor(protected patientBarService: PatientBarService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ patientBar }) => {
      this.updateForm(patientBar);
    });
  }

  updateForm(patientBar: IPatientBar) {
    this.editForm.patchValue({
      id: patientBar.id,
      patientId: patientBar.patientId,
      patientNo: patientBar.patientNo,
      patientName: patientBar.patientName,
      age: patientBar.age,
      gender: patientBar.gender
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const patientBar = this.createFromForm();
    if (patientBar.id !== undefined) {
      this.subscribeToSaveResponse(this.patientBarService.update(patientBar));
    } else {
      this.subscribeToSaveResponse(this.patientBarService.create(patientBar));
    }
  }

  private createFromForm(): IPatientBar {
    return {
      ...new PatientBar(),
      id: this.editForm.get(['id']).value,
      patientId: this.editForm.get(['patientId']).value,
      patientNo: this.editForm.get(['patientNo']).value,
      patientName: this.editForm.get(['patientName']).value,
      age: this.editForm.get(['age']).value,
      gender: this.editForm.get(['gender']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientBar>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
