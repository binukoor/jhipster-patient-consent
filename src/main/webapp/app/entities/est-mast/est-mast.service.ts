import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEstMast } from 'app/shared/model/est-mast.model';

type EntityResponseType = HttpResponse<IEstMast>;
type EntityArrayResponseType = HttpResponse<IEstMast[]>;

@Injectable({ providedIn: 'root' })
export class EstMastService {
  public resourceUrl = SERVER_API_URL + 'api/est-masts';

  constructor(protected http: HttpClient) {}

  create(estMast: IEstMast): Observable<EntityResponseType> {
    return this.http.post<IEstMast>(this.resourceUrl, estMast, { observe: 'response' });
  }

  update(estMast: IEstMast): Observable<EntityResponseType> {
    return this.http.put<IEstMast>(this.resourceUrl, estMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEstMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
