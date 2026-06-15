import {Routes} from '@angular/router';
import {AppLayout} from '@/layout/components/app.layout';
import {ListComponent} from '@/list/list.component';

export const appRoutes: Routes = [

  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];
