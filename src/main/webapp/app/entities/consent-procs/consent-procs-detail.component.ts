import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsentProcs } from 'app/shared/model/consent-procs.model';

@Component({
  selector: 'jhi-consent-procs-detail',
  templateUrl: './consent-procs-detail.component.html'
})
export class ConsentProcsDetailComponent implements OnInit {
  consentProcs: IConsentProcs;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ consentProcs }) => {
      this.consentProcs = consentProcs;
    });
  }

  previousState() {
    window.history.back();
  }
}
