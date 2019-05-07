import { ScoreService } from './score.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApiService } from './api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    TitlebarComponent,
    PhaserGameComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule
  ],
  providers: [ApiService, ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
