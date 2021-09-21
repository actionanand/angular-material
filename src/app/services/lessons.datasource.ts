import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { catchError, finalize } from "rxjs/operators";

import { Lesson } from "../model/lesson";
import { CoursesService } from "./courses.service";


export class LessonsDataSource implements DataSource<Lesson> {

  private lessonSubject = new BehaviorSubject<Lesson[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private courseServ: CoursesService) {

  }

  loadLessons(courseID: number, filter: string, sortDirection: string, pageIndex:number, pageSize: number) {
    this.loadingSubject.next(true);
    this.courseServ.findLessons(courseID, filter, sortDirection, pageIndex, pageSize)
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(lessons => this.lessonSubject.next(lessons));
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    console.log("Connecting data source");
    return this.lessonSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonSubject.complete();
    this.loadingSubject.complete();
  }

}