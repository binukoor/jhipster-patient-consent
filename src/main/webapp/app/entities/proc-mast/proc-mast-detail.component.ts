import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcMast } from 'app/shared/model/proc-mast.model';

@Component({
  selector: 'jhi-proc-mast-detail',
  templateUrl: './proc-mast-detail.component.html'
})
export class ProcMastDetailComponent implements OnInit {
  procMast: IProcMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ procMast }) => {
      this.procMast = procMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
