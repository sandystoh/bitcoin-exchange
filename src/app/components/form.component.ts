import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Transaction } from '../models/transact';
import * as moment from 'moment';
import { BitcoinService } from '../services/bitcoin.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  transactForm: FormGroup;
  model: Transaction = {
    name: '',
    contact: '',
    gender: '',
    dob: '',
    orderDate: '',
    orderType: '',
    unit: null,
    btcAddress: ''
  };
  startDate: any;
  bitcoin = {ask: 0, bid: 0};
  transactionAmount = 0;

  constructor(private formBuilder: FormBuilder, private btcSvc: BitcoinService) {
    this.transactForm = this.createFormGroup();
    this.transactForm.get('orderDate').setValue(new Date());
    this.transactForm.get('orderType').setValue('Buy');
    this.startDate = moment();

    this.btcSvc.getPrice().then((result) => { console.log(result); this.bitcoin = result; });
  }

  ngOnInit() {

  }

  get f() { return this.transactForm.controls; }

  createFormGroup() {
     return new FormGroup({
      name: new FormControl(''), // ('', [Validators.required]),
      contact: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl('', [Validators.required, this.ageValidator(21)]),
      orderDate: new FormControl(''),
      orderType: new FormControl(''),
      unit: new FormControl(''),
      btcAddress: new FormControl(''),
    });
  }

  ageValidator(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const age = moment().diff(control.value, 'years');
      console.log('age', age);
      return age < min ? {ageValidation: {value: control.value}} : null;
    };
  }

  calculatePrice($event) {
    console.log($event.target.value);
    const rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    this.transactionAmount = $event.target.value * rate;
  }

  cancel() {
    this.transactForm.reset();
  }

  onSubmit() {
    console.log('Submitted', this.transactForm.value);
    const age = moment().diff(this.transactForm.value.dob, 'years');
    console.log('age', age);
  }
}
