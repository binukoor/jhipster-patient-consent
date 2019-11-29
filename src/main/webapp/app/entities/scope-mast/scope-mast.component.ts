import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IScopeMast } from 'app/shared/model/scope-mast.model';
import { ScopeMastService } from './scope-mast.service';
import { ScopeMastDeleteDialogComponent } from './scope-mast-delete-dialog.component';

@Component({
  selector: 'jhi-scope-mast',
  templateUrl: './scope-mast.component.html'
})
export class ScopeMastComponent implements OnInit, OnDestroy {
  scopeMasts: IScopeMast[];
  eventSubscriber: Subscription;

  constructor(protected scopeMastService: ScopeMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.scopeMastService.query().subscribe((res: HttpResponse<IScopeMast[]>) => {
      this.scopeMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInScopeMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IScopeMast) {
    return item.id;
  }

  registerChangeInScopeMasts() {
    this.eventSubscriber = this.eventManager.subscribe('scopeMastListModification', () => this.loadAll());
  }

  delete(scopeMast: IScopeMast) {
    const modalRef = this.modalService.open(ScopeMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.scopeMast = scopeMast;
  }
}
