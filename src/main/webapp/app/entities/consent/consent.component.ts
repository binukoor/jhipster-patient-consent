import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';
import { ConsentDeleteDialogComponent } from './consent-delete-dialog.component';

@Component({
  selector: 'jhi-consent',
  templateUrl: './consent.component.html'
})
export class ConsentComponent implements OnInit, OnDestroy {
  consents: IConsent[];
  eventSubscriber: Subscription;

  constructor(protected consentService: ConsentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.consentService.query().subscribe((res: HttpResponse<IConsent[]>) => {
      this.consents = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConsents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsent) {
    return item.id;
  }

  registerChangeInConsents() {
    this.eventSubscriber = this.eventManager.subscribe('consentListModification', () => this.loadAll());
  }

  delete(consent: IConsent) {
    const modalRef = this.modalService.open(ConsentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consent = consent;
  }
}
