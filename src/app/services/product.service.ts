import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product, ProductPage} from "../models/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  products! : Array<Product>

  constructor() {
    this.products=[
      { "id": UUID.UUID(), "name": "sandale", "price": 34 ,promotion:true},
      { "id": UUID.UUID(), "name": "sneakers", "price": 55 ,promotion:false},
      { "id": UUID.UUID(), "name": "heels", "price": 75,promotion:false },
      { "id": UUID.UUID(), "name": "boots", "price": 90,promotion:false },
      { "id": UUID.UUID(), "name": "flats", "price": 42,promotion:true },
      { "id": UUID.UUID(), "name": "loafers", "price": 48,promotion:false},
      { "id": UUID.UUID(), "name": "slippers", "price": 25 ,promotion:true},
      { "id": UUID.UUID(), "name": "espadrilles", "price": 30,promotion:false },
      { "id": UUID.UUID(), "name": "oxfords", "price": 65,promotion:false },
      { "id": UUID.UUID(), "name": "flip-flops", "price": 15,promotion:true }
    ]

    for (let i=0;i<10;i++){

            this.products.push(      { "id": UUID.UUID(), "name": "flip-flops", "price": 15,promotion:true })
            this.products.push(       { "id": UUID.UUID(), "name": "heels", "price": 75,promotion:false })
            this.products.push(        { "id": UUID.UUID(), "name": "sandale", "price": 34 ,promotion:true})
            this.products.push(  { "id": UUID.UUID(), "name": "sneakers", "price": 55 ,promotion:false})

    }

  }
  public getAllProducts():Observable<Product[]>{
    let random=Math.random();
    if (random<0.1){
      return throwError(()=>new Error("connexion err"))
    }else {
      return of(this.products);
    }

  }
  public getPageProduct(page:number ,size:number):Observable<ProductPage>{
    let index=page*size
      let totalPages=~~(this.products.length/size);
    if (this.products.length%size!=0){
        totalPages++;
    }
   let pageProducts= this.products.slice(index,index+size)
    return of({products:pageProducts,page:page,size:size,totalPages:totalPages})
  }

  public getProduct(id:string):Observable<Product>{
    let product=this.products.find(p=>p.id===id);
    if(product===undefined){
      return throwError(()=>new Error("product not found"))
    }else{
      return of(product)
    }

  }

  public addProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product)
    return of(product);
  }
  public updateProduct(product:Product):Observable<Product>{
    this.products= this.products.map(p=>(p.id==product.id)?product:p)
    return of(product)
  }

  public deleteProduct(id:string):Observable<boolean>{
   this.products=this.products.filter(p=>p.id!=id);
   return of(true);
  }
  public setPromotion(id:string):Observable<boolean>{
   let product= this.products.find(p=>p.id==id);
   if(product!=undefined){
     product.promotion=!product.promotion
     return of(true)
   }else {
      throwError( ()=>new Error("product not found"))
      return of(false)
   }
  }

  public searchProduct(keyword:string,page:number,size:number):Observable<ProductPage>{

      let results =this.products.filter(p=>p.name.includes(keyword))
      let index=page*size
      let totalPages=~~(results.length/size);
      if (this.products.length%size!=0){
      totalPages++;
        }
      let pageProducts= results.slice(index,index+size)
      return of({products:pageProducts,page:page,size:size,totalPages:totalPages})
  }
  getErrorMsg(name: string, errors: ValidationErrors | null):string {
    if(!(errors) || errors['required']){
      return name+" is required"
    }else if(!(errors) || errors['minlength']){
      return name+" should have at least "+errors['minlength']['requiredLength']+"characters"
    }else if(!(errors) || errors['min']){
      return name+" should have min value "+errors['min']['min'];
    }
    else {
      return ""
    }

  }

}
