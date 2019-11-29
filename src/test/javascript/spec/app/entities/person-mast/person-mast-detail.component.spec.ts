import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PersonMastDetailComponent } from 'app/entities/person-mast/person-mast-detail.component';
import { PersonMast } from 'app/shared/model/person-mast.model';

describe('Component Tests', () => {
  describe('PersonMast Management Detail Component', () => {
    let comp: PersonMastDetailComponent;
    let fixture: ComponentFixture<PersonMastDetailComponent>;
    const route = ({ data: of({ personMast: new PersonMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PersonMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PersonMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
