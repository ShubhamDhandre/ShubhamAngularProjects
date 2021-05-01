import { Component } from '@angular/core';
import { ProgressService } from 'src/app/Shared/services/progress/progress.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mode='indeterminate';

  title = 'E-Shop';
 

  //<mat-progress-bar [mode]="mode" [value]='value' ></mat-progress-bar>
 

  value=0;
  constructor(private loading:ProgressService)
   {
  //   this.loading.loaderObservable.subscribe(
  //     (result)=>
  //     {
  //       this.mode=(result)?'indeterminate' :'determinate'
  //     }
  //   )
  }

  
}
