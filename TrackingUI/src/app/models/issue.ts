export class Issue {
    id?: number;
    title: string = "";
    description: string = "";
    priority: any;
    type: any;
    createdAt: any;
    completed: any;
}

/* IMPORTANT! --> The types of the UI Issue class properties have to be the same as the types of the API Issue class */