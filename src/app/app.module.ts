import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from './database.service';
import { FormsModule } from '@angular/forms';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';
import { HttpClientModule } from '@angular/common/http';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ActortomovieComponent } from './actortomovie/actortomovie.component';
import { ViewsnotfoundComponent } from './viewsnotfound/viewsnotfound.component';

const week10Routes: Routes = [
  {path: 'addactor', component: AddactorComponent},
  {path: 'addmovie', component: AddmovieComponent},
  {path: 'listactors', component: ListactorsComponent},
  {path: 'listmovies', component: ListmoviesComponent},
  {path: 'deleteactor', component: DeleteactorComponent},
  {path: 'updateactor', component: UpdateactorComponent},
  {path: 'deletemovie', component: DeletemovieComponent},
  {path: 'actortomovie', component: ActortomovieComponent},
  {path: '', redirectTo: "listactors", pathMatch: "full"},
  {path: '404', component: ViewsnotfoundComponent},
  {path: '**', redirectTo: '/404'}

];


@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    AddmovieComponent,
    ListactorsComponent,
    ListmoviesComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    DeletemovieComponent,
    ActortomovieComponent,
    ViewsnotfoundComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(week10Routes, {useHash: true}), FormsModule, HttpClientModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
