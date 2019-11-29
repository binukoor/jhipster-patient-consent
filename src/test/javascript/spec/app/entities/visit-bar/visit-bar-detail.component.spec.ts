import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { VisitBarDetailComponent } from 'app/entities/visit-bar/visit-bar-detail.component';
import { VisitBar } from 'app/shared/model/visit-bar.model';

describe('Component Tests', () => {
  describe('VisitBar Management Detail Component', () => {
    let comp: VisitBarDetailComponent;
    let fixture: ComponentFixture<VisitBarDetailComponent>;
    const route = ({ data: of({ visitBar: new VisitBar(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [VisitBarDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitBarDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitBarDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitBar).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
