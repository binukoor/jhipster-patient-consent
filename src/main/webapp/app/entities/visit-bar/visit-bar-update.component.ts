import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IVisitBar, VisitBar } from 'app/shared/model/visit-bar.model';
import { VisitBarService } from './visit-bar.service';

@Component({
  selector: 'jhi-visit-bar-update',
  templateUrl: './visit-bar-update.component.html'
})
export class VisitBarUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    visitId: [],
    visitType: [],
    visitTime: [],
    seenTime: [],
    deptCode: [],
    deptName: [],
    clinicCode: [],
    clinicName: [],
    consultantCode: [],
    consultantName: []
  });

  constructor(protected visitBarService: VisitBarService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ visitBar }) => {
      this.updateForm(visitBar);
    });
  }

  updateForm(visitBar: IVisitBar) {
    this.editForm.patchValue({
      id: visitBar.id,
      visitId: visitBar.visitId,
      visitType: visitBar.visitType,
      visitTime: visitBar.visitTime != null ? visitBar.visitTime.format(DATE_TIME_FORMAT) : null,
      seenTime: visitBar.seenTime != null ? visitBar.seenTime.format(DATE_TIME_FORMAT) : null,
      deptCode: visitBar.deptCode,
      deptName: visitBar.deptName,
      clinicCode: visitBar.clinicCode,
      clinicName: visitBar.clinicName,
      consultantCode: visitBar.consultantCode,
      consultantName: visitBar.consultantName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const visitBar = this.createFromForm();
    if (visitBar.id !== undefined) {
      this.subscribeToSaveResponse(this.visitBarService.update(visitBar));
    } else {
      this.subscribeToSaveResponse(this.visitBarService.create(visitBar));
    }
  }

  private createFromForm(): IVisitBar {
    return {
      ...new VisitBar(),
      id: this.editForm.get(['id']).value,
      visitId: this.editForm.get(['visitId']).value,
      visitType: this.editForm.get(['visitType']).value,
      visitTime:
        this.editForm.get(['visitTime']).value != null ? moment(this.editForm.get(['visitTime']).value, DATE_TIME_FORMAT) : undefined,
      seenTime: this.editForm.get(['seenTime']).value != null ? moment(this.editForm.get(['seenTime']).value, DATE_TIME_FORMAT) : undefined,
      deptCode: this.editForm.get(['deptCode']).value,
      deptName: this.editForm.get(['deptName']).value,
      clinicCode: this.editForm.get(['clinicCode']).value,
      clinicName: this.editForm.get(['clinicName']).value,
      consultantCode: this.editForm.get(['consultantCode']).value,
      consultantName: this.editForm.get(['consultantName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitBar>>) {
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
