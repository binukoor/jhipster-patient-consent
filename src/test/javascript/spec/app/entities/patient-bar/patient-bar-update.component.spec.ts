import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PatientBarUpdateComponent } from 'app/entities/patient-bar/patient-bar-update.component';
import { PatientBarService } from 'app/entities/patient-bar/patient-bar.service';
import { PatientBar } from 'app/shared/model/patient-bar.model';

describe('Component Tests', () => {
  describe('PatientBar Management Update Component', () => {
    let comp: PatientBarUpdateComponent;
    let fixture: ComponentFixture<PatientBarUpdateComponent>;
    let service: PatientBarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PatientBarUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PatientBarUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatientBarUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientBarService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PatientBar(123);
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
        const entity = new PatientBar();
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
