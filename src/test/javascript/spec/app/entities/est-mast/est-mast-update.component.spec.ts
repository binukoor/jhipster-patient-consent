import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { EstMastUpdateComponent } from 'app/entities/est-mast/est-mast-update.component';
import { EstMastService } from 'app/entities/est-mast/est-mast.service';
import { EstMast } from 'app/shared/model/est-mast.model';

describe('Component Tests', () => {
  describe('EstMast Management Update Component', () => {
    let comp: EstMastUpdateComponent;
    let fixture: ComponentFixture<EstMastUpdateComponent>;
    let service: EstMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [EstMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstMast(123);
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
        const entity = new EstMast();
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
