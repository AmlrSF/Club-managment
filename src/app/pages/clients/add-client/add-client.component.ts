import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  public addClient!: FormGroup;

  constructor(private fb: FormBuilder, private clientS: ClientsService) { }

  ngOnInit() {
    this.addClient = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submitForm() {
    // Handle form submission logic here
    if (this.addClient.valid) {
      console.log('Form submitted:', this.addClient.value);


      const newClientData = this.addClient.value;

      this.clientS.addClient(newClientData).subscribe(
        (addedClient) => {
          console.log('Client added successfully:', addedClient);
          

          this.addClient.reset();
        },
        (error) => {
          console.error('Error adding client:', error);
          // Handle error, show a user-friendly message, etc.
        }
      );


    } else {

      console.log('Form has validation errors');
    }
  }
}
