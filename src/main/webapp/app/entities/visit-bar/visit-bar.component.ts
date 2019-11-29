import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitBar } from 'app/shared/model/visit-bar.model';
import { VisitBarService } from './visit-bar.service';
import { VisitBarDeleteDialogComponent } from './visit-bar-delete-dialog.component';

@Component({
  selector: 'jhi-visit-bar',
  templateUrl: './visit-bar.component.html'
})
export class VisitBarComponent implements OnInit, OnDestroy {
  visitBars: IVisitBar[];
  eventSubscriber: Subscription;

  constructor(protected visitBarService: VisitBarService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.visitBarService.query().subscribe((res: HttpResponse<IVisitBar[]>) => {
      this.visitBars = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInVisitBars();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVisitBar) {
    return item.id;
  }

  registerChangeInVisitBars() {
    this.eventSubscriber = this.eventManager.subscribe('visitBarListModification', () => this.loadAll());
  }

  delete(visitBar: IVisitBar) {
    const modalRef = this.modalService.open(VisitBarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.visitBar = visitBar;
  }
}
