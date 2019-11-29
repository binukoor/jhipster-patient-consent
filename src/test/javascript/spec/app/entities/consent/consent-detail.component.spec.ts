import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentDetailComponent } from 'app/entities/consent/consent-detail.component';
import { Consent } from 'app/shared/model/consent.model';

describe('Component Tests', () => {
  describe('Consent Management Detail Component', () => {
    let comp: ConsentDetailComponent;
    let fixture: ComponentFixture<ConsentDetailComponent>;
    const route = ({ data: of({ consent: new Consent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
