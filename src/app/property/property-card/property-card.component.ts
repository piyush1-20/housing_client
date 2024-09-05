import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProperty } from '../../model/iproperty';
import { IPropertyBase } from '../../model/ipropertybase';
@Component({

  standalone:true,
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  imports:[CommonModule,RouterLink],
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input()
  property!: IPropertyBase;
  @Input()
  hideIcons: boolean = false;
  

  constructor() { }

  ngOnInit() {
  }




}
