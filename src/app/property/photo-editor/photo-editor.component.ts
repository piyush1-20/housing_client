import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { Property } from '../../model/property';
import { CommonModule } from '@angular/common';
import { HousingService } from '../../services/housing.service';
import { Photo } from '../../model/photo';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  imports:[CommonModule,FileUploadModule],
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
  standalone:true
})
export class PhotoEditorComponent implements OnInit {
  private base_url = environment.apiUrl;
  @Input()
  property!: Property;
  @Output() mainPhotoChangeEvent = new EventEmitter<string>();
  uploader!: FileUploader;
  maxAllowedFileSize = 10*1024*1024;
  //in bytes
  constructor(private housing:HousingService,private cd:ChangeDetectorRef) { }

  initializeFileUploader(){
    this.uploader = new FileUploader({
      url:this.base_url + "/Property/add/photo/" +this.property.id,
      authToken: 'Bearer '+ localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:true,
      maxFileSize:this.maxAllowedFileSize
    });

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials =false;
    }

    this.uploader.onSuccessItem = (item,response,status,headers)=>{
      if(response){
        const photo = JSON.parse(response);
        this.property.photos?.push(photo);
      }
      console.log(response);
    }
  }

  ngOnInit() {
    this.initializeFileUploader();
  }
  mainPhotoChange(url:string){
      this.mainPhotoChangeEvent.emit(url);
  }

  setPrimaryPhoto(propId:number,photo:Photo){
    this.housing.setPrimaryPhoto(propId,photo.publicId).subscribe(()=>{
      this.mainPhotoChange(photo.imageUrl);
      this.property.photos?.forEach(p=>{
        if(p.isPrimary){p.isPrimary=false;}
        if(p.publicId===photo.publicId) { p.isPrimary=true;}
      })
    })
  }

  deletePhoto(propId: number, photo: Photo) {
    this.housing.deletePhoto(propId, photo.publicId).subscribe(() => {
      this.property.photos = this.property.photos?.filter(p => p.publicId !== photo.publicId);
      this.cd.detectChanges(); // This ensures that Angular recognizes the changes
    });
  }



}
