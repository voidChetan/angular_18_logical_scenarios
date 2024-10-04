import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { IProduct } from '../../model/product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  @ViewChild('newModal') modal: ElementRef | undefined;

  productSrv = inject(ProductService);

  productList = signal<IProduct[]>([]);

  productObj: IProduct  = new IProduct();

  productForm: FormGroup = new FormGroup({});

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  initializeForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(this.productObj.productId),
      productName: new FormControl(this.productObj.productName,[Validators.required,Validators.minLength(4)]),
      shortName: new FormControl(this.productObj.shortName),
      category: new FormControl(this.productObj.category),
      sku: new FormControl(this.productObj.sku),
      price: new FormControl(this.productObj.price),
      thumbnailImageUrl: new FormControl(this.productObj.thumbnailImageUrl),
      deliveryTimeSpan: new FormControl(this.productObj.deliveryTimeSpan)
    })
  } 

  loadProducts() {
    this.productSrv.getAllProducts().subscribe((res:IProduct[])=>{
      this.productList.set(res)
    })
  }

  openModal() {
    if(this.modal) {
      this.modal.nativeElement.style.display = 'block'
    }
  }
  closeModal() {
    if(this.modal) {
      this.modal.nativeElement.style.display = 'none'
    }
  }

  saveProduct() {
    this.productSrv.saveProdcut(this.productForm.value).subscribe((res:IProduct)=>{
      alert("Product Created");
      this.loadProducts();
      this.closeModal()
    } ,error=>{
      alert("API Error")
    })
  }

  updateProduct() {
    this.productSrv.updateProdcut(this.productForm.value).subscribe((res:IProduct)=>{
      alert("Product Updated");
      this.loadProducts();
      this.closeModal()
    } ,error=>{
      alert("API Error")
    })
  }

  onDelte(id: number) {
    const isConfirm =  confirm('Are You Sure to Delete');
    if(isConfirm){
      this.productSrv.deletProdcut(id).subscribe((res:IProduct)=>{
        alert("Product Delete");
        this.loadProducts();
      } ,error=>{
        alert("API Error")
      })
    } 
  }

  onEdit(id: number) {
    this.productSrv.getSingleProduct(id).subscribe((res:IProduct)=>{
      this.productObj = res;
      this.initializeForm();
      this.openModal();
    } ,error=>{
      alert("API Error")
    })
  }
}
