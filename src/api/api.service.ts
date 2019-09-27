import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";

@Injectable()
export class ApiService {
  url: string = "https://api.spacexdata.com/v2/launches";
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}

export interface ApiResponse {
  // icon_url: string;
  // id: string;
  // url: string;
  // value: string;
}
