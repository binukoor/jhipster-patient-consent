import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStatusMast } from 'app/shared/model/status-mast.model';
import { StatusMastService } from './status-mast.service';
import { StatusMastDeleteDialogComponent } from './status-mast-delete-dialog.component';

@Component({
  selector: 'jhi-status-mast',
  templateUrl: './status-mast.component.html'
})
export class StatusMastComponent implements OnInit, OnDestroy {
  statusMasts: IStatusMast[];
  eventSubscriber: Subscription;

  constructor(protected statusMastService: StatusMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.statusMastService.query().subscribe((res: HttpResponse<IStatusMast[]>) => {
      this.statusMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStatusMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStatusMast) {
    return item.id;
  }

  registerChangeInStatusMasts() {
    this.eventSubscriber = this.eventManager.subscribe('statusMastListModification', () => this.loadAll());
  }

  delete(statusMast: IStatusMast) {
    const modalRef = this.modalService.open(StatusMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.statusMast = statusMast;
  }
}
