import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { HomeComponent } from './ui/home/home.component';
import { QrCodeModule } from 'ng-qrcode';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { NgxColorsModule } from 'ngx-colors';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    QrCodeModule,
    FormsModule,
    NgxColorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
