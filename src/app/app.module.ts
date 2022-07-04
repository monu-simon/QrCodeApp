import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';
import { QrCodeModule } from 'ng-qrcode';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './ui/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QrCodeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
