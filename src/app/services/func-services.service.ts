import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncServicesService {

  constructor() { }

  public status:boolean = true;

  public addToggle():void {
    //this.status = !this.status;
  }

}
