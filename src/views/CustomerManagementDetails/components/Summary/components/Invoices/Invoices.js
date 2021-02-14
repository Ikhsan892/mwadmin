import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import rupiahFormat from 'rupiah-format';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const getSum = (invoices, type) => {
  const filtered = invoices.filter(invoice => invoice.type === type);
  const total = filtered.reduce((total, invoice) => total + invoice.value, 0);

  return [filtered, total];
};

const Invoices = props => {
  const { customer, className, ...rest } = props;

  const classes = useStyles();

  const handleEditOpen = () => {};

  const [paidInvoices, paidTotal] = getSum(customer.invoices, 'dibayar');
  const [draftInvoices, draftTotal] = getSum(customer.invoices, 'pending');
  const [dueInvoices, dueTotal] = getSum(customer.invoices, 'due');
  const [refundedInvoices, refundedTotal] = getSum(customer.invoices, 'refund');

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Invoices/Tagihan" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow></TableRow>
            <TableRow selected>
              <TableCell>Dibayar</TableCell>
              <TableCell>
                {paidInvoices.length} (
                {rupiahFormat.convert(paidTotal).replace(',00', ',-')})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pending / Menunggu</TableCell>
              <TableCell>
                {draftInvoices.length} (
                {rupiahFormat.convert(draftTotal).replace(',00', ',-')})
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Jatuh Tempo</TableCell>
              <TableCell>
                {dueInvoices.length} (
                {rupiahFormat.convert(dueTotal).replace(',00', ',-')})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Refund</TableCell>
              <TableCell>
                {refundedInvoices.length} (
                {rupiahFormat.convert(refundedTotal).replace(',00', ',-')})
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

Invoices.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default Invoices;
