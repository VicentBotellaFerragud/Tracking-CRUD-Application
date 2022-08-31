import { Component, OnInit } from '@angular/core';
import { Issue } from './models/issue';
import { IssueService } from './services/issue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  issues: Issue[] = [];

  title: string = "";

  description: string = "";

  newIssue: Issue = new Issue();

  idToEdit: number = 0;

  newTitle: string = "";

  newDescription: string = "";

  idToDelete: number = 0;

  constructor(private issueService: IssueService) { }

  ngOnInit() {

    this.issueService.getAllIssues().subscribe((data) => {

      this.issues = data;
      console.log(this.issues);

    });

  }

  getIssueById(id: number) {

    this.issueService.getIssueById(id).subscribe((data) => {

      console.log(data);

    });

  }

  createIssue(issue: Issue) {

    issue.title = this.title;
    issue.description = this.description;

    console.log(issue);

    
    this.issueService.createIssue(issue).subscribe((data?) => {

      if (data) {
        console.log(data);
      }

    });
    
  }

  // Al
  editIssue(idToEdit: number) {

    let idToEditToNumber = Number(idToEdit);
    console.log(idToEditToNumber);

    let issueToEdit = this.issues.find(element => element.id === idToEditToNumber);

    if (issueToEdit) {

      issueToEdit.title = this.newTitle;
      issueToEdit.description = this.newDescription;

      this.issueService.editIssue(issueToEdit).subscribe((data) => {

        console.log(data);
  
      });

    } 
    
  }

  deleteIssue(idToDelete: number) {

    let idToDeleteToNumber = Number(idToDelete);
    console.log(idToDeleteToNumber);

    
    let issueToDelete = this.issues.find(element => element.id === idToDeleteToNumber);

    if (issueToDelete) {

      this.issueService.deleteIssue(issueToDelete).subscribe((data) => {

        console.log(data);
  
      });

    } 

  }
  
}