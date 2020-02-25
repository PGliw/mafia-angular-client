import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// TODO move interfaces to another file
export interface Debetor{
  id: number;
  name: string;
  lastname: string;
  location: string;
  debt: number;
  isTarget: boolean;
}

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
export class MafiaApiService {

  private readonly API_URL = 'http://localhost:8443/api';

  constructor(private http: HttpClient) { }

  public getDebetors(): Observable<Debetor[]> {
    return this.http.get<Debetor[]>(`${this.API_URL}/debtors/list`);
  }

  public getKillers(): Observable<Killer[]> {
    return this.http.get<Killer[]>(`${this.API_URL}/killers/list`);
  }

}
