import {Routes} from '@angular/router';
import {AppLayout} from '@/layout/components/app.layout';
import {ListComponent} from '@/list/list.component';
import {FollowUpsComponent} from "@/follow-ups/follow-ups.component";

export const appRoutes: Routes = [

  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'followups',
        component: FollowUpsComponent
      }
    ]
  }
];
