import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ListadoAlumnosComponent } from '../alumnos/listado-alumnos/listado-alumnos.component';
import { AlumnoService } from '../servicios/alumno.service';

import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    MomentModule
  ],
  declarations: [Tab2Page, ListadoAlumnosComponent]
})
export class Tab2PageModule {}
