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
  TextField,
  Link
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
          <IconButton>
            <EditIcon />
          </IconButton>
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
                  {order.customer.name}
                </Link>
                <div>{order.customer.address}</div>
                <div>{order.customer.city}</div>
                <div>{order.customer.country}</div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>ID</TableCell>
              <TableCell>#{order.id.split('-').shift()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>No Invoice</TableCell>
              <TableCell>{order.ref}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Tanggal Dibuat</TableCell>
              <TableCell>
                {moment(order.created_at).format('DD/MM/YYYY HH:MM')}
              </TableCell>
            </TableRow>
            <TableRow>
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
            </TableRow>
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
