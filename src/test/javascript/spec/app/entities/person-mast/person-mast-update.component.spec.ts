import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PersonMastUpdateComponent } from 'app/entities/person-mast/person-mast-update.component';
import { PersonMastService } from 'app/entities/person-mast/person-mast.service';
import { PersonMast } from 'app/shared/model/person-mast.model';

describe('Component Tests', () => {
  describe('PersonMast Management Update Component', () => {
    let comp: PersonMastUpdateComponent;
    let fixture: ComponentFixture<PersonMastUpdateComponent>;
    let service: PersonMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PersonMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PersonMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PersonMast(123);
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
        const entity = new PersonMast();
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
