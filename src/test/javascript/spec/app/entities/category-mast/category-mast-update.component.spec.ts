import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { CategoryMastUpdateComponent } from 'app/entities/category-mast/category-mast-update.component';
import { CategoryMastService } from 'app/entities/category-mast/category-mast.service';
import { CategoryMast } from 'app/shared/model/category-mast.model';

describe('Component Tests', () => {
  describe('CategoryMast Management Update Component', () => {
    let comp: CategoryMastUpdateComponent;
    let fixture: ComponentFixture<CategoryMastUpdateComponent>;
    let service: CategoryMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [CategoryMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoryMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoryMast(123);
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
        const entity = new CategoryMast();
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
