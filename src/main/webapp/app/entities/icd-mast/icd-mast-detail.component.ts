import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIcdMast } from 'app/shared/model/icd-mast.model';

@Component({
  selector: 'jhi-icd-mast-detail',
  templateUrl: './icd-mast-detail.component.html'
})
export class IcdMastDetailComponent implements OnInit {
  icdMast: IIcdMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ icdMast }) => {
      this.icdMast = icdMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
