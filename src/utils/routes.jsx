import { CakePage, Dashboard, Locations, Logout, } from "../pages";

export const routes = [
  {
    id: 1,
    path: '/',
    component: <Dashboard />
  },
  {
    id: 2,
    path: '/cakes',
    component: <CakePage />
  },
  // {
  //   id: 3,
  //   path: '/users',
  //   component: <Users />
  // },

  {
    id: 4,
    path: '/logout',
    component: <Logout />
  },
  {
    id: 5,
    path: '*',
    component: <Dashboard />
  },
  {
    id: 6,
    path: '/locations',
    component: <Locations />
  },


]