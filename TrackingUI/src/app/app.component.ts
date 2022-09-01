import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Issue } from './models/issue';
import { IssueService } from './services/issue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  issues: Issue[] = [];

  issueToEdit?: Issue;

  destroy = new Subject();

  constructor(private issueService: IssueService) { }

  ngOnInit() {

    this.issueService.getAllIssues().subscribe((data) => {

      this.issues = data;

    });

  }

  initNewIssue() {

    this.issueToEdit = new Issue();

    
  }

  editIssue(issue: Issue) {

    this.issueToEdit = issue;

  }

  updateIssuesList(issues: Issue[]) {

    this.issues = issues;

  }

  ngOnDestroy() {

    this.destroy.next(true);

  }

}