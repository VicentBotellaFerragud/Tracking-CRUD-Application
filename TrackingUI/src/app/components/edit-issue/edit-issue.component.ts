import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Issue } from 'src/app/models/issue';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {

  @Input() issue?: Issue;

  @Output() issuesUpdated = new EventEmitter<Issue[]>();

  destroy = new Subject();

  constructor(private issueService: IssueService) { }

  ngOnInit(): void { }

  updateIssue(issue: Issue) {

    this.issueService.editIssue(issue).pipe(takeUntil(this.destroy)).subscribe((issues: Issue[] | any) => {
      
      this.issuesUpdated.emit(issues);

      this.issue = undefined;
    
    });

  }

  deleteIssue(issue: Issue) {
    
    this.issueService.deleteIssue(issue).pipe(takeUntil(this.destroy)).subscribe((issues: Issue[] | any) => {
      
      this.issuesUpdated.emit(issues);

      this.issue = undefined;
    
    });

  }

  createIssue(issue: Issue) {

    this.issueService.createIssue(issue).pipe(takeUntil(this.destroy)).subscribe((issues: Issue[] | any) => {
      
      this.issuesUpdated.emit(issues);

      this.issue = undefined;
    
    });

  }

  ngOnDestroy(): void {
    
    this.destroy.next(true);

  }

}