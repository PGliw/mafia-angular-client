import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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

  private readonly DASHBOARD_URL = `${environment.baseUrl}/dashboard`;

  constructor(private http: HttpClient) { }

  public getWidgets(userId: number): Observable<Widget[]> {
    return this.http.get<DashboardResponse>(`${this.DASHBOARD_URL}/get/${userId}`).pipe(
      map(value => JSON.parse(value.widgets))
    );
  }

  public saveWidgets(userId: number, widgets: Widget[]): Observable<boolean> {
    return this.http.post<string>(`${this.DASHBOARD_URL}/add`, { userId, widgets: JSON.stringify(widgets) }).pipe(
      mapTo(true)
    );
  }
}
