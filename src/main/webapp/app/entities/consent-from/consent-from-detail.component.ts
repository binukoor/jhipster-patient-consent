import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsentFrom } from 'app/shared/model/consent-from.model';

@Component({
  selector: 'jhi-consent-from-detail',
  templateUrl: './consent-from-detail.component.html'
})
export class ConsentFromDetailComponent implements OnInit {
  consentFrom: IConsentFrom;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consentFrom }) => {
      this.consentFrom = consentFrom;
    });
  }

  previousState() {
    window.history.back();
  }
}
