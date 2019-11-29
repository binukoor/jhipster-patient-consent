import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPersonMast, PersonMast } from 'app/shared/model/person-mast.model';
import { PersonMastService } from './person-mast.service';

@Component({
  selector: 'jhi-person-mast-update',
  templateUrl: './person-mast-update.component.html'
})
export class PersonMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    persCode: [],
    personName: []
  });

  constructor(protected personMastService: PersonMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ personMast }) => {
      this.updateForm(personMast);
    });
  }

  updateForm(personMast: IPersonMast) {
    this.editForm.patchValue({
      id: personMast.id,
      persCode: personMast.persCode,
      personName: personMast.personName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const personMast = this.createFromForm();
    if (personMast.id !== undefined) {
      this.subscribeToSaveResponse(this.personMastService.update(personMast));
    } else {
      this.subscribeToSaveResponse(this.personMastService.create(personMast));
    }
  }

  private createFromForm(): IPersonMast {
    return {
      ...new PersonMast(),
      id: this.editForm.get(['id']).value,
      persCode: this.editForm.get(['persCode']).value,
      personName: this.editForm.get(['personName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonMast>>) {
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
