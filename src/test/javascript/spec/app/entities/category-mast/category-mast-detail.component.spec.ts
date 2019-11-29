import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientConsentAppTestModule } from '../../../test.module';
import { CategoryMastDetailComponent } from 'app/entities/category-mast/category-mast-detail.component';
import { CategoryMast } from 'app/shared/model/category-mast.model';

describe('Component Tests', () => {
  describe('CategoryMast Management Detail Component', () => {
    let comp: CategoryMastDetailComponent;
    let fixture: ComponentFixture<CategoryMastDetailComponent>;
    const route = ({ data: of({ categoryMast: new CategoryMast(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [CategoryMastDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoryMastDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryMastDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categoryMast).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
