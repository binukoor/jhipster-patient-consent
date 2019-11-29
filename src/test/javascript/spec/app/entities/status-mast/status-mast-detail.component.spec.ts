import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { StatusMastDetailComponent } from 'app/entities/status-mast/status-mast-detail.component';
import { StatusMast } from 'app/shared/model/status-mast.model';

describe('Component Tests', () => {
  describe('StatusMast Management Detail Component', () => {
    let comp: StatusMastDetailComponent;
    let fixture: ComponentFixture<StatusMastDetailComponent>;
    const route = ({ data: of({ statusMast: new StatusMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [StatusMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatusMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatusMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statusMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
