import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { CategoryMastComponent } from 'app/entities/category-mast/category-mast.component';
import { CategoryMastService } from 'app/entities/category-mast/category-mast.service';
import { CategoryMast } from 'app/shared/model/category-mast.model';

describe('Component Tests', () => {
  describe('CategoryMast Management Component', () => {
    let comp: CategoryMastComponent;
    let fixture: ComponentFixture<CategoryMastComponent>;
    let service: CategoryMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [CategoryMastComponent],
        providers: []
      })
        .overrideTemplate(CategoryMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategoryMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categoryMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
