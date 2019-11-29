import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProcMast, ProcMast } from 'app/shared/model/proc-mast.model';
import { ProcMastService } from './proc-mast.service';

@Component({
  selector: 'jhi-proc-mast-update',
  templateUrl: './proc-mast-update.component.html'
})
export class ProcMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    procCode: [],
    procName: []
  });

  constructor(protected procMastService: ProcMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ procMast }) => {
      this.updateForm(procMast);
    });
  }

  updateForm(procMast: IProcMast) {
    this.editForm.patchValue({
      id: procMast.id,
      procCode: procMast.procCode,
      procName: procMast.procName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const procMast = this.createFromForm();
    if (procMast.id !== undefined) {
      this.subscribeToSaveResponse(this.procMastService.update(procMast));
    } else {
      this.subscribeToSaveResponse(this.procMastService.create(procMast));
    }
  }

  private createFromForm(): IProcMast {
    return {
      ...new ProcMast(),
      id: this.editForm.get(['id']).value,
      procCode: this.editForm.get(['procCode']).value,
      procName: this.editForm.get(['procName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcMast>>) {
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
