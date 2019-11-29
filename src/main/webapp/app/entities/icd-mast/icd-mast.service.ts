import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIcdMast } from 'app/shared/model/icd-mast.model';

type EntityResponseType = HttpResponse<IIcdMast>;
type EntityArrayResponseType = HttpResponse<IIcdMast[]>;

@Injectable({ providedIn: 'root' })
export class IcdMastService {
  public resourceUrl = SERVER_API_URL + 'api/icd-masts';

  constructor(protected http: HttpClient) {}

  create(icdMast: IIcdMast): Observable<EntityResponseType> {
    return this.http.post<IIcdMast>(this.resourceUrl, icdMast, { observe: 'response' });
  }

  update(icdMast: IIcdMast): Observable<EntityResponseType> {
    return this.http.put<IIcdMast>(this.resourceUrl, icdMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIcdMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIcdMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
