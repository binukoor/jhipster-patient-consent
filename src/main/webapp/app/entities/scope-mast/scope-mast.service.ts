import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IScopeMast } from 'app/shared/model/scope-mast.model';

type EntityResponseType = HttpResponse<IScopeMast>;
type EntityArrayResponseType = HttpResponse<IScopeMast[]>;

@Injectable({ providedIn: 'root' })
export class ScopeMastService {
  public resourceUrl = SERVER_API_URL + 'api/scope-masts';

  constructor(protected http: HttpClient) {}

  create(scopeMast: IScopeMast): Observable<EntityResponseType> {
    return this.http.post<IScopeMast>(this.resourceUrl, scopeMast, { observe: 'response' });
  }

  update(scopeMast: IScopeMast): Observable<EntityResponseType> {
    return this.http.put<IScopeMast>(this.resourceUrl, scopeMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IScopeMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IScopeMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
