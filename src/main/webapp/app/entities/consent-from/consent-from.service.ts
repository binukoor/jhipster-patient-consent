import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsentFrom } from 'app/shared/model/consent-from.model';

type EntityResponseType = HttpResponse<IConsentFrom>;
type EntityArrayResponseType = HttpResponse<IConsentFrom[]>;

@Injectable({ providedIn: 'root' })
export class ConsentFromService {
  public resourceUrl = SERVER_API_URL + 'api/consent-froms';

  constructor(protected http: HttpClient) {}

  create(consentFrom: IConsentFrom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consentFrom);
    return this.http
      .post<IConsentFrom>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consentFrom: IConsentFrom): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consentFrom);
    return this.http
      .put<IConsentFrom>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsentFrom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsentFrom[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(consentFrom: IConsentFrom): IConsentFrom {
    const copy: IConsentFrom = Object.assign({}, consentFrom, {
      verifiedTime: consentFrom.verifiedTime != null && consentFrom.verifiedTime.isValid() ? consentFrom.verifiedTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.verifiedTime = res.body.verifiedTime != null ? moment(res.body.verifiedTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((consentFrom: IConsentFrom) => {
        consentFrom.verifiedTime = consentFrom.verifiedTime != null ? moment(consentFrom.verifiedTime) : null;
      });
    }
    return res;
  }
}
