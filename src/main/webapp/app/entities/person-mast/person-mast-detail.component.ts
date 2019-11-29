import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonMast } from 'app/shared/model/person-mast.model';

@Component({
  selector: 'jhi-person-mast-detail',
  templateUrl: './person-mast-detail.component.html'
})
export class PersonMastDetailComponent implements OnInit {
  personMast: IPersonMast;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ personMast }) => {
      this.personMast = personMast;
    });
  }

  previousState() {
    window.history.back();
  }
}
