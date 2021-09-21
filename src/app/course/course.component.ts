import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, timeout} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { LessonsDataSource } from '../services/lessons.datasource';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;
    dataSource: LessonsDataSource;
    displayedColumns = ['seqNo', 'description', 'duration'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
                private coursesServ: CoursesService) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];
        this.dataSource = new LessonsDataSource(this.coursesServ);
        this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 3);
    }

    // searchLessons(search = '') {
    //   this.dataSource.filter = search.toLocaleLowerCase().trim();
    // }

    ngAfterViewInit() {
      // changing page index as 0 when sorting happens
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      // trigerring call for both sort and page change
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith(<string>null),
        tap(() => {
          this.dataSource.loadLessons(this.course.id, '', this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        })
      )
      .subscribe();
    }


}
