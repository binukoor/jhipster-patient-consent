import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { EstMastDeleteDialogComponent } from 'app/entities/est-mast/est-mast-delete-dialog.component';
import { EstMastService } from 'app/entities/est-mast/est-mast.service';

describe('Component Tests', () => {
  describe('EstMast Management Delete Component', () => {
    let comp: EstMastDeleteDialogComponent;
    let fixture: ComponentFixture<EstMastDeleteDialogComponent>;
    let service: EstMastService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [EstMastDeleteDialogComponent]
      })
        .overrideTemplate(EstMastDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstMastDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstMastService);
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
