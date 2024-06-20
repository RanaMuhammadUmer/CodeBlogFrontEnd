import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../Model/add-category-request.model';
import { CategoryService } from '../Services/Category.Service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model!: AddCategoryRequest;
  addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router:Router) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  categoryFormSubmit() {
   this.addCategorySubscription =  this.categoryService.AddCategory(this.model).subscribe({
      next:()=>{
        this.router.navigateByUrl("/admin/categories")
      }
    });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
