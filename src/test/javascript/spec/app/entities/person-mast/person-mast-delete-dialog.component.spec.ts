import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PersonMastDeleteDialogComponent } from 'app/entities/person-mast/person-mast-delete-dialog.component';
import { PersonMastService } from 'app/entities/person-mast/person-mast.service';

describe('Component Tests', () => {
  describe('PersonMast Management Delete Component', () => {
    let comp: PersonMastDeleteDialogComponent;
    let fixture: ComponentFixture<PersonMastDeleteDialogComponent>;
    let service: PersonMastService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PersonMastDeleteDialogComponent]
      })
        .overrideTemplate(PersonMastDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonMastDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonMastService);
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
