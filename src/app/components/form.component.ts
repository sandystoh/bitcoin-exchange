import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Transaction } from '../models/transact';
import * as moment from 'moment';
import { BitcoinService } from '../services/bitcoin.service';
import { TransactService } from '../services/transact.service';
import { Router } from '@angular/router';

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
  rate = 0;
  transactionAmount = 0;

  constructor(private formBuilder: FormBuilder, private btcSvc: BitcoinService,
              private transSvc: TransactService, private router: Router) {
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
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.pattern('^[8-9][0-9]{7}$')]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required, this.ageValidator(21)]),
      orderDate: new FormControl('', [Validators.required]),
      orderType: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      btcAddress: new FormControl('', [Validators.required]),
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
    this.rate = (this.transactForm.value.orderType === 'Buy') ? this.bitcoin.ask : this.bitcoin.bid;
    this.transactionAmount = $event.target.value * this.rate;
  }

  cancel() {
    this.transactForm.reset();
  }

  onSubmit() {
    console.log('Submitted', this.transactForm.value);
    const val = this.transactForm.value;
    const save: Transaction = {
      name: val.name,
      contact: val.contact,
      gender: val.gender,
      dob: val.dob,
      orderDate: val.orderDate,
      orderType: val.orderType,
      unit: val.unit,
      btcAddress: (val.orderType === 'Buy') ? val.btcAddress : null,
      rate: this.rate,
      total: this.transactionAmount
    };
    console.log('Saved', save);
    this.transSvc.saveCurrentTransaction(save);
    console.log('in service from form', this.transSvc.getCurrentTransaction());
    this.router.navigate(['/confirm']);
  }
}
