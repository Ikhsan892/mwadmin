import uuid from 'uuid/v1';
import mock from 'utils/mock';

mock.onGet('/api/pengaturan/pembayaran').reply(200, {
  metode: [
    {
      id: uuid(),
      image: '/images/logos/bca_logo.png',
      nama: 'BCA',
      active: true
    },
    {
      id: uuid(),
      image: '',
      nama: 'BTN',
      active: true
    },
    {
      id: uuid(),
      image: '',
      nama: 'BRI',
      active: false
    },
    {
      id: uuid(),
      image: '',
      nama: 'Dana',
      active: true
    },
    {
      id: uuid(),
      image: '',
      nama: 'OVO',
      active: true
    }
  ]
});

mock.onGet('/api/pengaturan/biaya').reply(200, {
  biaya: [
    {
      id: uuid(),
      nama: 'Jasa Service',
      biaya: 50000,
      default: true
    },
    {
      id: uuid(),
      nama: 'Packing Kayu',
      biaya: 20000,
      default: false
    }
  ]
});

mock.onGet('/api/pengaturan/pengiriman').reply(200, {
  pengiriman: [
    {
      id: uuid(),
      images: '/images/logos/mwlogo2.png',
      active: true,
      pengiriman: 'Kurir Makersware'
    }
  ]
});
