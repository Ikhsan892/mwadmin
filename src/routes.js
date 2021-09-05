/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';
import DashboardDefaultView from './views/DashboardDefault';
import OverviewView from './views/Overview';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/overview" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/Login'))
      },
      // {
      //   path: '/auth/register',
      //   exact: true,
      //   component: lazy(() => import('views/Register'))
      // },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('views/Calendar'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('views/Changelog'))
      },
      {
        path: '/chat',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/chat/:id',
        exact: true,
        component: lazy(() => import('views/Chat'))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: DashboardAnalyticsView
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/invoices/:id',
        exact: true,
        component: lazy(() => import('views/InvoiceDetails'))
      },
      {
        path: '/inventory/tambah',
        exact: true,
        component: lazy(() => import('views/TambahInventory'))
      },
      {
        path: '/inventory/list',
        exact: true,
        component: lazy(() => import('views/Inventory'))
      },
      {
        path: '/kanban-board',
        exact: true,
        component: lazy(() => import('views/KanbanBoard'))
      },
      {
        path: '/mail',
        exact: true,
        component: lazy(() => import('views/Mail'))
      },
      {
        path: '/management/customers',
        exact: true,
        component: lazy(() => import('views/CustomerManagementList'))
      },
      {
        path: '/management/customers/:id',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/customers/:id/:tab',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/projects',
        exact: true,
        component: lazy(() => import('views/ProjectManagementList'))
      },
      {
        path: '/management/orders',
        exact: true,
        component: lazy(() => import('views/OrderManagementList'))
      },
      {
        path: '/management/orders/:id',
        exact: true,
        component: lazy(() => import('views/OrderManagementDetails'))
      },
      {
        path: '/barang/new-request',
        exact: true,
        component: lazy(() => import('views/OrderManagementCreate'))
      },
      {
        path: '/pengaturan/pembayaran',
        exact: true,
        component: lazy(() => import('views/Pembayaran'))
      },
      {
        path: '/pengaturan/biaya',
        exact: true,
        component: lazy(() => import('views/Biaya'))
      },
      {
        path: '/pengaturan/pengiriman',
        exact: true,
        component: lazy(() => import('views/Pengiriman'))
      },
      {
        path: '/overview',
        exact: true,
        component: OverviewView
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('views/ProjectCreate'))
      },
      {
        path: '/projects/:id',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/projects/:id/:tab',
        exact: true,
        component: lazy(() => import('views/ProjectDetails'))
      },
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('views/ProjectList'))
      },
      {
        path: '/role',
        exact: true,
        component: lazy(() => import('views/Role'))
      },
      {
        path: '/role/add-role',
        exact: true,
        component: lazy(() => import('views/Role/components/RoleForm'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/tambah-team',
        exact: true,
        component: lazy(() => import('views/TambahTeam'))
      },
      {
        path: '/getting-started',
        exact: true,
        component: lazy(() => import('views/GettingStarted'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ],
    routesAllowed: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/chat',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/chat/:id',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/dashboards/default',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/invoices/:id',
        exact: true,
        component: lazy(() => import('views/InvoiceDetails'))
      },
      {
        path: '/kanban-board',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/mail',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/management/customers',
        exact: true,
        component: lazy(() => import('views/CustomerManagementList'))
      },
      {
        path: '/management/customers/:id',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/customers/:id/:tab',
        exact: true,
        component: lazy(() => import('views/CustomerManagementDetails'))
      },
      {
        path: '/management/projects',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/management/orders',
        exact: true,
        component: lazy(() => import('views/OrderManagementList'))
      },
      {
        path: '/management/orders/create',
        exact: true,
        component: lazy(() => import('views/OrderManagementCreate'))
      },
      {
        path: '/management/orders/:id',
        exact: true,
        component: lazy(() => import('views/OrderManagementDetails'))
      },
      {
        path: '/management/inventory',
        exact: true,
        component: lazy(() => import('views/Inventory'))
      },
      {
        path: '/barang/new-request',
        exact: true,
        component: lazy(() => import('views/NewRequests'))
      },
      {
        path: '/pengaturan/pembayaran',
        exact: true,
        component: lazy(() => import('views/Pembayaran'))
      },
      {
        path: '/pengaturan/biaya',
        exact: true,
        component: lazy(() => import('views/Biaya'))
      },
      {
        path: '/pengaturan/pengiriman',
        exact: true,
        component: lazy(() => import('views/Pengiriman'))
      },
      {
        path: '/overview',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/projects/create',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/projects/:id',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/projects/:id/:tab',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/settings',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: lazy(() => import('views/Settings'))
      },
      {
        path: '/social-feed',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        path: '/getting-started',
        exact: true,
        component: lazy(() => import('views/UnderMaintain'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
