import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productFormGroup!:FormGroup;
  productId!:string;
  currentProduct!:Product
  constructor(public productService:ProductService,private route:ActivatedRoute,private fb:FormBuilder,private router:Router) {
  this.productId=this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next:(data)=>{
        this.currentProduct=data
        this.productFormGroup=this.fb.group({
          name:this.fb.control(this.currentProduct.name,[Validators.required,Validators.minLength(5)]),
          price:this.fb.control(this.currentProduct.price,[Validators.required,Validators.min(200)]),
          promotion:this.fb.control(this.currentProduct.promotion,[Validators.required])
        })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  handleEditProduct() {
  let p=this.productFormGroup.value
    p.id=this.productId
    this.productService.updateProduct(p).subscribe({
      next:(data)=>{
        alert("product updatet")
        this.router.navigateByUrl("/admin/products")


      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
