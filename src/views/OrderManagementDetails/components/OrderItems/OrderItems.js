import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  }
}));

const OrderItems = props => {
  const { order, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="List Barang dan Sparepart"
        action={
          <IconButton>
            <EditIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Barang</TableCell>
                  <TableCell>Sparepart</TableCell>
                  <TableCell>Harga</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name} x {item.cuantity}
                    </TableCell>
                    <TableCell>{item.billing}</TableCell>
                    <TableCell>
                      {item.currency}
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderItems;
