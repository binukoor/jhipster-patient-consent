import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PatientBarDetailComponent } from 'app/entities/patient-bar/patient-bar-detail.component';
import { PatientBar } from 'app/shared/model/patient-bar.model';

describe('Component Tests', () => {
  describe('PatientBar Management Detail Component', () => {
    let comp: PatientBarDetailComponent;
    let fixture: ComponentFixture<PatientBarDetailComponent>;
    const route = ({ data: of({ patientBar: new PatientBar(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PatientBarDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PatientBarDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PatientBarDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.patientBar).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
