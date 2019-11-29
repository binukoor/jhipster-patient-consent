import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentProcsDetailComponent } from 'app/entities/consent-procs/consent-procs-detail.component';
import { ConsentProcs } from 'app/shared/model/consent-procs.model';

describe('Component Tests', () => {
  describe('ConsentProcs Management Detail Component', () => {
    let comp: ConsentProcsDetailComponent;
    let fixture: ComponentFixture<ConsentProcsDetailComponent>;
    const route = ({ data: of({ consentProcs: new ConsentProcs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentProcsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsentProcsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsentProcsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consentProcs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
