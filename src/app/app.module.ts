import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssociatelistingComponent } from './component/associatelisting/associatelisting.component';
import { AddassociateComponent } from './component/addassociate/addassociate.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { associateReducer } from './Store/Associate/associate.reducer';
import { AssociateEffects } from './Store/Associate/associate.effects';
import { AppEffects } from './Store/Common/app.effect';

@NgModule({
  declarations: [
    AppComponent,
    AssociatelistingComponent,
    AddassociateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ associate: associateReducer }, {}),
    EffectsModule.forRoot([AssociateEffects, AppEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
