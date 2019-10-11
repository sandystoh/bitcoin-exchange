import { Injectable } from '@angular/core';
import { Transaction } from '../models/transact';

@Injectable({
  providedIn: 'root'
})
export class TransactService {
  reset = { name: '', contact: '', gender: '', dob: '', orderDate: '', orderType: '', unit: 0, btcAddress: ''};
  currentTransaction: Transaction = { ...this.reset };

  constructor() { }

  resetCurrent() {
    this.currentTransaction = { ...this.reset };
  }

  saveCurrentTransaction(tran: Transaction) {
    this.currentTransaction = tran;
  }

  getCurrentTransaction(): Transaction {
    return this.currentTransaction;
  }

}
