import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICategoryMast } from 'app/shared/model/category-mast.model';

type EntityResponseType = HttpResponse<ICategoryMast>;
type EntityArrayResponseType = HttpResponse<ICategoryMast[]>;

@Injectable({ providedIn: 'root' })
export class CategoryMastService {
  public resourceUrl = SERVER_API_URL + 'api/category-masts';

  constructor(protected http: HttpClient) {}

  create(categoryMast: ICategoryMast): Observable<EntityResponseType> {
    return this.http.post<ICategoryMast>(this.resourceUrl, categoryMast, { observe: 'response' });
  }

  update(categoryMast: ICategoryMast): Observable<EntityResponseType> {
    return this.http.put<ICategoryMast>(this.resourceUrl, categoryMast, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoryMast>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoryMast[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
