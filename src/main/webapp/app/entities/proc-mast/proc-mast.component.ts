import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProcMast } from 'app/shared/model/proc-mast.model';
import { ProcMastService } from './proc-mast.service';
import { ProcMastDeleteDialogComponent } from './proc-mast-delete-dialog.component';

@Component({
  selector: 'jhi-proc-mast',
  templateUrl: './proc-mast.component.html'
})
export class ProcMastComponent implements OnInit, OnDestroy {
  procMasts: IProcMast[];
  eventSubscriber: Subscription;

  constructor(protected procMastService: ProcMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.procMastService.query().subscribe((res: HttpResponse<IProcMast[]>) => {
      this.procMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProcMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProcMast) {
    return item.id;
  }

  registerChangeInProcMasts() {
    this.eventSubscriber = this.eventManager.subscribe('procMastListModification', () => this.loadAll());
  }

  delete(procMast: IProcMast) {
    const modalRef = this.modalService.open(ProcMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.procMast = procMast;
  }
}
