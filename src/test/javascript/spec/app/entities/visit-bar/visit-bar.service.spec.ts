import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { VisitBarService } from 'app/entities/visit-bar/visit-bar.service';
import { IVisitBar, VisitBar } from 'app/shared/model/visit-bar.model';

describe('Service Tests', () => {
  describe('VisitBar Service', () => {
    let injector: TestBed;
    let service: VisitBarService;
    let httpMock: HttpTestingController;
    let elemDefault: IVisitBar;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(VisitBarService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new VisitBar(0, 0, 'AAAAAAA', currentDate, currentDate, 0, 'AAAAAAA', 0, 'AAAAAAA', 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            visitTime: currentDate.format(DATE_TIME_FORMAT),
            seenTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a VisitBar', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            visitTime: currentDate.format(DATE_TIME_FORMAT),
            seenTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            visitTime: currentDate,
            seenTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new VisitBar(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a VisitBar', () => {
        const returnedFromService = Object.assign(
          {
            visitId: 1,
            visitType: 'BBBBBB',
            visitTime: currentDate.format(DATE_TIME_FORMAT),
            seenTime: currentDate.format(DATE_TIME_FORMAT),
            deptCode: 1,
            deptName: 'BBBBBB',
            clinicCode: 1,
            clinicName: 'BBBBBB',
            consultantCode: 1,
            consultantName: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            visitTime: currentDate,
            seenTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of VisitBar', () => {
        const returnedFromService = Object.assign(
          {
            visitId: 1,
            visitType: 'BBBBBB',
            visitTime: currentDate.format(DATE_TIME_FORMAT),
            seenTime: currentDate.format(DATE_TIME_FORMAT),
            deptCode: 1,
            deptName: 'BBBBBB',
            clinicCode: 1,
            clinicName: 'BBBBBB',
            consultantCode: 1,
            consultantName: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            visitTime: currentDate,
            seenTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a VisitBar', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
