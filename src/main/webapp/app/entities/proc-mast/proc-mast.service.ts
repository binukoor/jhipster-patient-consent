import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcMast } from 'app/shared/model/proc-mast.model';

type EntityResponseType = HttpResponse<IProcMast>;
type EntityArrayResponseType = HttpResponse<IProcMast[]>;

@Injectable({ providedIn: 'root' })
export class ProcMastService {
  public resourceUrl = SERVER_API_URL + 'api/proc-masts';

  constructor(protected http: HttpClient) {}

  create(procMast: IProcMast): Observable<EntityResponseType> {
    return this.http.post<IProcMast>(this.resourceUrl, procMast, { observe: 'response' });
  }

  update(procMast: IProcMast): Observable<EntityResponseType> {
    return this.http.put<IProcMast>(this.resourceUrl, procMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
