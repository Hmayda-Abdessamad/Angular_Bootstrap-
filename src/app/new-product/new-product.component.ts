import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  productFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,public productService:ProductService,private router:Router) {
  }
  ngOnInit(): void {
    this.productFormGroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(5)]),
      price:this.fb.control(null,[Validators.required,Validators.min(200)]),
      promotion:this.fb.control(false,[Validators.required])
    })
  }


  handleAddProduct() {
    let product=this.productFormGroup.value
    this.productService.addProduct(product).subscribe({
      next:(data)=>{
        alert("product added ")
        this.productFormGroup.reset()
        this.router.navigateByUrl("/admin/products")
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}
