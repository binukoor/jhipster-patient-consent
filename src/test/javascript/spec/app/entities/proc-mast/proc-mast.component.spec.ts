import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ProcMastComponent } from 'app/entities/proc-mast/proc-mast.component';
import { ProcMastService } from 'app/entities/proc-mast/proc-mast.service';
import { ProcMast } from 'app/shared/model/proc-mast.model';

describe('Component Tests', () => {
  describe('ProcMast Management Component', () => {
    let comp: ProcMastComponent;
    let fixture: ComponentFixture<ProcMastComponent>;
    let service: ProcMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ProcMastComponent],
        providers: []
      })
        .overrideTemplate(ProcMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProcMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.procMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
