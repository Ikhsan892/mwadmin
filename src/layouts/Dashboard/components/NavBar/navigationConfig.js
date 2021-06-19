/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MailIcon from '@material-ui/icons/MailOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { Label } from 'components';

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
            href: '/management/customers',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
          },
          // {
          //   title: 'Projects',
          //   href: '/management/projects'
          // },
          {
            title: 'Orderan',
            href: '/management/orders',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
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
            href: '/pengaturan/pembayaran',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
          },
          {
            title: 'Biaya Tambahan',
            href: '/pengaturan/biaya',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
          },
          {
            title: 'Pengiriman',
            href: '/pengaturan/pengiriman',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
          }
        ]
      }
    ]
  },
  {
    title: 'Member Performance',
    pages: [
      {
        title: 'Social Feed',
        href: '/social-feed',
        icon: PeopleIcon
      },
      {
        title: 'Profile',
        href: '/profile',
        icon: PersonIcon,
        children: [
          {
            title: 'Timeline',
            href: '/profile/1/timeline'
          },
          {
            title: 'Connections',
            href: '/profile/1/connections'
          },
          {
            title: 'Projects',
            href: '/profile/1/projects'
          },
          {
            title: 'Reviews',
            href: '/profile/1/reviews'
          }
        ]
      },
      {
        title: 'Project',
        href: '/projects',
        icon: FolderIcon,
        children: [
          {
            title: 'Browse',
            href: '/projects'
          },
          {
            title: 'Create',
            href: '/projects/create'
          },
          {
            title: 'Overview',
            href: '/projects/1/overview'
          },
          {
            title: 'Files',
            href: '/projects/1/files'
          },
          {
            title: 'Activity',
            href: '/projects/1/activity'
          },
          {
            title: 'Subscribers',
            href: '/projects/1/subscribers'
          }
        ]
      }
    ]
  },
  {
    title: 'Invoices',
    pages: [
      {
        title: 'Invoice',
        href: '/invoices/1',
        icon: ReceiptIcon
      },
      {
        title: 'Kanban Board',
        href: '/kanban-board',
        icon: ListAltIcon
      },
      {
        title: 'Mail',
        href: '/mail',
        icon: MailIcon,
        label: () => (
          <Label color={colors.red[500]} shape="rounded">
            2
          </Label>
        )
      },
      {
        title: 'Chat',
        href: '/chat',
        icon: ChatIcon,
        label: () => (
          <Label color={colors.red[500]} shape="rounded">
            4
          </Label>
        )
      },
      {
        title: 'Calendar',
        href: '/calendar',
        icon: CalendarTodayIcon,
        label: () => <Label color={colors.green[500]}>New</Label>
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general',
            label: () => <Label color={colors.blue[500]}>Allow</Label>
          }
          // {
          //   title: 'Subscription',
          //   href: '/settings/subscription'
          // },
          // {
          //   title: 'Notifications',
          //   href: '/settings/notifications'
          // },
          // {
          //   title: 'Security',
          //   href: '/settings/security'
          // }
        ]
      }
    ]
  }
];
