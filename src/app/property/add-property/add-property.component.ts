import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyListComponent } from "../property-list/property-list.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { IProperty } from '../../model/iproperty';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';
import { Ikeyvaluepair } from '../../model/ikeyvaluepair';
import { AlertifyService } from '../../services/alertify.service';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Component({
  standalone:true,
  imports: [FormsModule, CommonModule, PropertyListComponent,RouterLink, MatIconModule,ReactiveFormsModule,MatRadioButton,MatRadioModule,PropertyCardComponent,PhotoEditorComponent],

  selector: 'app-add-property',
  providers: [provideNativeDateAdapter(),DatePipe],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent implements OnInit {
  selectedFile:File|null=null;
  nextClicked:boolean =false;
  currTab:number =0;
  property:Property = new Property()
  cityList: any[]=[];
  tabsArray=["BasicInfo","PriceInfo","AddressInfo","OtherInfo"]
  propertyTypes!: Ikeyvaluepair[];
  furnishingTypes!:Ikeyvaluepair[];
  propertyForm!:FormGroup;
  showError: boolean=false;
  imageUrl:any;

  constructor(private route: ActivatedRoute,
    private http:HttpClient,
    private fb:FormBuilder,
    private housing:HousingService,
    private router:Router,
    private cd: ChangeDetectorRef,
    private datePipe :DatePipe,
    private alertify:AlertifyService) { }


  propertyView: IProperty = {
    id: 0,
    name: '',
    price: 0,
    sellRent: 0,
    propertyType: '',
    Description: '',
    furnishingType: '',
    bhk: 0,
    builtArea: 0,
    city: '',
    readyToMove: false,
    photo: "",
    estPossesionOn: null
  };
  ngOnInit() {
    const ml= localStorage.getItem('email')
    if(!ml){
      console.log('You must login before adding a property')
      this.alertify.error('You must login before adding a property');
      this.router.navigate(['/login']);
    }
    this.createProperty();

    this.housing.getAllCities().subscribe(data=>{
      this.cityList = data;
      console.log(data);
      this.cd.detectChanges();
    })
    this.housing.getPropertyTypes().subscribe(data=>{
      this.propertyTypes = data;
      console.log(data);
      this.cd.detectChanges();

    })
    this.housing.getFurnishingTypes().subscribe(data=>{
      this.furnishingTypes = data;
      console.log(data);
      this.cd.detectChanges();
    })

    // this.route.data.subscribe((data) => {
    //   this.property = data['property'];
    // });
    this.property.id = this.housing.newPropID();
    console.log(this.route)
  }

  createProperty() {
    this.propertyForm = this.fb.group({
      basic: this.fb.group({
        SellRent: [null , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        City: [null, Validators.required],
        Name:[null,Validators.required]
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
        Address2: [null,Validators.required],
      }),

      details: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null,Validators.required],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null,Validators.required]
      }),
      photo:[null]
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

  get NameControl() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get CityControl() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get PriceControl() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltAreaControl() {
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
  get Landmark(){
    return this.AddressInfo.controls['Address2'] as FormControl;
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

  // onSubmit(Form: any){
  //     this.nextClicked = true;
  //     if(this.allTabsValidity()){
  //       this.mapProperty();
  //       console.log(this.property);
  //       this.housing.addProperty(this.property).subscribe(
  //         ()=>{
  //             console.log("congrats form submitted")
  //             if(this.property.sellRent==2){
  //               alertify.success("Congrats, Property listed for rent")
  //               this.router.navigate(['/rent'])
  //             }else{
  //               alertify.success("Congrats, Property listed to sell")
  //               this.router.navigate(['/'])
  //             }
  //         }
  //     );
  //     }
  // }
  onSubmit(Form: any) {
    this.nextClicked = true;
    if (this.allTabsValidity()) {
      this.mapProperty();
      this.housing.addProperty(this.property).subscribe(
        (response: any) => {
          // Assuming response contains the newly created property ID
          const propId = response.id; // Adjust based on actual response structure
          console.log(response);
          console.log(propId);
          if (this.selectedFile) {
            this.uploadPhoto(propId, this.selectedFile).subscribe((photoUrl: string) => {
              // Update the property with the photo URL or identifier
              this.property.photo = photoUrl;

              // Proceed with navigation or further processing
              if (this.property.sellRent == 2) {
                alertify.success("Congrats, Property listed for rent");
                this.router.navigate(['/rent']);
              } else {
                alertify.success("Congrats, Property listed to sell");
                this.router.navigate(['/']);
              }
            });
          } else {
            // No photo to upload, proceed with navigation or further processing
            if (this.property.sellRent == 2) {
              alertify.success("Congrats, Property listed for rent");
              this.router.navigate(['/rent']);
            } else {
              alertify.success("Congrats, Property listed to sell");
              this.router.navigate(['/']);
            }
          }
        },
        (error) => {
          alertify.error("Error submitting property");
        }
      );
    }
  }

  uploadPhoto(propId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', propId.toString());
    return this.housing.addPropertyPhoto(formData,propId);
    // return this.http.post<string>('https://localhost:44334/api/Property/add', formData); // Adjust URL and response type as needed
  }

  mapProperty(): void{
    // this.property.id = this.housing.newPropID();
    this.property.sellRent  = +this.SellRent.value,
    this.property.furnishingTypeId = +this.FType.value,
    this.property.name = this.NameControl.value,
    this.property.price = +this.PriceControl.value,
    this.property.address = this.Address.value,
    this.property.builtArea = +this.BuiltAreaControl.value,
    this.property.bhk = +this.BHK.value,
    this.property.propertyTypeId = +this.PType.value,
    this.property.cityId = +this.CityControl.value,
    this.property.maintenance = +this.Maintenance.value,
    this.property.security = +this.Security.value,
    this.property.carpetArea = +this.CarpetArea.value,
    this.property.floorNo = +this.FloorNo.value,
    this.property.totalFloors = +this.TotalFloor.value,
    this.property.readyToMove = this.RTM.value === 'true';
    this.property.estPossesionOn =this.PossessionOn.value
    ? new Date(this.PossessionOn.value):new Date(),
    this.property.gated = this.Gated.value === 'true';
    this.property.description = this.Description.value,
    this.property.mainEntrance = this.MainEntrance.value,
    this.property.address2 = this.Landmark.value;
    if (this.selectedFile) {
      // Here you could set the photo URL or upload it and set the URL
      // For example, you might upload the file and get a URL back:
      // this.uploadPhoto(this.selectedFile).subscribe(photoUrl => {
      //   this.property.photo = photoUrl;
      // });
      // For now, let's just use the file name or some placeholder logic
      this.property.photo = this.selectedFile.name; // or use some placeholder logic
    }

  }
  allTabsValidity():boolean{
    if(this.BasicInfo.invalid){
      this.currTab = 0;
      return false;
    }
    if(this.PriceInfo.invalid){
      this.currTab=1;
      return false;
    }
    if(this.AddressInfo.invalid){
      this.currTab=2;
      return false;
    }
    if(this.OtherInfo.invalid){
      this.currTab=3;
      return false;
    }
    return true;
  }
  selectTab(a:number){
    this.nextClicked =true;
    if(this.isCurrentTabValid()){
      this.showError=false;
      this.currTab+=a;
      this.nextClicked=false;
    }

  }


  toggleTab(b: number) {
    if (this.isCurrentTabValid()) {
      this.currTab = b;
      this.showError = false;
    } else {
      this.showError = true;
    }
    console.log(this.currTab);
  }


  isCurrentTabValid(): boolean {
    switch (this.currTab) {
      case 0:
        return this.BasicInfo.valid;
      case 1:
        return this.PriceInfo.valid;
      case 2:
        return this.AddressInfo.valid;
      case 3:
        return this.OtherInfo.valid;
      case 4:
        return true;
      default:
        return false;
    }
  }
  onPossessionDateChange(d:string ) {
    const k = new Date(d);
    return k;
  }

  onCityChange(selectedValue: string) {
    if (selectedValue) {
      const selectedCity = this.cityList.find(city => city.id == selectedValue);
      this.propertyView.city = selectedCity ? selectedCity.name : '';
    } else {
      this.propertyView.city = ""; // No valid city selected
    }
  }
  updatePossession(d:string){
    return d?new Date(d):null;
  }
  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }


}
