import uuid from 'uuid/v1';
import moment from 'moment';

import mock from 'utils/mock';

mock.onGet('/api/management/customers').reply(200, {
  customers: [
    {
      id: uuid(),
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      avatar: '/images/avatars/avatar_2.png',
      gender: 'perempuan',
      currency: '$',
      umur: '25',
      projects: '1',
      rating: 5,
      location: 'Jl.Putat Bekasi'
    },
    {
      id: uuid(),
      name: 'Cao Yu',
      email: 'cao.yu@devias.io',
      avatar: '/images/avatars/avatar_3.png',
      gender: 'perempuan',
      umur: 'Freelancer',
      currency: '$',
      projects: '3',
      rating: 4.3,
      location: 'Bristow'
    },
    {
      id: uuid(),
      name: 'Alexa Richardson',
      email: 'alexa.richardson@devias.io',
      avatar: '/images/avatars/avatar_4.png',
      gender: 'perempuan',
      umur: 'Enterprise',
      currency: '$',
      projects: '0',
      rating: 4.5,
      location: 'Georgia, USA'
    },
    {
      id: uuid(),
      name: 'Anje Keizer',
      email: 'anje.keizer@devias.io',
      avatar: '/images/avatars/avatar_5.png',
      gender: '5,600.00',
      umur: 'Enterprise',
      currency: '$',
      projects: '6',
      rating: '088210891684',
      location: 'Ohio, USA'
    },
    {
      id: uuid(),
      name: 'Clarke Gillebert',
      email: 'clarke.gillebert@devias.io',
      avatar: '/images/avatars/avatar_6.png',
      gender: '500.00',
      umur: 'Agency',
      currency: '$',
      projects: '1',
      rating: 3.5,
      location: 'Texas, USA'
    },
    {
      id: uuid(),
      name: 'Adam Denisov',
      email: 'adam.denisov@devias.io',
      avatar: '/images/avatars/avatar_7.png',
      gender: 'laki-laki',
      umur: 'Agency',
      currency: '$',
      projects: '0',
      rating: 3,
      location: 'California, USA'
    },
    {
      id: uuid(),
      name: 'Ava Gregoraci',
      email: 'ava.gregoraci@devias.io',
      avatar: '/images/avatars/avatar_8.png',
      gender: 'laki-laki',
      umur: 'Freelancer',
      currency: '$',
      projects: '0',
      rating: 4,
      location: 'California, USA'
    },
    {
      id: uuid(),
      name: 'Emilee Simchenko',
      email: 'emilee.simchenko@devias.io',
      avatar: '/images/avatars/avatar_9.png',
      gender: '100.00',
      umur: 'Agency',
      currency: '$',
      projects: '4',
      rating: 4.5,
      location: 'Nevada, USA'
    },
    {
      id: uuid(),
      name: 'Kwak Seong-Min',
      email: 'kwak.seong.min@devias.io',
      avatar: '/images/avatars/avatar_10.png',
      gender: 'laki-laki',
      umur: 'Freelancer',
      currency: '$',
      projects: '2',
      rating: 5,
      location: 'Michigan, USA'
    },
    {
      id: uuid(),
      name: 'Shen Zhi',
      email: 'shen.zhi@devias.io',
      avatar: '/images/avatars/avatar_11.png',
      gender: 'perempuan',
      umur: 'Agency',
      currency: '$',
      projects: '0',
      rating: 3.9,
      location: 'Utah, USA'
    },
    {
      id: uuid(),
      name: 'Merrile Burgett',
      email: 'merrile.burgett@devias.io',
      avatar: '/images/avatars/avatar_12.png',
      gender: '200.00',
      umur: 'Enterprise',
      currency: '$',
      projects: '7',
      rating: 4.2,
      location: 'Utah, USA'
    }
  ]
});

mock.onGet('/api/management/customers/1/summary').reply(200, {
  summary: {
    name: 'Ekaterina Tankova',
    email: 'eunha@gfriend.com',
    phone: '+6288976972688',
    kecamatan: 'Gongju',
    kota_kabupaten: 'Seoul',
    state: 'Alabama',
    country: 'Korea Selatan',
    zipCode: '240355',
    address1: 'Seoul State',
    address2: 'House #25',
    iban: '4142 **** **** **** ****',
    autoCC: false,
    verified: false,
    currency: '$',
    invoices: [
      {
        id: uuid(),
        type: 'dibayar',
        value: 120000
      },
      {
        id: uuid(),
        type: 'dibayar',
        value: 200000
      },
      {
        id: uuid(),
        type: 'refund',
        value: 80000
      },
      {
        id: uuid(),
        type: 'pending',
        value: 200000
      },
      {
        id: uuid(),
        type: 'due',
        value: 500000
      }
    ],
    vat: 19,
    balance: 0,
    emails: [
      {
        id: uuid(),
        description: 'Order confirmation',
        created_at: moment()
          .subtract(3, 'days')
          .subtract(5, 'hours')
          .subtract(34, 'minutes')
      },
      {
        id: uuid(),
        description: 'Order confirmation',
        created_at: moment()
          .subtract(4, 'days')
          .subtract(11, 'hours')
          .subtract(49, 'minutes')
      }
    ]
  }
});

mock.onGet('/api/management/customers/1/invoices').reply(200, {
  invoices: [
    {
      id: uuid(),
      no_invoice: 'MW2344',
      date: moment(),
      barang: ['Xiaomi Redmi 2A', 'Laptop Toshiba'],
      paymentMethod: 'BCA',
      paymentImage: '/images/logos/bca_logo.png',
      value: '200000',
      currency: 'Rp',
      status: 'dibayar'
    },
    {
      id: uuid(),
      no_invoice: 'MW2335',
      date: moment(),
      barang: ['Xiaomi Redmi 5A'],
      paymentMethod: 'Dana',
      paymentImage: '/images/logos/bca_logo.png',
      value: '500000',
      currency: 'Rp',
      status: 'dibayar'
    }
  ]
});

mock.onGet('/api/management/customers/1/logs').reply(200, {
  logs: [
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 522,
      error: 'Invalid credit card',
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'DELETE',
      route: '/api/products/d65654e/remove',
      desc: 'Cart remove',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(8, 'minutes')
        .subtract(23, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/d65654e/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(20, 'minutes')
        .subtract(54, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(34, 'minutes')
        .subtract(16, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f',
      desc: 'View product',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(54, 'minutes')
        .subtract(30, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products',
      desc: 'Get products',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(56, 'minutes')
        .subtract(40, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/login',
      desc: 'Login',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(57, 'minutes')
        .subtract(5, 'seconds')
    }
  ]
});
