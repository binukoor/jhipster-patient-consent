import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ProcMastDetailComponent } from 'app/entities/proc-mast/proc-mast-detail.component';
import { ProcMast } from 'app/shared/model/proc-mast.model';

describe('Component Tests', () => {
  describe('ProcMast Management Detail Component', () => {
    let comp: ProcMastDetailComponent;
    let fixture: ComponentFixture<ProcMastDetailComponent>;
    const route = ({ data: of({ procMast: new ProcMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ProcMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.procMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
