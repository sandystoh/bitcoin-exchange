import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BitcoinService } from './services/bitcoin.service';
import { TransactService } from './services/transact.service';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';
import { WelcomeComponent } from './components/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ConfirmComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BitcoinService, TransactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
