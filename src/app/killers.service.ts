import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Killer {
  id: number;
  pseudonym: string;
  location: string;
  salary: number;
  targetId: number;
}

interface KillerRequestBody {
  pseudonym: string;
  salary: number;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class KillersService {

  private readonly KILLERS_URL = `${environment.baseUrl}/killers`;

  constructor(private http: HttpClient) { }

  public getKillers(): Observable<Killer[]> {
    return this.http.get<Killer[]>(`${this.KILLERS_URL}/list`);
  }

  public addKiller(killer: KillerRequestBody): Observable<boolean> {
    return this.http.post<string>(`${this.KILLERS_URL}/add`, killer).pipe(
      mapTo(true),
    );
  }

  public updateKiller(killerId: number, killer: KillerRequestBody): Observable<boolean> {
    return this.http.put<string>(`${this.KILLERS_URL}/edit/${killerId}`, killer).pipe(
      mapTo(true)
    );
  }

  public deleteKiller(killerId: number): Observable<boolean> {
    return this.http.delete<string>(`${this.KILLERS_URL}/remove/${killerId}`).pipe(
      mapTo(true)
    );
  }

  public setTarget(targetRequestBody: { killerId: number; targetId: number }): Observable<boolean> {
    return this.http.post<string>(`${this.KILLERS_URL}/set-target`, targetRequestBody).pipe(
      mapTo(true)
    );
  }

  public cancelTarget(targetId: number): Observable<boolean> {
    return this.http.delete<string>(`${this.KILLERS_URL}/cancel-target/${targetId} `).pipe(
      mapTo(true)
    );
  }
}
