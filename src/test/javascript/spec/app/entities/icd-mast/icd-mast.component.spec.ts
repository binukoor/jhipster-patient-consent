import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { IcdMastComponent } from 'app/entities/icd-mast/icd-mast.component';
import { IcdMastService } from 'app/entities/icd-mast/icd-mast.service';
import { IcdMast } from 'app/shared/model/icd-mast.model';

describe('Component Tests', () => {
  describe('IcdMast Management Component', () => {
    let comp: IcdMastComponent;
    let fixture: ComponentFixture<IcdMastComponent>;
    let service: IcdMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [IcdMastComponent],
        providers: []
      })
        .overrideTemplate(IcdMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IcdMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IcdMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new IcdMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.icdMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
