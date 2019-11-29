import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PatientBarDeleteDialogComponent } from 'app/entities/patient-bar/patient-bar-delete-dialog.component';
import { PatientBarService } from 'app/entities/patient-bar/patient-bar.service';

describe('Component Tests', () => {
  describe('PatientBar Management Delete Component', () => {
    let comp: PatientBarDeleteDialogComponent;
    let fixture: ComponentFixture<PatientBarDeleteDialogComponent>;
    let service: PatientBarService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PatientBarDeleteDialogComponent]
      })
        .overrideTemplate(PatientBarDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PatientBarDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientBarService);
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
