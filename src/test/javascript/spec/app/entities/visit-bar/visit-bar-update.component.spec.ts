import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { VisitBarUpdateComponent } from 'app/entities/visit-bar/visit-bar-update.component';
import { VisitBarService } from 'app/entities/visit-bar/visit-bar.service';
import { VisitBar } from 'app/shared/model/visit-bar.model';

describe('Component Tests', () => {
  describe('VisitBar Management Update Component', () => {
    let comp: VisitBarUpdateComponent;
    let fixture: ComponentFixture<VisitBarUpdateComponent>;
    let service: VisitBarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [VisitBarUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VisitBarUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitBarUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitBarService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VisitBar(123);
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
        const entity = new VisitBar();
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
