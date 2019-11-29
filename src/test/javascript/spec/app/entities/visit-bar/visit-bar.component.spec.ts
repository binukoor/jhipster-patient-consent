import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { VisitBarComponent } from 'app/entities/visit-bar/visit-bar.component';
import { VisitBarService } from 'app/entities/visit-bar/visit-bar.service';
import { VisitBar } from 'app/shared/model/visit-bar.model';

describe('Component Tests', () => {
  describe('VisitBar Management Component', () => {
    let comp: VisitBarComponent;
    let fixture: ComponentFixture<VisitBarComponent>;
    let service: VisitBarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [VisitBarComponent],
        providers: []
      })
        .overrideTemplate(VisitBarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VisitBarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VisitBarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new VisitBar(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.visitBars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
