import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { StatusMastComponent } from 'app/entities/status-mast/status-mast.component';
import { StatusMastService } from 'app/entities/status-mast/status-mast.service';
import { StatusMast } from 'app/shared/model/status-mast.model';

describe('Component Tests', () => {
  describe('StatusMast Management Component', () => {
    let comp: StatusMastComponent;
    let fixture: ComponentFixture<StatusMastComponent>;
    let service: StatusMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [StatusMastComponent],
        providers: []
      })
        .overrideTemplate(StatusMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StatusMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.statusMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
