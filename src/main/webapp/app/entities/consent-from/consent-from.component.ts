import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsentFrom } from 'app/shared/model/consent-from.model';
import { ConsentFromService } from './consent-from.service';
import { ConsentFromDeleteDialogComponent } from './consent-from-delete-dialog.component';

@Component({
  selector: 'jhi-consent-from',
  templateUrl: './consent-from.component.html'
})
export class ConsentFromComponent implements OnInit, OnDestroy {
  consentFroms: IConsentFrom[];
  eventSubscriber: Subscription;

  constructor(
    protected consentFromService: ConsentFromService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.consentFromService.query().subscribe((res: HttpResponse<IConsentFrom[]>) => {
      this.consentFroms = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConsentFroms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsentFrom) {
    return item.id;
  }

  registerChangeInConsentFroms() {
    this.eventSubscriber = this.eventManager.subscribe('consentFromListModification', () => this.loadAll());
  }

  delete(consentFrom: IConsentFrom) {
    const modalRef = this.modalService.open(ConsentFromDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consentFrom = consentFrom;
  }
}
