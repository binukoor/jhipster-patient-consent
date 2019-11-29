import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScopeMast } from 'app/shared/model/scope-mast.model';

@Component({
  selector: 'jhi-scope-mast-detail',
  templateUrl: './scope-mast-detail.component.html'
})
export class ScopeMastDetailComponent implements OnInit {
  scopeMast: IScopeMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ scopeMast }) => {
      this.scopeMast = scopeMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
