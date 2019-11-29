import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentDiagDetailComponent } from 'app/entities/consent-diag/consent-diag-detail.component';
import { ConsentDiag } from 'app/shared/model/consent-diag.model';

describe('Component Tests', () => {
  describe('ConsentDiag Management Detail Component', () => {
    let comp: ConsentDiagDetailComponent;
    let fixture: ComponentFixture<ConsentDiagDetailComponent>;
    const route = ({ data: of({ consentDiag: new ConsentDiag(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentDiagDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsentDiagDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsentDiagDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consentDiag).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
