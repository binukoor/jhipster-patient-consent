import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsentDiag } from 'app/shared/model/consent-diag.model';

type EntityResponseType = HttpResponse<IConsentDiag>;
type EntityArrayResponseType = HttpResponse<IConsentDiag[]>;

@Injectable({ providedIn: 'root' })
export class ConsentDiagService {
  public resourceUrl = SERVER_API_URL + 'api/consent-diags';

  constructor(protected http: HttpClient) {}

  create(consentDiag: IConsentDiag): Observable<EntityResponseType> {
    return this.http.post<IConsentDiag>(this.resourceUrl, consentDiag, { observe: 'response' });
  }

  update(consentDiag: IConsentDiag): Observable<EntityResponseType> {
    return this.http.put<IConsentDiag>(this.resourceUrl, consentDiag, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsentDiag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsentDiag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
