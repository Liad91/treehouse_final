import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterializeModule } from 'ng2-materialize';

import * as Components from './components';
import * as Directives from './directives';
import * as Pipes from './pipes';
@NgModule({
  declarations: [
    Components.AlertModalComponent,
    Components.BtnFavoriteComponent,
    Components.LightboxModalComponent,
    Components.PlaceComponent,
    Components.PriceComponent,
    Components.StarsComponent,
    Components.TypedComponent,
    Components.TabsComponent,
    Components.TabItemComponent,
    Components.CuisinesModalComponent,
    Directives.ColorDirective,
    Directives.BackgroundColorDirective,
    Directives.ImagePreviewDirective,
    Directives.SidenavButtonDirective,
    Directives.TooltipDirective,
    Pipes.DayPipe,
    Pipes.HourPipe,
    Pipes.SearchFilterPipe
  ],
  entryComponents: [
    Components.AlertModalComponent,
    Components.LightboxModalComponent,
    Components.CuisinesModalComponent
  ],
  imports: [
    CommonModule,
    MaterializeModule.forRoot()
  ],
  exports: [
    CommonModule,
    MaterializeModule,
    Components.AlertModalComponent,
    Components.BtnFavoriteComponent,
    Components.LightboxModalComponent,
    Components.PlaceComponent,
    Components.PriceComponent,
    Components.StarsComponent,
    Components.TypedComponent,
    Components.TabsComponent,
    Components.TabItemComponent,
    Directives.BackgroundColorDirective,
    Directives.ColorDirective,
    Directives.ImagePreviewDirective,
    Directives.SidenavButtonDirective,
    Directives.TooltipDirective,
    Pipes.DayPipe,
    Pipes.HourPipe,
    Pipes.SearchFilterPipe
  ]
})
export class SharedModule { }
