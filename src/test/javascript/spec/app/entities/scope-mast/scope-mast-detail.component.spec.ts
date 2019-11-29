import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ScopeMastDetailComponent } from 'app/entities/scope-mast/scope-mast-detail.component';
import { ScopeMast } from 'app/shared/model/scope-mast.model';

describe('Component Tests', () => {
  describe('ScopeMast Management Detail Component', () => {
    let comp: ScopeMastDetailComponent;
    let fixture: ComponentFixture<ScopeMastDetailComponent>;
    const route = ({ data: of({ scopeMast: new ScopeMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ScopeMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ScopeMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ScopeMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.scopeMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
