import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
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

  private searchTerms = new Subject<string>();

  issues$!: Observable<Issue[]>;

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

  editIssue(idToEdit: number) {

    let idToEditToNumber = Number(idToEdit);

    let issueToEdit = this.issues.find(element => element.id === idToEditToNumber);

    console.log(issueToEdit);

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
    
    let issueToDelete = this.issues.find(element => element.id === idToDeleteToNumber);

    console.log(issueToDelete);

    if (issueToDelete) {

      this.issueService.deleteIssue(issueToDelete).subscribe((data) => {

        console.log(data);
  
      });

    } 

  }

  search(term: string): void {
    
    this.searchTerms.next(term);

    this.issues$ = this.searchTerms.pipe(
    
      //Waits 300ms after each keystroke before considering the search term.
      debounceTime(300),

      //Ignores the new search term if it's the same as the previous one.
      distinctUntilChanged(),

      //Switches to a new search observable each time the search term changes.
      switchMap((term: string) => this.issueService.searchIssue(term)),
        
    );

  }
  
}