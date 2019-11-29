import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstMast, EstMast } from 'app/shared/model/est-mast.model';
import { EstMastService } from './est-mast.service';

@Component({
  selector: 'jhi-est-mast-update',
  templateUrl: './est-mast-update.component.html'
})
export class EstMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    estCode: [],
    estName: []
  });

  constructor(protected estMastService: EstMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estMast }) => {
      this.updateForm(estMast);
    });
  }

  updateForm(estMast: IEstMast) {
    this.editForm.patchValue({
      id: estMast.id,
      estCode: estMast.estCode,
      estName: estMast.estName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estMast = this.createFromForm();
    if (estMast.id !== undefined) {
      this.subscribeToSaveResponse(this.estMastService.update(estMast));
    } else {
      this.subscribeToSaveResponse(this.estMastService.create(estMast));
    }
  }

  private createFromForm(): IEstMast {
    return {
      ...new EstMast(),
      id: this.editForm.get(['id']).value,
      estCode: this.editForm.get(['estCode']).value,
      estName: this.editForm.get(['estName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstMast>>) {
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
