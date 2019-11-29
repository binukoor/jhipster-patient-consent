import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonMast } from 'app/shared/model/person-mast.model';
import { PersonMastService } from './person-mast.service';
import { PersonMastDeleteDialogComponent } from './person-mast-delete-dialog.component';

@Component({
  selector: 'jhi-person-mast',
  templateUrl: './person-mast.component.html'
})
export class PersonMastComponent implements OnInit, OnDestroy {
  personMasts: IPersonMast[];
  eventSubscriber: Subscription;

  constructor(protected personMastService: PersonMastService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.personMastService.query().subscribe((res: HttpResponse<IPersonMast[]>) => {
      this.personMasts = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPersonMasts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPersonMast) {
    return item.id;
  }

  registerChangeInPersonMasts() {
    this.eventSubscriber = this.eventManager.subscribe('personMastListModification', () => this.loadAll());
  }

  delete(personMast: IPersonMast) {
    const modalRef = this.modalService.open(PersonMastDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.personMast = personMast;
  }
}
