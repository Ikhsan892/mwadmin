/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MailIcon from '@material-ui/icons/MailOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

export default [
  {
    title: 'Statistik',
    pages: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        children: [
          {
            title: 'Default',
            href: '/dashboards/default'
          },
          {
            title: 'Analytics',
            href: '/dashboards/analytics'
          }
        ]
      }
    ]
  },
  {
    title: 'Orderan & Pelanggan',
    pages: [
      {
        title: 'New Request',
        href: '/barang/new-request',
        icon: ControlPointIcon
      },
      {
        title: 'Manajemen',
        href: '/management',
        icon: BarChartIcon,
        children: [
          {
            title: 'Pelanggan',
            href: '/management/customers'
            // label: () => <Label color={colors.blue[500]}>Allow</Label>
          },
          // {
          //   title: 'Projects',
          //   href: '/management/projects'
          // },
          {
            title: 'Orderan',
            href: '/management/orders'
          }
        ]
      },
      {
        title: 'Pengaturan Orderan',
        href: '/pengaturan',
        icon: LibraryBooksIcon,
        children: [
          {
            title: 'Metode Pembayaran',
            href: '/pengaturan/pembayaran'
          },
          {
            title: 'Biaya Tambahan',
            href: '/pengaturan/biaya'
          },
          {
            title: 'Pengiriman',
            href: '/pengaturan/pengiriman'
          }
        ]
      }
    ]
  },
  {
    title: 'Team Performance',
    pages: [
      {
        // Untuk Komisaris dan Administrasi Umum + superadmin
        title: 'Tambah Team',
        href: '/tambah-team',
        icon: PersonIcon
      },
      {
        title: 'Daftar Team',
        href: '/profile',
        icon: PeopleIcon
        // children: [
        //   {
        //     title: 'Timeline',
        //     href: '/profile/1/timeline'
        //   },
        //   {
        //     title: 'Connections',
        //     href: '/profile/1/connections'
        //   },
        //   {
        //     title: 'Projects',
        //     href: '/profile/1/projects'
        //   },
        //   {
        //     title: 'Reviews',
        //     href: '/profile/1/reviews'
        //   }
        // ]
      },
      {
        // Untuk Komisaris dan Administrasi Umum + superadmin
        title: 'Role User',
        href: '/role',
        icon: AccessibilityIcon
      }
      // {
      //   title: 'Project',
      //   href: '/projects',
      //   icon: FolderIcon,
      //   children: [
      //     {
      //       title: 'Browse',
      //       href: '/projects'
      //     },
      //     {
      //       title: 'Create',
      //       href: '/projects/create'
      //     },
      //     {
      //       title: 'Overview',
      //       href: '/projects/1/overview'
      //     },
      //     {
      //       title: 'Files',
      //       href: '/projects/1/files'
      //     },
      //     {
      //       title: 'Activity',
      //       href: '/projects/1/activity'
      //     },
      //     {
      //       title: 'Subscribers',
      //       href: '/projects/1/subscribers'
      //     }
      //   ]
      // }
    ]
  },
  {
    title: 'Invoices',
    pages: [
      {
        title: 'List Invoice',
        href: '/invoices/1',
        icon: ReceiptIcon
      }
    ]
  },
  {
    title: 'Settings',
    pages: [
      {
        title: 'General',
        href: '/settings/general',
        icon: SettingsIcon
      },
      {
        title: 'Subscription',
        href: '/settings/subscription',
        icon: SettingsIcon
      },
      {
        title: 'Notifications',
        href: '/settings/notifications',
        icon: SettingsIcon
      },
      {
        title: 'Security',
        href: '/settings/security',
        icon: SettingsIcon
      }
    ]
  }
  // {
  //   title: 'Kanban Board',
  //   href: '/kanban-board',
  //   icon: ListAltIcon
  // },
  // {
  //   title: 'Mail',
  //   href: '/mail',
  //   icon: MailIcon,
  //   label: () => (
  //     <Label color={colors.red[500]} shape="rounded">
  //       2
  //     </Label>
  //   )
  // },
  // {
  //   title: 'Chat',
  //   href: '/chat',
  //   icon: ChatIcon,
  //   label: () => (
  //     <Label color={colors.red[500]} shape="rounded">
  //       4
  //     </Label>
  //   )
  // },
  // {
  //   title: 'Calendar',
  //   href: '/calendar',
  //   icon: CalendarTodayIcon,
  //   label: () => <Label color={colors.green[500]}>New</Label>
  // },
];
