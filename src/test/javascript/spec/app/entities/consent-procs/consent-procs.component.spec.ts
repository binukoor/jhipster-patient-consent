import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ConsentProcsComponent } from 'app/entities/consent-procs/consent-procs.component';
import { ConsentProcsService } from 'app/entities/consent-procs/consent-procs.service';
import { ConsentProcs } from 'app/shared/model/consent-procs.model';

describe('Component Tests', () => {
  describe('ConsentProcs Management Component', () => {
    let comp: ConsentProcsComponent;
    let fixture: ComponentFixture<ConsentProcsComponent>;
    let service: ConsentProcsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ConsentProcsComponent],
        providers: []
      })
        .overrideTemplate(ConsentProcsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsentProcsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsentProcsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ConsentProcs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consentProcs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
