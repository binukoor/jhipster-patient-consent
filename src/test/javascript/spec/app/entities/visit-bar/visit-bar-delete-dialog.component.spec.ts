import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { VisitBarDeleteDialogComponent } from 'app/entities/visit-bar/visit-bar-delete-dialog.component';
import { VisitBarService } from 'app/entities/visit-bar/visit-bar.service';

describe('Component Tests', () => {
  describe('VisitBar Management Delete Component', () => {
    let comp: VisitBarDeleteDialogComponent;
    let fixture: ComponentFixture<VisitBarDeleteDialogComponent>;
    let service: VisitBarService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [VisitBarDeleteDialogComponent]
      })
        .overrideTemplate(VisitBarDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitBarDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitBarService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
