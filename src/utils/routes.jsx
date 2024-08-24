import { Buildings, Clients, Dashboard, Floor, Locations, Logout, } from "../pages";
import Home from "../pages/home";

export const routes =[
  {
    id: 1,
    path: '/',
    component: <Dashboard/>
  },
  {
    id: 2,
    path: '/clients',
    component: <Clients/>
  },
  {
    id: 3,
    path: '/buildings',
    component: <Buildings/>
  },
  {
    id: 4,
    path: '/logout',
    component: <Logout/>
  },
  {
    id: 5,
    path: '*',
    component: <Dashboard/>
  },
  {
    id: 6,
    path: '/locations',
    component: <Locations/>
  },
  {
    id: 6,
    path: '/floor',
    component: <Floor/>
  },
  {
    id: 7,
    path: '/home',
    component: <Home/>
  },

]