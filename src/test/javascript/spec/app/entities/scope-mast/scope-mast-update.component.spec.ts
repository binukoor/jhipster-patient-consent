import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ScopeMastUpdateComponent } from 'app/entities/scope-mast/scope-mast-update.component';
import { ScopeMastService } from 'app/entities/scope-mast/scope-mast.service';
import { ScopeMast } from 'app/shared/model/scope-mast.model';

describe('Component Tests', () => {
  describe('ScopeMast Management Update Component', () => {
    let comp: ScopeMastUpdateComponent;
    let fixture: ComponentFixture<ScopeMastUpdateComponent>;
    let service: ScopeMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ScopeMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ScopeMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScopeMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScopeMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ScopeMast(123);
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
        const entity = new ScopeMast();
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
