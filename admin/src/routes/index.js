import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const CreateAdmin = lazy(() => import('../pages/CreateAdmin'));
const AdminDetail = lazy(() => import('../pages/AdminDetail'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const ClassPage = lazy(() => import('../pages/ClassPage'));
const UserDetail = lazy(() => import('../pages/UserDetail'));
const ClassDetail = lazy(() => import('../pages/ClassDetail'));

const routes = [
  {
    path: 'dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: 'admins', // the url
    component: AdminPage, // view rendered
  },
  {
    path: 'admins/create', // the url
    component: CreateAdmin,
  },
  {
    path: 'admins/:id', // the url
    component: AdminDetail, // view rendered
  },
  {
    path: 'users', // the url
    component: UsersPage, // view rendered
  },
  {
    path: 'users/:id',
    component: UserDetail,
  },
  {
    path: 'classes', // the url
    component: ClassPage, // view rendered
  },
  {
    path: 'classes/:id',
    component: ClassDetail,
  },
];

export default routes;
