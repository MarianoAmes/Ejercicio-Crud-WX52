import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {Movie} from '../models/movies.model'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  base_URL = "http://localhost:3000/movies"

  constructor(private http: HttpClient) {  }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
  };

  
handleError(error: HttpErrorResponse){
  if(error.error instanceof ErrorEvent){
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}

createItem(item: any): Observable<Movie>{
  return this.http
    .post<Movie>(this.base_URL, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
}

getList(): Observable<Movie>{
  return this.http
    .get<Movie>(this.base_URL)
    .pipe(retry(2), catchError(this.handleError));
}

getItem(id: string): Observable<Movie> {
  const url = `${this.base_URL}/${id}`;
  return this.http.get<Movie>(url)
    .pipe(retry(2), catchError(this.handleError));
}

updateItem(id: string, item: any): Observable<Movie> {
  return this.http
    .put<Movie>(`${this.base_URL}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
}

deleteItem(id: string): Observable<Movie> {
  const url = `${this.base_URL}/${id}`;
  return this.http
    .delete<Movie>(url, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
}

}
