import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientConsentAppTestModule } from '../../../test.module';
import { PersonMastComponent } from 'app/entities/person-mast/person-mast.component';
import { PersonMastService } from 'app/entities/person-mast/person-mast.service';
import { PersonMast } from 'app/shared/model/person-mast.model';

describe('Component Tests', () => {
  describe('PersonMast Management Component', () => {
    let comp: PersonMastComponent;
    let fixture: ComponentFixture<PersonMastComponent>;
    let service: PersonMastService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientConsentAppTestModule],
        declarations: [PersonMastComponent],
        providers: []
      })
        .overrideTemplate(PersonMastComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonMastComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonMastService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PersonMast(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.personMasts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
