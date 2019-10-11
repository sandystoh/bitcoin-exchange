import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  transactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.transactForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  get f() { return this.transactForm.controls; }

  createFormGroup() {
     return new FormGroup({
      name: new FormControl(''), // ('', [Validators.required]),
      contact: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
      orderDate: new FormControl(''),
      orderType: new FormControl(''),
      btcAddress: new FormControl(''),
    });
  }

  cancel() {
    this.transactForm.reset();
  }

  onSubmit() {
    console.log('Submitted');
  }
}
