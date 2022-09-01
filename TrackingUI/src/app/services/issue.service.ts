import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private url: string = "https://localhost:7157/api/Issue";

  constructor(private http: HttpClient) { }

  public getAllIssues(): Observable<Issue[]> {

    return this.http.get<Issue[]>(this.url);

  }

  public createIssue(issue: Issue): Observable<Issue[]> {
    
    return this.http.post<Issue[]>(this.url, issue);

  }

  public editIssue(issue: Issue): Observable<Issue[]> {
    
    return this.http.put<Issue[]>(this.url, issue);

  }

  public deleteIssue(issue: Issue): Observable<Issue[]> {

    let url = `${this.url}/${issue.id}`;
    
    return this.http.delete<Issue[]>(url);

  }

}