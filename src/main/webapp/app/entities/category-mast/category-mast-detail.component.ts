import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryMast } from 'app/shared/model/category-mast.model';

@Component({
  selector: 'jhi-category-mast-detail',
  templateUrl: './category-mast-detail.component.html'
})
export class CategoryMastDetailComponent implements OnInit {
  categoryMast: ICategoryMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ categoryMast }) => {
      this.categoryMast = categoryMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
