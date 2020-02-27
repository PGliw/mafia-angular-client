import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { mapTo, catchError } from 'rxjs/operators';

// TODO move interfaces to another file
export interface Debtor {
  id: number;
  name: string;
  lastname: string;
  location: string;
  debt: number;
  isTarget: boolean;
}

interface DebtorRequestBody {
  name: string;
  lastname: string;
  age: number;
  debt: number;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class DebtorsService {

  private readonly DEBTORS_URL = 'http://localhost:8443/api/debtors';

  constructor(private http: HttpClient) { }

  public getDebtors(): Observable<Debtor[]> {
    return this.http.get<Debtor[]>(`${this.DEBTORS_URL}/list`);
  }

  public addDebtor(debtor: DebtorRequestBody): Observable<boolean> {
    return this.http.post<string>(`${this.DEBTORS_URL}/add`, debtor).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public updateDebtor(debtorId: number, debtor: DebtorRequestBody): Observable<boolean> {
    return this.http.put<string>(`${this.DEBTORS_URL}/edit/${debtorId}`, debtor).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public deleteDebtor(debtorId: number): Observable<boolean> {
    return this.http.delete<string>(`${this.DEBTORS_URL}/remove/${debtorId}`).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public cancelTask(taskId: number): Observable<boolean> {
    return this.http.delete<string>(`${this.DEBTORS_URL}/cancel-task/${taskId} `).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      alert(`${error.message}`);
    } else {
      alert(error); // TODO
    }
  }

}
