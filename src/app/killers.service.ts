import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Killer {
  id: number;
  pseudonym: string;
  location: string;
  salary: number;
  targetId: number;
}

@Injectable({
  providedIn: 'root'
})
export class KillersService {

  private readonly API_URL = 'http://localhost:8443/api';

  constructor(private http: HttpClient) { }

  public getKillers(): Observable<Killer[]> {
    return this.http.get<Killer[]>(`${this.API_URL}/killers/list`);
  }

}
