import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IScopeMast, ScopeMast } from 'app/shared/model/scope-mast.model';
import { ScopeMastService } from './scope-mast.service';

@Component({
  selector: 'jhi-scope-mast-update',
  templateUrl: './scope-mast-update.component.html'
})
export class ScopeMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    scopeCode: [],
    scope: []
  });

  constructor(protected scopeMastService: ScopeMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ scopeMast }) => {
      this.updateForm(scopeMast);
    });
  }

  updateForm(scopeMast: IScopeMast) {
    this.editForm.patchValue({
      id: scopeMast.id,
      scopeCode: scopeMast.scopeCode,
      scope: scopeMast.scope
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const scopeMast = this.createFromForm();
    if (scopeMast.id !== undefined) {
      this.subscribeToSaveResponse(this.scopeMastService.update(scopeMast));
    } else {
      this.subscribeToSaveResponse(this.scopeMastService.create(scopeMast));
    }
  }

  private createFromForm(): IScopeMast {
    return {
      ...new ScopeMast(),
      id: this.editForm.get(['id']).value,
      scopeCode: this.editForm.get(['scopeCode']).value,
      scope: this.editForm.get(['scope']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IScopeMast>>) {
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
