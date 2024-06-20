import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Model/Category.model';
import { environment } from 'src/environments/environment';
import { AddCategoryRequest } from '../Model/add-category-request.model';
import { UpdateCategoryRequest } from '../Model/update-category-request.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  AddCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.Baseurl}/api/categories`, model);
  }

  GetCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.Baseurl}/api/categories`);
  }

  GetCategoryById(Id:string):Observable<Category>{
    return this.http.get<Category>(`${environment.Baseurl}/api/categories/${Id}`)
  }

  UpdateCategory(Id:string, UpdateCategoryRequestModel:UpdateCategoryRequest):Observable<Category>
  {
    return this.http.put<Category>(`${environment.Baseurl}/api/categories/${Id}`,UpdateCategoryRequestModel);
  }

  DeleteCategory(Id:string):Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.Baseurl}/api/categories/${Id}`);
  }
}
