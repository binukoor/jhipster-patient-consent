import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentFromComponent } from 'app/entities/consent-from/consent-from.component';
import { ConsentFromService } from 'app/entities/consent-from/consent-from.service';
import { ConsentFrom } from 'app/shared/model/consent-from.model';

describe('Component Tests', () => {
  describe('ConsentFrom Management Component', () => {
    let comp: ConsentFromComponent;
    let fixture: ComponentFixture<ConsentFromComponent>;
    let service: ConsentFromService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentFromComponent],
        providers: []
      })
        .overrideTemplate(ConsentFromComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsentFromComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentFromService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ConsentFrom(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consentFroms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
