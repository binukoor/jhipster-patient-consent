import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoryMast } from 'app/shared/model/category-mast.model';
import { CategoryMastService } from './category-mast.service';

@Component({
  templateUrl: './category-mast-delete-dialog.component.html'
})
export class CategoryMastDeleteDialogComponent {
  categoryMast: ICategoryMast;

  constructor(
    protected categoryMastService: CategoryMastService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categoryMastService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'categoryMastListModification',
        content: 'Deleted an categoryMast'
      });
      this.activeModal.dismiss(true);
    });
  }
}
