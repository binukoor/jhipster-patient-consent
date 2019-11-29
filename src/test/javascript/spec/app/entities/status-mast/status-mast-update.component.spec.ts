import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { StatusMastUpdateComponent } from 'app/entities/status-mast/status-mast-update.component';
import { StatusMastService } from 'app/entities/status-mast/status-mast.service';
import { StatusMast } from 'app/shared/model/status-mast.model';

describe('Component Tests', () => {
  describe('StatusMast Management Update Component', () => {
    let comp: StatusMastUpdateComponent;
    let fixture: ComponentFixture<StatusMastUpdateComponent>;
    let service: StatusMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [StatusMastUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StatusMastUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusMastUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusMastService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StatusMast(123);
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
        const entity = new StatusMast();
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
