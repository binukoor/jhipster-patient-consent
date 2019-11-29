import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ProcMastUpdateComponent } from 'app/entities/proc-mast/proc-mast-update.component';
import { ProcMastService } from 'app/entities/proc-mast/proc-mast.service';
import { ProcMast } from 'app/shared/model/proc-mast.model';

describe('Component Tests', () => {
  describe('ProcMast Management Update Component', () => {
    let comp: ProcMastUpdateComponent;
    let fixture: ComponentFixture<ProcMastUpdateComponent>;
    let service: ProcMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ProcMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcMast(123);
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
        const entity = new ProcMast();
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
