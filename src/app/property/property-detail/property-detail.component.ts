import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet ,Router} from '@angular/router';

import { HousingService } from '../../services/housing.service';
import { Property } from '../../model/property';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { Photo } from '../../model/photo';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:true,
  imports:[RouterOutlet,RouterLink,MatTabsModule,CommonModule,PhotoEditorComponent],
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property:Property = new Property();
  public primaryPhoto:string="";
  public propertyId!: number ;
  currTab:number=0;
  images:string[]=[];
  user:number|null=null;

  @Output()
  mainPhotoChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,private router: Router,private housing:HousingService,private cd:ChangeDetectorRef,private auth:AuthService) { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['Id']);
    const usr = localStorage.getItem('id');
    if(usr){
      this.user = Number(usr);
    };
      // Correctly subscribe to the data provided by the resolver
    this.route.data.subscribe((data) => {
      this.property = data['property'];
    });


    this.route.params.subscribe(
      (params)=>{
        this.propertyId = +params['id']
      }
    )

  this.property!.age = +this.housing.getPropertyAge(this.property!.estPossesionOn);

    this.images= this.getPropertyPhotos();
    console.log(this.property);
console.log(this.propertyId);

  }

  selectTab(a:number){
    this.currTab+=a;
    console.log(this.currTab)
  }
  toggleTab(b:number){
    this.currTab = b;
    console.log(this.currTab)
  }
changePrimaryPhoto(photonew:string){
  this.primaryPhoto = photonew;
  this.mainPhotoChange.emit(this.primaryPhoto);
  this.cd.detectChanges();
}

  getPropertyPhotos(){
    const photoUrl:string[]=[];
    if(this.property?.photos){
      for(const photo of this.property.photos){
        if(photo.isPrimary){
          this.primaryPhoto = photo.imageUrl;
        }
        photoUrl.push(photo.imageUrl);
      }
    }
    return photoUrl;
  }

}
