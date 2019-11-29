import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoryMast } from 'app/shared/model/category-mast.model';
import { CategoryMastService } from './category-mast.service';
import { CategoryMastDeleteDialogComponent } from './category-mast-delete-dialog.component';

@Component({
  selector: 'jhi-category-mast',
  templateUrl: './category-mast.component.html'
})
export class CategoryMastComponent implements OnInit, OnDestroy {
  categoryMasts: ICategoryMast[];
  eventSubscriber: Subscription;

  constructor(
    protected categoryMastService: CategoryMastService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.categoryMastService.query().subscribe((res: HttpResponse<ICategoryMast[]>) => {
      this.categoryMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCategoryMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategoryMast) {
    return item.id;
  }

  registerChangeInCategoryMasts() {
    this.eventSubscriber = this.eventManager.subscribe('categoryMastListModification', () => this.loadAll());
  }

  delete(categoryMast: ICategoryMast) {
    const modalRef = this.modalService.open(CategoryMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.categoryMast = categoryMast;
  }
}
