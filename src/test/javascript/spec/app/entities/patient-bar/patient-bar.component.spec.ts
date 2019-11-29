import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PatientBarComponent } from 'app/entities/patient-bar/patient-bar.component';
import { PatientBarService } from 'app/entities/patient-bar/patient-bar.service';
import { PatientBar } from 'app/shared/model/patient-bar.model';

describe('Component Tests', () => {
  describe('PatientBar Management Component', () => {
    let comp: PatientBarComponent;
    let fixture: ComponentFixture<PatientBarComponent>;
    let service: PatientBarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PatientBarComponent],
        providers: []
      })
        .overrideTemplate(PatientBarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatientBarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientBarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PatientBar(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.patientBars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
