import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstMast } from 'app/shared/model/est-mast.model';

@Component({
  selector: 'jhi-est-mast-detail',
  templateUrl: './est-mast-detail.component.html'
})
export class EstMastDetailComponent implements OnInit {
  estMast: IEstMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estMast }) => {
      this.estMast = estMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
