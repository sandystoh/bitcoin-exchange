import { Component, OnInit } from '@angular/core';
import { TransactService } from '../services/transact.service';
import { Router } from '@angular/router';
import { Transaction } from '../models/transact';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  tr: any;

  constructor(private transSvc: TransactService, private router: Router) { }

  ngOnInit() {
    this.tr = this.transSvc.getCurrentTransaction();
  }

}
