import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstMast } from 'app/shared/model/est-mast.model';
import { EstMastService } from './est-mast.service';
import { EstMastDeleteDialogComponent } from './est-mast-delete-dialog.component';

@Component({
  selector: 'jhi-est-mast',
  templateUrl: './est-mast.component.html'
})
export class EstMastComponent implements OnInit, OnDestroy {
  estMasts: IEstMast[];
  eventSubscriber: Subscription;

  constructor(protected estMastService: EstMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.estMastService.query().subscribe((res: HttpResponse<IEstMast[]>) => {
      this.estMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInEstMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEstMast) {
    return item.id;
  }

  registerChangeInEstMasts() {
    this.eventSubscriber = this.eventManager.subscribe('estMastListModification', () => this.loadAll());
  }

  delete(estMast: IEstMast) {
    const modalRef = this.modalService.open(EstMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estMast = estMast;
  }
}
