import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, input, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IPropertyBase } from '../../model/ipropertybase';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { FilterPipe } from '../../Pipes/filter.pipe';
import { SortPipe } from '../../Pipes/sort.pipe';
import { FormsModule } from '@angular/forms';
import { Property } from '../../model/property';

@Component({
  standalone:true,
  selector: 'app-property-list',
  imports: [RouterOutlet, RouterLink, CommonModule, PropertyCardComponent,FilterPipe,SortPipe,FormsModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent =1;
    pp:Property[]=[];
    properties: IPropertyBase[] = [];
    today = new Date();
    City =''
    SelectedCity=''
    Order='asc'
    sortParam=''
    cities:any[]=[];

  constructor(private route: ActivatedRoute  ,private housing:HousingService ,private cd:ChangeDetectorRef ) { }

  ngOnInit() {
      if(this.route.snapshot.url.toString()){
        this.SellRent =2;
      }
      this.housing.getAllProperties(this.SellRent).subscribe(
        data=>{
          this.properties = data;
          console.log(data);
          console.log(this.properties);
          const newPropString = localStorage.getItem('newProp');
          const newProperty = newPropString ? JSON.parse(newPropString) : null;

          if(newProperty.SellRent == this.SellRent){
            this.properties = [newProperty,...this.properties]
          }
        }
      )

      this.housing.getAllCities().subscribe(data=>{
        this.cities = data;
        console.log(data);
        this.cd.detectChanges();
      })

  }
  onCity(city:string){
    this.SelectedCity = city
    this.cd.detectChanges();

    // console.log(this.SelectedCity);
  }
  onCityClear(){
    this.SelectedCity=''
    this.City=''
  }

  onToggle(){
    if(this.Order==='asc'){
      this.Order ='desc'
    }else if(this.Order==='desc'){
      this.Order ='asc'
    }else{
      this.Order=''
    }
  }

}
