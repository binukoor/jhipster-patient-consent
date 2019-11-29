import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPatientBar } from 'app/shared/model/patient-bar.model';

type EntityResponseType = HttpResponse<IPatientBar>;
type EntityArrayResponseType = HttpResponse<IPatientBar[]>;

@Injectable({ providedIn: 'root' })
export class PatientBarService {
  public resourceUrl = SERVER_API_URL + 'api/patient-bars';

  constructor(protected http: HttpClient) {}

  create(patientBar: IPatientBar): Observable<EntityResponseType> {
    return this.http.post<IPatientBar>(this.resourceUrl, patientBar, { observe: 'response' });
  }

  update(patientBar: IPatientBar): Observable<EntityResponseType> {
    return this.http.put<IPatientBar>(this.resourceUrl, patientBar, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPatientBar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPatientBar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
