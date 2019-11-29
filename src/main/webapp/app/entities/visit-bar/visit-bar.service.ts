import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVisitBar } from 'app/shared/model/visit-bar.model';

type EntityResponseType = HttpResponse<IVisitBar>;
type EntityArrayResponseType = HttpResponse<IVisitBar[]>;

@Injectable({ providedIn: 'root' })
export class VisitBarService {
  public resourceUrl = SERVER_API_URL + 'api/visit-bars';

  constructor(protected http: HttpClient) {}

  create(visitBar: IVisitBar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitBar);
    return this.http
      .post<IVisitBar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(visitBar: IVisitBar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(visitBar);
    return this.http
      .put<IVisitBar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVisitBar>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVisitBar[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(visitBar: IVisitBar): IVisitBar {
    const copy: IVisitBar = Object.assign({}, visitBar, {
      visitTime: visitBar.visitTime != null && visitBar.visitTime.isValid() ? visitBar.visitTime.toJSON() : null,
      seenTime: visitBar.seenTime != null && visitBar.seenTime.isValid() ? visitBar.seenTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.visitTime = res.body.visitTime != null ? moment(res.body.visitTime) : null;
      res.body.seenTime = res.body.seenTime != null ? moment(res.body.seenTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((visitBar: IVisitBar) => {
        visitBar.visitTime = visitBar.visitTime != null ? moment(visitBar.visitTime) : null;
        visitBar.seenTime = visitBar.seenTime != null ? moment(visitBar.seenTime) : null;
      });
    }
    return res;
  }
}
