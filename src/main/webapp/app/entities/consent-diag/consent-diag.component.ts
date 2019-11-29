import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsentDiag } from 'app/shared/model/consent-diag.model';
import { ConsentDiagService } from './consent-diag.service';
import { ConsentDiagDeleteDialogComponent } from './consent-diag-delete-dialog.component';

@Component({
  selector: 'jhi-consent-diag',
  templateUrl: './consent-diag.component.html'
})
export class ConsentDiagComponent implements OnInit, OnDestroy {
  consentDiags: IConsentDiag[];
  eventSubscriber: Subscription;

  constructor(
    protected consentDiagService: ConsentDiagService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.consentDiagService.query().subscribe((res: HttpResponse<IConsentDiag[]>) => {
      this.consentDiags = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConsentDiags();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsentDiag) {
    return item.id;
  }

  registerChangeInConsentDiags() {
    this.eventSubscriber = this.eventManager.subscribe('consentDiagListModification', () => this.loadAll());
  }

  delete(consentDiag: IConsentDiag) {
    const modalRef = this.modalService.open(ConsentDiagDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consentDiag = consentDiag;
  }
}
