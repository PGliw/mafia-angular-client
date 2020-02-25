import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap, catchError, map } from 'rxjs/operators';

export interface Widget {
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  type: number;
  options: { title: string; };
}

interface DashboardResponse {
  widgets: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DASHBOARD_URL = 'http://localhost:8443/api/dashboard';

  constructor(private http: HttpClient) { }

  public getWidgets(): Observable<Widget[]> {
    return this.http.get<DashboardResponse>(this.DASHBOARD_URL).pipe(
      map(value => JSON.parse(value.widgets)),
      catchError(error => {
        this.handleError(error);
        return of([]);
      })
    );
  }

  public saveWidgets(userId: number, widgets: Widget[]): Observable<boolean> {
    return this.http.post<string>(this.DASHBOARD_URL, { userId, widgets: JSON.stringify(widgets) }).pipe(
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
