import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { IcdMastDetailComponent } from 'app/entities/icd-mast/icd-mast-detail.component';
import { IcdMast } from 'app/shared/model/icd-mast.model';

describe('Component Tests', () => {
  describe('IcdMast Management Detail Component', () => {
    let comp: IcdMastDetailComponent;
    let fixture: ComponentFixture<IcdMastDetailComponent>;
    const route = ({ data: of({ icdMast: new IcdMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [IcdMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IcdMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IcdMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.icdMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
