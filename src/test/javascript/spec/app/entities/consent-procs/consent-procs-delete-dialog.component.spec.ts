import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentProcsDeleteDialogComponent } from 'app/entities/consent-procs/consent-procs-delete-dialog.component';
import { ConsentProcsService } from 'app/entities/consent-procs/consent-procs.service';

describe('Component Tests', () => {
  describe('ConsentProcs Management Delete Component', () => {
    let comp: ConsentProcsDeleteDialogComponent;
    let fixture: ComponentFixture<ConsentProcsDeleteDialogComponent>;
    let service: ConsentProcsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentProcsDeleteDialogComponent]
      })
        .overrideTemplate(ConsentProcsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsentProcsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentProcsService);
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
