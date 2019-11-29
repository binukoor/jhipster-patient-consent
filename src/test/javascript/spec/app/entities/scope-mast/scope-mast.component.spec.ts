import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { ScopeMastComponent } from 'app/entities/scope-mast/scope-mast.component';
import { ScopeMastService } from 'app/entities/scope-mast/scope-mast.service';
import { ScopeMast } from 'app/shared/model/scope-mast.model';

describe('Component Tests', () => {
  describe('ScopeMast Management Component', () => {
    let comp: ScopeMastComponent;
    let fixture: ComponentFixture<ScopeMastComponent>;
    let service: ScopeMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [ScopeMastComponent],
        providers: []
      })
        .overrideTemplate(ScopeMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ScopeMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ScopeMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ScopeMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.scopeMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
