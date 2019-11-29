import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsentProcs } from 'app/shared/model/consent-procs.model';

type EntityResponseType = HttpResponse<IConsentProcs>;
type EntityArrayResponseType = HttpResponse<IConsentProcs[]>;

@Injectable({ providedIn: 'root' })
export class ConsentProcsService {
  public resourceUrl = SERVER_API_URL + 'api/consent-procs';

  constructor(protected http: HttpClient) {}

  create(consentProcs: IConsentProcs): Observable<EntityResponseType> {
    return this.http.post<IConsentProcs>(this.resourceUrl, consentProcs, { observe: 'response' });
  }

  update(consentProcs: IConsentProcs): Observable<EntityResponseType> {
    return this.http.put<IConsentProcs>(this.resourceUrl, consentProcs, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsentProcs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsentProcs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
