import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyListComponent } from "../property-list/property-list.component";
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { IProperty } from '../../model/iproperty';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';
import { Ikeyvaluepair } from '../../model/ikeyvaluepair';
import { ButtonsModule } from 'ngx-bootstrap';



@Component({
  standalone:true,
  imports: [FormsModule, CommonModule, PropertyListComponent,RouterLink, MatIconModule,ReactiveFormsModule,MatRadioButton,MatRadioModule,PropertyCardComponent],

  selector: 'app-add-property',
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent implements OnInit {
  alertify:any
  opt: string[] = ['Yes', 'No'];
  currTab:number =0;
  property = new Property()
  cityList: any[]=[];

  propertyTypes!: Ikeyvaluepair[];
  furnishingTypes!:Ikeyvaluepair[];
  propertyForm!:FormGroup;
  constructor(private fb:FormBuilder,private housing:HousingService,private router:Router) { }

  propertyView: IProperty = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    propertyType: null,
    Description: '',
    furnishingType: '',
    bhk: 0,
    builtArea: 0,
    city: '',
    readyToMove: 0,
    image:""
  };
  ngOnInit() {
    this.createProperty()
    this.housing.getAllCities().subscribe(data=>{
      this.cityList = data;
      console.log(data);
    })
    this.housing.getPropertyTypes().subscribe(data=>{
      this.propertyTypes = data;
    })
    this.housing.getFurnishingTypes().subscribe(data=>{
      this.furnishingTypes = data;
    })

  }

  createProperty() {
    this.propertyForm = this.fb.group({
      basic: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        City: [null, Validators.required],
        Name:[null]
      }),

      pricing: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      address: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      details: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      }),photo:this.fb.group({photo:[null]})
      });
  }

  //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.propertyForm.controls['basic'] as FormGroup;
  }

  get PriceInfo() {
    return this.propertyForm.controls['pricing'] as FormGroup;
  }

  get AddressInfo() {
    return this.propertyForm.controls['address'] as FormGroup;
  }

  get OtherInfo() {
    return this.propertyForm.controls['details'] as FormGroup;
  }
// #endregion
  //#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

//#endregion
//#endregion

  onSubmit(Form: any){
    console.log("Form submitted")
    this.mapProperty();

    console.log("propertyform" , this.propertyForm);
    console.log("property" , this.property);
    this.housing.addProperty(this.property)
    console.log("congrats form submitted")
    if(this.property.sellRent==2){
      alertify.success("Congrats, Property listed for rent")
      this.router.navigate(['/rent'])
    }else{
      alertify.success("Congrats, Property listed to sell")
      this.router.navigate(['/'])
    }
  }


  mapProperty(): void{
    this.property.id = this.housing.newPropID();
    this.property.sellRent  = +this.propertyForm.value.basic.SellRent,
    this.property.furnishingType = this.propertyForm.value.basic.FType,
    this.property.name = this.propertyForm.value.basic.Name,
    this.property.price = this.propertyForm.value.pricing.Price,
    this.property.address = this.propertyForm.value.address.Address,
    this.property.builtArea = this.propertyForm.value.pricing.BuiltArea,
    this.property.bhk = this.propertyForm.value.basic.BHK,
    this.property.propertyType = this.propertyForm.value.basic.PType,
    this.property.city = this.propertyForm.value.basic.City,
    this.property.maintenance = this.propertyForm.value.pricing.Maintenance,
    this.property.security = this.propertyForm.value.pricing.Security,
    this.property.carpetArea = this.propertyForm.value.pricing.CarpetArea,
    this.property.floorNo = this.propertyForm.value.address.FloorNo,
    this.property.totalFloors = this.propertyForm.value.address.TotalFloor,
    this.property.readyToMove = this.propertyForm.value.details.RTM,
    this.property.estPossesionOn = this.propertyForm.value.details.Possession,
    this.property.age = this.propertyForm.value.details.AOP,
    this.property.gated = this.propertyForm.value.details.Gated,
    this.property.description = this.propertyForm.value.details.Description

  }
  selectTab(a:number){
    this.currTab+=a;
    console.log(this.currTab)
  }
  toggleTab(b:number){
    this.currTab = b;
    console.log(this.currTab)
  }


}
