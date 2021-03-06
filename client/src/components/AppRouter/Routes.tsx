import { IRoute } from '../../interface/Route/IRoute';

import Images from '../Images/Images';
import Posts from '../Posts/Posts';

/**
 * The array with all public routes of the app.
 */
export const publicRoutes: IRoute[] = [
  { path: '/images', component: <Images />, exact: false },
  { path: '/posts', component: <Posts />, exact: false },
];
