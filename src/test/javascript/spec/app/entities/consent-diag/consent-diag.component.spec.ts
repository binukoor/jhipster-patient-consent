import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentDiagComponent } from 'app/entities/consent-diag/consent-diag.component';
import { ConsentDiagService } from 'app/entities/consent-diag/consent-diag.service';
import { ConsentDiag } from 'app/shared/model/consent-diag.model';

describe('Component Tests', () => {
  describe('ConsentDiag Management Component', () => {
    let comp: ConsentDiagComponent;
    let fixture: ComponentFixture<ConsentDiagComponent>;
    let service: ConsentDiagService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentDiagComponent],
        providers: []
      })
        .overrideTemplate(ConsentDiagComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsentDiagComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentDiagService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ConsentDiag(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consentDiags[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
