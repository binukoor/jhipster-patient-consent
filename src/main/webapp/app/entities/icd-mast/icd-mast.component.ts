import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIcdMast } from 'app/shared/model/icd-mast.model';
import { IcdMastService } from './icd-mast.service';
import { IcdMastDeleteDialogComponent } from './icd-mast-delete-dialog.component';

@Component({
  selector: 'jhi-icd-mast',
  templateUrl: './icd-mast.component.html'
})
export class IcdMastComponent implements OnInit, OnDestroy {
  icdMasts: IIcdMast[];
  eventSubscriber: Subscription;

  constructor(protected icdMastService: IcdMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.icdMastService.query().subscribe((res: HttpResponse<IIcdMast[]>) => {
      this.icdMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInIcdMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIcdMast) {
    return item.id;
  }

  registerChangeInIcdMasts() {
    this.eventSubscriber = this.eventManager.subscribe('icdMastListModification', () => this.loadAll());
  }

  delete(icdMast: IIcdMast) {
    const modalRef = this.modalService.open(IcdMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.icdMast = icdMast;
  }
}
