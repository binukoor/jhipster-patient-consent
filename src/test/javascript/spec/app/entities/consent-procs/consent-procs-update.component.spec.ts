import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentProcsUpdateComponent } from 'app/entities/consent-procs/consent-procs-update.component';
import { ConsentProcsService } from 'app/entities/consent-procs/consent-procs.service';
import { ConsentProcs } from 'app/shared/model/consent-procs.model';

describe('Component Tests', () => {
  describe('ConsentProcs Management Update Component', () => {
    let comp: ConsentProcsUpdateComponent;
    let fixture: ComponentFixture<ConsentProcsUpdateComponent>;
    let service: ConsentProcsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentProcsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConsentProcsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsentProcsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentProcsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConsentProcs(123);
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
        const entity = new ConsentProcs();
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
