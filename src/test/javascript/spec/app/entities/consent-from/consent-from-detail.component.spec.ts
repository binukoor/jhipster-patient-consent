import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentFromDetailComponent } from 'app/entities/consent-from/consent-from-detail.component';
import { ConsentFrom } from 'app/shared/model/consent-from.model';

describe('Component Tests', () => {
  describe('ConsentFrom Management Detail Component', () => {
    let comp: ConsentFromDetailComponent;
    let fixture: ComponentFixture<ConsentFromDetailComponent>;
    const route = ({ data: of({ consentFrom: new ConsentFrom(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentFromDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConsentFromDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsentFromDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consentFrom).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
