import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentDiagUpdateComponent } from 'app/entities/consent-diag/consent-diag-update.component';
import { ConsentDiagService } from 'app/entities/consent-diag/consent-diag.service';
import { ConsentDiag } from 'app/shared/model/consent-diag.model';

describe('Component Tests', () => {
  describe('ConsentDiag Management Update Component', () => {
    let comp: ConsentDiagUpdateComponent;
    let fixture: ComponentFixture<ConsentDiagUpdateComponent>;
    let service: ConsentDiagService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentDiagUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConsentDiagUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsentDiagUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentDiagService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConsentDiag(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConsentDiag();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
