import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePersonRequest, SavePersonResponse } from '../models/person.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl = `${environment.apiUrl}/api/Person`;

  constructor(private http: HttpClient) {}

  createPerson(request: CreatePersonRequest): Observable<SavePersonResponse> {
    return this.http.post<SavePersonResponse>(this.apiUrl, request);
  }
}
