import { IRoute } from '../../interface/IRoute';
import Images from '../Images/Images';
import Posts from '../Posts/Posts';

export const publicRoutes: IRoute[] = [
  { path: '/images', component: <Images />, exact: false },
  { path: '/posts', component: <Posts />, exact: false },
];
