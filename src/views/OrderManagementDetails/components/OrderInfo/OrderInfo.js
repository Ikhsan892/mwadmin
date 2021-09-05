import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { ComponentsGuard } from 'components';

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

const OrderInfo = props => {
  const { order, className, ...rest } = props;

  const classes = useStyles();

  const options = ['Dibayar', 'Cancel', 'Refund', 'Pending'];

  const [option, setOption] = useState(options[0]);

  const handleChange = event => {
    event.persist();

    setOption(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Info Order"
        action={
          <ComponentsGuard roles={['TEKNISI']}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </ComponentsGuard>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Pelanggan</TableCell>
              <TableCell>
                <Link component={RouterLink} to="/management/customers/1">
                  {order.pelanggan.nama_depan} {order.pelanggan.nama_belakang}
                </Link>
                <div>{order.pelanggan.alamat}</div>
                <div>{order.pelanggan.kota_kabupaten}</div>
                <div>{order.pelanggan.negara}</div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>ID</TableCell>
              <TableCell>#{order.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>No Invoice</TableCell>
              <TableCell>{order.no_invoice}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Tipe Invoice</TableCell>
              <TableCell>
                <Typography variant="overline">{order.tipe}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tanggal Dibuat</TableCell>
              <TableCell>
                {moment(order.created_at).format('DD/MM/YYYY HH:MM')}
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Tanggal Jatuh Tempo</TableCell>
              <TableCell>
                {moment(order.created_at).format('DD/MM/YYYY HH:MM')}
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Total</TableCell>
              <TableCell>
                {order.currency}
                {order.value}
              </TableCell>
            </TableRow> 
            <TableRow>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="option"
                  onChange={handleChange}
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  value={option}
                  variant="outlined">
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

OrderInfo.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderInfo;
