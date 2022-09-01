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

  title = 'TrackingUI';

  issues: Issue[] = [];

  issueToEdit?: Issue;

  destroy = new Subject();

  constructor(private issueService: IssueService) { }

  ngOnInit() {

    this.issueService.getAllIssues().subscribe((data) => {

      this.issues = data;

    });

  }

  setPriority(issue: Issue) {

    let priority = "";

    for (let i = 0; i < 4; i++) {
      
      if (issue.priority === 0) {

        priority = "Low";

      } else if (issue.priority === 1) {

        priority = "Medium";
        
      } else {

        priority = "High";
        
      }
      
    }

    return priority;

  }

  setType(issue: Issue) {

    let type = "";

    for (let i = 0; i < 3; i++) {
      
      if (issue.priority === 0) {

        type = "Feature";

      } else if (issue.priority === 1) {

        type = "Bug";
        
      } else {

        type = "Documentation";
        
      } 
      
    }

    return type;

  }

  isCompleted(issue: Issue) {

    return issue.completed === "" || !issue.completed ? "Not completed" : "Completed";

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