import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsentProcs } from 'app/shared/model/consent-procs.model';
import { ConsentProcsService } from './consent-procs.service';
import { ConsentProcsDeleteDialogComponent } from './consent-procs-delete-dialog.component';

@Component({
  selector: 'jhi-consent-procs',
  templateUrl: './consent-procs.component.html'
})
export class ConsentProcsComponent implements OnInit, OnDestroy {
  consentProcs: IConsentProcs[];
  eventSubscriber: Subscription;

  constructor(
    protected consentProcsService: ConsentProcsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.consentProcsService.query().subscribe((res: HttpResponse<IConsentProcs[]>) => {
      this.consentProcs = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConsentProcs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConsentProcs) {
    return item.id;
  }

  registerChangeInConsentProcs() {
    this.eventSubscriber = this.eventManager.subscribe('consentProcsListModification', () => this.loadAll());
  }

  delete(consentProcs: IConsentProcs) {
    const modalRef = this.modalService.open(ConsentProcsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consentProcs = consentProcs;
  }
}
