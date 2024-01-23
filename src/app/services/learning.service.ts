import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getCategoryWords(id: string): Observable<any> {
    return this._http.get(`${this._apiUrl}api/learn-category/${id}`);
  }
}
