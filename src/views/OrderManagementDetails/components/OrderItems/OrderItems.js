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
  TableCell,
  Checkbox
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
  const { barang, className, ...rest } = props;

  const classes = useStyles();
  const [selectedBarang, setSelectedBarang] = React.useState([]);

  const handleSelectAll = event => {
    const selectedBarang = event.target.checked
      ? barang.map(barang => barang.id)
      : [];

    setSelectedBarang(selectedBarang);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="List Barang" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBarang.length === barang.length}
                      color="primary"
                      indeterminate={
                        selectedBarang.length > 0 &&
                        selectedBarang.length < barang.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell>Jenis Barang</TableCell>
                  <TableCell>Merk</TableCell>
                  <TableCell>Spesifikasi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {order.items.map(item => (
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
                ))} */}
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
