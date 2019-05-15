import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TowerDefenseComponent } from './tower-defense/tower-defense.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'phaser-game',
      component: PhaserGameComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'profile/:id',
      component: ProfileComponent
    },
    {
      path: 'tower-defense',
      component: TowerDefenseComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
