import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisitBar } from 'app/shared/model/visit-bar.model';

@Component({
  selector: 'jhi-visit-bar-detail',
  templateUrl: './visit-bar-detail.component.html'
})
export class VisitBarDetailComponent implements OnInit {
  visitBar: IVisitBar;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ visitBar }) => {
      this.visitBar = visitBar;
    });
  }

  previousState() {
    window.history.back();
  }
}
