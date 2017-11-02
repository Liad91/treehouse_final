import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { PlacesComponent } from './places.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { FiltersComponent } from './filters/filters.component';
import { CuisinesModalComponent } from './filters/cuisines-modal/cuisines-modal.component';
import { PaginationComponent } from './pagination/pagination.component';

// Guards
import { PlaceDetailGuard } from './place-detail/place-detail.guard';

// Modules
import { PlacesRoutesModule } from './places.routes.module';
import { SharedModule } from './../shared/shared.module';

// Store
import { effects } from './store/places.effects';
import { placeListReducer } from './place-list/store/place-list.reducers';
import { placeDetailReducer } from './place-detail/store/place-detail.reducers';

@NgModule({
  declarations: [
    PlacesComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    FiltersComponent,
    CuisinesModalComponent,
    PaginationComponent
  ],
  entryComponents: [
    CuisinesModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AgmCoreModule,
    PlacesRoutesModule,
    SharedModule,
    StoreModule.forFeature('placeList', placeListReducer),
    StoreModule.forFeature('placeDetail', placeDetailReducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    GoogleMapsAPIWrapper,
    PlaceDetailGuard
  ]
})
export class PlacesModule { }
