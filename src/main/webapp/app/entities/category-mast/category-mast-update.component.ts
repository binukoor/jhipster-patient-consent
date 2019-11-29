import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategoryMast, CategoryMast } from 'app/shared/model/category-mast.model';
import { CategoryMastService } from './category-mast.service';

@Component({
  selector: 'jhi-category-mast-update',
  templateUrl: './category-mast-update.component.html'
})
export class CategoryMastUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    catCode: [],
    category: []
  });

  constructor(protected categoryMastService: CategoryMastService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ categoryMast }) => {
      this.updateForm(categoryMast);
    });
  }

  updateForm(categoryMast: ICategoryMast) {
    this.editForm.patchValue({
      id: categoryMast.id,
      catCode: categoryMast.catCode,
      category: categoryMast.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const categoryMast = this.createFromForm();
    if (categoryMast.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryMastService.update(categoryMast));
    } else {
      this.subscribeToSaveResponse(this.categoryMastService.create(categoryMast));
    }
  }

  private createFromForm(): ICategoryMast {
    return {
      ...new CategoryMast(),
      id: this.editForm.get(['id']).value,
      catCode: this.editForm.get(['catCode']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryMast>>) {
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
