import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule
import { HttpClientModule } from '@angular/common/http'; // Importando HttpClientModule

import { AppComponent } from './app.component';
import { ParticipanteComponent } from './components/participante/participante.component';
import { EventoComponent } from './components/evento/evento.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticipanteComponent,
    EventoComponent,
    RegistroComponent,
    // otros componentes...
  ],
  imports: [
    BrowserModule,
    FormsModule, // Asegúrate de que esto esté aquí
    HttpClientModule, // Mueve esto aquí
    RouterModule.forRoot([
      { path: 'participantes', component: ParticipanteComponent },
      { path: 'eventos', component: EventoComponent },
      { path: 'registros', component: RegistroComponent },
      { path: '', redirectTo: '/participantes', pathMatch: 'full' },
      { path: '**', redirectTo: '/participantes' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
