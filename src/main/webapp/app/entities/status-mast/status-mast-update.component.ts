import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStatusMast, StatusMast } from 'app/shared/model/status-mast.model';
import { StatusMastService } from './status-mast.service';

@Component({
  selector: 'jhi-status-mast-update',
  templateUrl: './status-mast-update.component.html'
})
export class StatusMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    statusCode: [],
    status: []
  });

  constructor(protected statusMastService: StatusMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ statusMast }) => {
      this.updateForm(statusMast);
    });
  }

  updateForm(statusMast: IStatusMast) {
    this.editForm.patchValue({
      id: statusMast.id,
      statusCode: statusMast.statusCode,
      status: statusMast.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const statusMast = this.createFromForm();
    if (statusMast.id !== undefined) {
      this.subscribeToSaveResponse(this.statusMastService.update(statusMast));
    } else {
      this.subscribeToSaveResponse(this.statusMastService.create(statusMast));
    }
  }

  private createFromForm(): IStatusMast {
    return {
      ...new StatusMast(),
      id: this.editForm.get(['id']).value,
      statusCode: this.editForm.get(['statusCode']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatusMast>>) {
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
