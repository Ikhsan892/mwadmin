import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import client from 'utils/axios';
import { Page } from 'components';
import { Invoice } from './components';
import { PDFViewer } from '@react-pdf/renderer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  },
  empty: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iframePDF: {
    width: '100%',
    height: '100vh'
  }
}));

const CetakInvoice = props => {
  const { match } = props;
  const { orderId } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [data, setData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      let response = await client.get(`/api/order/${orderId}`);
      setIsLoading(false);
      if (response.data?.message === 'empty') {
        setIsLoading(false);
        setEmpty(true);
      } else {
        setData(response.data);
        setOpen(true);
      }
    };

    fetchOrder();

    return () => setOpen(false);
  }, [orderId]);

  return (
    <Page className={classes.root} title={`Cetak Invoice ${orderId}`}>
      {isLoading ? (
        <LinearProgress />
      ) : empty ? (
        <div className={classes.empty}>
          <img
            src="/images/undraw_empty_xct9.svg"
            style={{
              width: 500,
              margin: '0 auto',
              display: 'flex',
              height: 'auto'
            }}
            alt="Empty"
          />
          <p
            style={{
              marginTop: 9
            }}>
            Invoice tidak ditemukan
          </p>
        </div>
      ) : (
        open && (
          <PDFViewer className={classes.iframePDF}>
            <Invoice data={data} />
          </PDFViewer>
        )
      )}
    </Page>
  );
};

export default CetakInvoice;
