import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PatientConsentAppTestModule } from '../../../test.module';
import { IcdMastDeleteDialogComponent } from 'app/entities/icd-mast/icd-mast-delete-dialog.component';
import { IcdMastService } from 'app/entities/icd-mast/icd-mast.service';

describe('Component Tests', () => {
  describe('IcdMast Management Delete Component', () => {
    let comp: IcdMastDeleteDialogComponent;
    let fixture: ComponentFixture<IcdMastDeleteDialogComponent>;
    let service: IcdMastService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [IcdMastDeleteDialogComponent]
      })
        .overrideTemplate(IcdMastDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IcdMastDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IcdMastService);
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
