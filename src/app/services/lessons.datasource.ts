import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError } from "rxjs/operators";

import { Lesson } from "../model/lesson";
import { CoursesService } from "./courses.service";


export class LessonsDataSource implements DataSource<Lesson> {

  private lessonSubject = new BehaviorSubject<Lesson[]>([]);

  constructor(private courseServ: CoursesService) {

  }

  loadLessons(courseID: number, filter: string, sortDirection: string, pageIndex:number, pageSize: number) {
    this.courseServ.findLessons(courseID, filter, sortDirection, pageIndex, pageSize)
    .pipe(
      catchError(() => of([]))
    )
    .subscribe(lessons => this.lessonSubject.next(lessons));
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    console.log("Connecting data source");
    return this.lessonSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonSubject.complete();
  }

}