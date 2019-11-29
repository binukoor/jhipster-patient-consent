import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatusMast } from 'app/shared/model/status-mast.model';

@Component({
  selector: 'jhi-status-mast-detail',
  templateUrl: './status-mast-detail.component.html'
})
export class StatusMastDetailComponent implements OnInit {
  statusMast: IStatusMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ statusMast }) => {
      this.statusMast = statusMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
