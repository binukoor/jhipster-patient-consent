import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { EstMastComponent } from 'app/entities/est-mast/est-mast.component';
import { EstMastService } from 'app/entities/est-mast/est-mast.service';
import { EstMast } from 'app/shared/model/est-mast.model';

describe('Component Tests', () => {
  describe('EstMast Management Component', () => {
    let comp: EstMastComponent;
    let fixture: ComponentFixture<EstMastComponent>;
    let service: EstMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [EstMastComponent],
        providers: []
      })
        .overrideTemplate(EstMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EstMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.estMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
