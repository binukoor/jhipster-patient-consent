import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { IcdMastUpdateComponent } from 'app/entities/icd-mast/icd-mast-update.component';
import { IcdMastService } from 'app/entities/icd-mast/icd-mast.service';
import { IcdMast } from 'app/shared/model/icd-mast.model';

describe('Component Tests', () => {
  describe('IcdMast Management Update Component', () => {
    let comp: IcdMastUpdateComponent;
    let fixture: ComponentFixture<IcdMastUpdateComponent>;
    let service: IcdMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [IcdMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IcdMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IcdMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IcdMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new IcdMast(123);
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
        const entity = new IcdMast();
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
