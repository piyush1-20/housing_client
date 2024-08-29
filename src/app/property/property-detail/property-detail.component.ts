import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet ,Router} from '@angular/router';

import { HousingService } from '../../services/housing.service';
import { Property } from '../../model/property';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[RouterOutlet,RouterLink,MatTabsModule,CommonModule],
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number =  1;
  property:Property |undefined = new Property()
  currTab:number=0;

  constructor(private route: ActivatedRoute,private router: Router,private housing:HousingService) { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['Id']);

  // Correctly subscribe to the data provided by the resolver
  this.route.data.subscribe((data) => {
    console.log(data)
    this.property = data['property'];
  });


    this.route.params.subscribe(
      (params)=>{
        this.propertyId = +params['id']
      }
    )

    this.property!.age = this.housing.getPropertyAge(this.property!.estPossesionOn);
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
