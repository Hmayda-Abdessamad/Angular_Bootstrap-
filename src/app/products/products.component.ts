import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

    products!:Product[]
    errMSG!:String;
    searchFormGroup!:FormGroup
    curentPage:number=0;
    sizePage:number=5
    totalPages:number=0
    curentAction:string="all"
    constructor(private ProductService:ProductService,private fb:FormBuilder,public authService:AuthenticationService) {
      this.searchFormGroup=this.fb.group({
        keyword:null
      })
    }
     ngOnInit(): void {

      //this.getAllproduct()
       this.getPageProducts()

  }
      getAllproduct(){
        this.ProductService.getAllProducts().subscribe({
      next:(data=>{
        this.products=data;
      }),
      error:(err=>{
        this.errMSG=err;
      })
    });
  }
      getPageProducts( ){
      this.ProductService.getPageProduct(this.curentPage,this.sizePage).subscribe({
      next:(data=>{
        this.products=data.products;
        this.totalPages=data.totalPages;

      }),
      error:(err=>{
        this.errMSG=err;
      })
    });
  }
      handledeleteProduct(produit: Product) {
      let conf=confirm("Are you sure");
      if(conf==false) {
        return
      }else {
        this.ProductService.deleteProduct(produit.id).subscribe({
          next:(data)=>{
            let index=this.products.indexOf(produit);
            this.products.splice(index,1)
          }
        })
      }

  }
      setPromotion(p: Product) {
      let promo=p.promotion
    this.ProductService.setPromotion(p.id).subscribe({
      next:(data=>{
          p.promotion=!promo
      }),
      error:(err=>{
        this.errMSG=err
      })
    })
  }
      handleSearchProducts() {
      this.curentAction="search"
      let keyword=this.searchFormGroup.value.keyword;
        this.ProductService.searchProduct(keyword,this.curentPage,this.sizePage).subscribe({
          next:(data)=>{
            this.products=data.products
            this.totalPages=data.totalPages

          }
        })
      }

  goToPage(i: number) {
    this.curentPage=i;
    if(this.curentAction==="all")
      this.getPageProducts()
    else
      this.handleSearchProducts()
  }
}
