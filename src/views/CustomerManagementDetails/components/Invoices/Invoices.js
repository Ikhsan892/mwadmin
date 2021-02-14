import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import rupiahFormat from 'rupiah-format';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';

import axios from 'utils/axios';
import { Label, GenericMoreButton } from 'components';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  },
  payment_image: {
    width: 30,
    height: 'auto'
  }
}));

const Invoices = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchInvoices = () => {
      axios.get('/api/management/customers/1/invoices').then(response => {
        if (mounted) {
          setInvoices(response.data.invoices);
        }
      });
    };

    fetchInvoices();

    return () => {
      mounted = false;
    };
  }, []);

  const statusColors = {
    pending: colors.orange[600],
    dibayar: colors.green[600],
    refund: colors.red[600],
    cancel: colors.grey[500]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Invoice Pelanggan" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No Invoice</TableCell>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Barang</TableCell>
                    <TableCell>Metode Pembayaran</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map(invoice => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.no_invoice}</TableCell>
                      <TableCell>
                        {moment(invoice.date).format('DD/MM/YYYY | HH:MM')}
                      </TableCell>
                      <TableCell>
                        {console.log(invoice.barang.length)}
                        {invoice.barang.length < 2
                          ? invoice.barang[0]
                          : `${invoice.barang.length} Barang`}
                      </TableCell>
                      <TableCell>
                        {invoice.paymentMethod}
                        {'--'}
                        <span>
                          <img
                            src={invoice.paymentImage}
                            className={classes.payment_image}
                          />
                        </span>
                      </TableCell>
                      <TableCell>
                        {rupiahFormat
                          .convert(invoice.value)
                          .replace(',00', ',-')}
                      </TableCell>
                      <TableCell>
                        <Label
                          color={statusColors[invoice.status]}
                          variant="outlined">
                          {invoice.status}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={'/invoices/1'}
                          variant="outlined">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

Invoices.propTypes = {
  className: PropTypes.string
};

export default Invoices;
