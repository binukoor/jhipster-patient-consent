import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonMast } from 'app/shared/model/person-mast.model';

type EntityResponseType = HttpResponse<IPersonMast>;
type EntityArrayResponseType = HttpResponse<IPersonMast[]>;

@Injectable({ providedIn: 'root' })
export class PersonMastService {
  public resourceUrl = SERVER_API_URL + 'api/person-masts';

  constructor(protected http: HttpClient) {}

  create(personMast: IPersonMast): Observable<EntityResponseType> {
    return this.http.post<IPersonMast>(this.resourceUrl, personMast, { observe: 'response' });
  }

  update(personMast: IPersonMast): Observable<EntityResponseType> {
    return this.http.put<IPersonMast>(this.resourceUrl, personMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
