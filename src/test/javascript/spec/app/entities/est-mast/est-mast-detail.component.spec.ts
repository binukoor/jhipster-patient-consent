import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { EstMastDetailComponent } from 'app/entities/est-mast/est-mast-detail.component';
import { EstMast } from 'app/shared/model/est-mast.model';

describe('Component Tests', () => {
  describe('EstMast Management Detail Component', () => {
    let comp: EstMastDetailComponent;
    let fixture: ComponentFixture<EstMastDetailComponent>;
    const route = ({ data: of({ estMast: new EstMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [EstMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
