import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatusMast } from 'app/shared/model/status-mast.model';

type EntityResponseType = HttpResponse<IStatusMast>;
type EntityArrayResponseType = HttpResponse<IStatusMast[]>;

@Injectable({ providedIn: 'root' })
export class StatusMastService {
  public resourceUrl = SERVER_API_URL + 'api/status-masts';

  constructor(protected http: HttpClient) {}

  create(statusMast: IStatusMast): Observable<EntityResponseType> {
    return this.http.post<IStatusMast>(this.resourceUrl, statusMast, { observe: 'response' });
  }

  update(statusMast: IStatusMast): Observable<EntityResponseType> {
    return this.http.put<IStatusMast>(this.resourceUrl, statusMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStatusMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStatusMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
