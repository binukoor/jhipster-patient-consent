import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IIcdMast, IcdMast } from 'app/shared/model/icd-mast.model';
import { IcdMastService } from './icd-mast.service';

@Component({
  selector: 'jhi-icd-mast-update',
  templateUrl: './icd-mast-update.component.html'
})
export class IcdMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    icd: [],
    disease: []
  });

  constructor(protected icdMastService: IcdMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ icdMast }) => {
      this.updateForm(icdMast);
    });
  }

  updateForm(icdMast: IIcdMast) {
    this.editForm.patchValue({
      id: icdMast.id,
      icd: icdMast.icd,
      disease: icdMast.disease
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const icdMast = this.createFromForm();
    if (icdMast.id !== undefined) {
      this.subscribeToSaveResponse(this.icdMastService.update(icdMast));
    } else {
      this.subscribeToSaveResponse(this.icdMastService.create(icdMast));
    }
  }

  private createFromForm(): IIcdMast {
    return {
      ...new IcdMast(),
      id: this.editForm.get(['id']).value,
      icd: this.editForm.get(['icd']).value,
      disease: this.editForm.get(['disease']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIcdMast>>) {
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
