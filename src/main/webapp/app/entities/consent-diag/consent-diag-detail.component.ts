import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsentDiag } from 'app/shared/model/consent-diag.model';

@Component({
  selector: 'jhi-consent-diag-detail',
  templateUrl: './consent-diag-detail.component.html'
})
export class ConsentDiagDetailComponent implements OnInit {
  consentDiag: IConsentDiag;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consentDiag }) => {
      this.consentDiag = consentDiag;
    });
  }

  previousState() {
    window.history.back();
  }
}
