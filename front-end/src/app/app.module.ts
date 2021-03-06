import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IgxAvatarModule } from "igniteui-angular";

//I keep the new line
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './services/app.service';
import { AuthGuard } from './guards/auth.guard';
import { TaskComponent } from './home/task/task.component';
import { FadeComponent } from './fade/fade.component';
import { SuccessComponent } from './common/success/success.component';
import { FailComponent } from './common/fail/fail.component';
import { RankingComponent } from './ranking/ranking.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { TaskRecurrentComponent } from './view-tasks/task-recurrent/task-recurrent.component';
import { TaskNotRecurrentComponent } from './view-tasks/task-not-recurrent/task-not-recurrent.component';
import { EditComponent } from './view-tasks/edit/edit.component';
import { DeleteComponent } from './view-tasks/delete/delete.component';
import { MenuNavComponent } from './header/menu-nav/menu-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewTaskComponent,
    HeaderComponent,
    TaskComponent,
    FadeComponent,
    SuccessComponent,
    FailComponent,
    RankingComponent,
    ViewTasksComponent,
    TaskRecurrentComponent,
    TaskNotRecurrentComponent,
    EditComponent,
    DeleteComponent,
    MenuNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxAvatarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    AppService,
    AuthGuard,
    FadeComponent
  ],
  entryComponents: [
    SuccessComponent,
    FailComponent,
    EditComponent,
    DeleteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
