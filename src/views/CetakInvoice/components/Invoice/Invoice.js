import React from 'react';
import moment from 'moment';
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image
} from '@react-pdf/renderer';
import { formatRupiah } from 'utils/formatRupiah';

const Invoice = ({ data }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.kop}>
          <View style={styles.gambar_kop}>
            <Image src="/images/logos/mwlogo2.png" style={styles.logo_mw} />
            <Image src="/images/logos/mwlogo.png" style={styles.logo_mw2} />
          </View>
          <View style={styles.service_center}>
            <Text style={styles.service_text}>Service</Text>
            <Text style={styles.service_text}>Center</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.right_bold}>
              Receiving of electronic parts and service
            </Text>
            <Text style={styles.right_small}>
              Handphone | Laptop | Notebook | Computer (CPU) LCD Monitor &amp;
              TV | Speaker &amp; Amplifier | etc
            </Text>
          </View>
        </View>
        <View style={styles.no_invoice}>
          <Text
            style={{
              ...styles.kwitansi,
              fontSize: 9,
              textTransform: 'uppercase'
            }}>
            No Invoice
          </Text>
          <Text>MW2234</Text>
        </View>
        <View style={styles.alamat}>
          <View style={styles.workshop_contact}>
            <Text style={styles.caption}>workshop</Text>
            <Text style={styles.work} wrap>
              Jl. Pengasinan Tengah Raya No. 99 Rawalumbu Kota Bekasi, Jawa
              Barat 17115
            </Text>
          </View>
          <View style={styles.workshop_contact}>
            <Text style={styles.caption}>contact us</Text>
            <Text style={styles.work} wrap>
              Email: admin@makersware.web.id
            </Text>
            <Text style={styles.work} wrap>
              WhatsApp : 0896-3199-6733
            </Text>
            <Text style={styles.work} wrap>
              Instagram : @makerswareofficial
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.caption}>Tanggal</Text>
            <Text style={styles.innerCaption}>
              {data.tanggal_invoice &&
                moment(data.tanggal_invoice).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View>
            <Text style={styles.caption}>Pengiriman</Text>
            {data.pengiriman && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Image
                  src={
                    process.env.REACT_APP_SERVER_URL +
                    data.pengiriman.image_path
                  }
                  style={styles.logo}
                />
                <Text
                  style={{
                    ...styles.innerCaption,
                    textTransform: 'uppercase',
                    fontSize: 7
                  }}>
                  {data.pengiriman.nama_pengiriman}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.caption}>Metode Pembayaran</Text>
            {data.payment && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Image
                  src={
                    process.env.REACT_APP_SERVER_URL + data.payment.image_path
                  }
                  style={styles.logo}
                />
                <Text
                  style={{
                    ...styles.innerCaption,
                    textTransform: 'uppercase',
                    fontSize: 7
                  }}>
                  {data.payment.name_payment}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ ...styles.alamat, marginTop: 10 }}>
          <View style={styles.workshop_contact}>
            <Text style={styles.caption}>Tagihan Untuk</Text>
            <Text style={styles.work} wrap>
              {data.pelanggan &&
                `${data.pelanggan.nama_depan} ${data.pelanggan.nama_belakang}`}
            </Text>
            <Text style={styles.work} wrap>
              {data?.pelanggan.alamat}
            </Text>
            <Text style={styles.work} wrap>
              {data?.pelanggan.no_telepon}
            </Text>
          </View>
          <View style={styles.workshop_contact}>
            <Text style={styles.caption}>Garansi</Text>
            <Text style={styles.work} wrap>
              {data?.garansi || 'Tidak bergaransi'}
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.caption,
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 30
          }}>
          INFORMASI KERUSAKAN / PERBAIKAN
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
          {data.tipe === 'service' ? (
            <View>
              <Text
                style={{ ...styles.caption, marginTop: 5, marginBottom: 5 }}>
                Barang
              </Text>
              {data?.barang.map(i => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 5
                  }}>
                  <Text style={{ fontSize: 11, marginBottom: 2 }}>
                    {i.nama_barang}
                  </Text>
                  <Text
                    style={{
                      fontSize: 7,
                      textTransform: 'uppercase',
                      letterSpacing: 2
                    }}>
                    {i.jenis_barang}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
          <View>
            <Text style={{ ...styles.caption, marginTop: 5, marginBottom: 5 }}>
              Sparepart &amp; Produk
            </Text>
            {data.selected &&
              data?.selected.map(i => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 5
                  }}>
                  <Text style={{ fontSize: 10, marginBottom: 2 }}>
                    -{' '}
                    {i.tipe_barang === 'sparepart'
                      ? i.sparepart.nama_barang
                      : i.product.nama_barang}
                  </Text>
                </View>
              ))}
          </View>
          <View>
            <Text style={{ ...styles.caption, marginTop: 5, marginBottom: 5 }}>
              Total
            </Text>
            {data.selected &&
              data?.selected.map(i => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 5
                  }}>
                  <Text style={{ fontSize: 10, marginBottom: 2 }}>
                    {formatRupiah(
                      i.tipe_barang === 'sparepart'
                        ? i.sparepart.harga_jual * i.stok
                        : i.product.harga_jual * i.stok,
                      'Rp '
                    )}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
          <View>
            <Text
              style={{
                ...styles.caption,
                marginTop: 5,
                marginBottom: 5
              }}></Text>
          </View>
          <View>
            <Text style={{ ...styles.caption, marginTop: 5, marginBottom: 5 }}>
              Subtotal
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 5
              }}>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>Total</Text>
              {data.order_biaya &&
                data?.order_biaya.map(i => (
                  <Text style={{ fontSize: 10, marginBottom: 5 }}>
                    {i.nama_biaya}
                  </Text>
                ))}
              {data.order_diskon &&
                data?.order_diskon.map(i => (
                  <Text style={{ fontSize: 10, marginBottom: 5 }}>
                    {i.nama_biaya}
                  </Text>
                ))}
              <Text style={{ fontSize: 10, marginBottom: 5 }}>Grand Total</Text>
            </View>
          </View>
          <View>
            <Text style={{ ...styles.caption, marginTop: 5, marginBottom: 5 }}>
              Total
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 5
              }}>
              <Text style={{ fontSize: 10, marginBottom: 5 }}>
                {formatRupiah(
                  data?.selected.reduce(
                    (a, b) =>
                      a +
                      (b.tipe_barang === 'sparepart'
                        ? b.sparepart.harga_jual * b.stok
                        : b.product.harga_jual * b.stok || 0),
                    0
                  ),
                  'Rp '
                )}
              </Text>
              {data.order_biaya &&
                data?.order_biaya.map(i => (
                  <Text style={{ fontSize: 10, marginBottom: 2 }}>
                    {formatRupiah(i.total, 'Rp ')}
                  </Text>
                ))}
              {data.order_diskon &&
                data?.order_diskon.map(i => (
                  <Text style={{ fontSize: 10, marginBottom: 2 }}>
                    - {formatRupiah(i.total, 'Rp ')}
                  </Text>
                ))}
              <Text style={{ fontSize: 10, marginBottom: 2 }}>
                {formatRupiah(data.total, 'Rp ')}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 15,
    marginTop: 5
  },
  innerCaption: {
    fontSize: 10,
    marginTop: 5
  },
  content: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c2c2c2'
  },
  work: {
    fontSize: 10
  },
  workshop_contact: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '35%'
  },
  caption: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 5
  },
  alamat: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  kwitansi: {
    marginBottom: 3,
    paddingBottom: 3,
    fontWeight: 'bold',
    fontSize: 11,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  receipt: {
    fontWeight: 'bold',
    fontSize: 9
  },
  no_invoice: {
    marginTop: 6,
    marginBottom: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    position: 'relative',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30
  },
  right: {
    flexBasis: '30%'
  },
  right_bold: {
    fontSize: 9,
    fontStyle: 'bold italic'
  },
  right_small: {
    marginTop: 5,
    fontSize: 7,
    fontStyle: 'italic'
  },
  service_text: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'heavy'
  },
  kop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  service_center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambar_kop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo_mw: {
    width: 70,
    height: 70
  },
  logo_mw2: {
    width: 100,
    height: 40
  }
});

export default Invoice;
