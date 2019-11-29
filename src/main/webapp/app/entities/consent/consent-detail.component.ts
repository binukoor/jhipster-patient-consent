import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsent } from 'app/shared/model/consent.model';

@Component({
  selector: 'jhi-consent-detail',
  templateUrl: './consent-detail.component.html'
})
export class ConsentDetailComponent implements OnInit {
  consent: IConsent;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consent }) => {
      this.consent = consent;
    });
  }

  previousState() {
    window.history.back();
  }
}
