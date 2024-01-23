import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getList(page: number = 1): Observable<any> {
    return this._http.get(`${this._apiUrl}api/word-categories?page=${page}`);
  }

  create(name: string): Observable<any> {
    return this._http.post(`${this._apiUrl}api/word-categories`, {
      'name': name
    });
  }

  update(id: string, name: string): Observable<any> {
    return this._http.put(`${this._apiUrl}api/word-categories/${id}`, {
      'name': name
    });
  }

  show(id: string): Observable<any> {
    return this._http.get(`${this._apiUrl}api/word-categories/${id}`);
  }

  getCategoryWords(id: string, page: number = 1): Observable<any> {
    return this._http.get(`${this._apiUrl}api/word-categories/${id}/words`);
  }

  delete(ids: []): Observable<any> {
    return this._http.delete(`${this._apiUrl}api/word-categories?ids=` + ids.join(','));
  }
}
