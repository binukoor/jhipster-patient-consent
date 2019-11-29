import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { StatusMastDeleteDialogComponent } from 'app/entities/status-mast/status-mast-delete-dialog.component';
import { StatusMastService } from 'app/entities/status-mast/status-mast.service';

describe('Component Tests', () => {
  describe('StatusMast Management Delete Component', () => {
    let comp: StatusMastDeleteDialogComponent;
    let fixture: ComponentFixture<StatusMastDeleteDialogComponent>;
    let service: StatusMastService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [StatusMastDeleteDialogComponent]
      })
        .overrideTemplate(StatusMastDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatusMastDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusMastService);
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
