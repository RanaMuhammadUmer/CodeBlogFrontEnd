import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../Model/Category.model';
import { CategoryService } from '../Services/Category.Service';
import { Subscription } from 'rxjs';
import { UpdateCategoryRequest } from '../Model/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id?: string;
  category?: Category;
  getCategoryByIdSub?: Subscription;
  updateCategorySub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id'];

      this.getCategoryByIdSub = this.categoryService
        .GetCategoryById(this.id!)
        .subscribe((data) => {
          this.category = data;
        });
    });
  }

  ngOnDestroy(): void {
    this.getCategoryByIdSub?.unsubscribe();
    this.updateCategorySub?.unsubscribe();
  }

  onSubmit() {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    this.updateCategorySub = this.categoryService
      .UpdateCategory(this.id!, updateCategoryRequest)
      .subscribe((Response) => {
        this.router.navigateByUrl('/admin/categories');
      });
  }

  OnDelete() {
    this.categoryService.DeleteCategory(this.id!).subscribe(() => {
      this.router.navigateByUrl('/admin/categories');
    });
  }
}
