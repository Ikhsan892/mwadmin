import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  colors,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  ComponentsGuard,
  GenericMoreButton,
  Label,
  TableEditBar
} from 'components';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import client from 'utils/axios';
import { formatRupiah } from 'utils/formatRupiah';
import { getComparator, stableSort } from 'utils/sortable';

const headerTable = [
  {
    id: 'tanggal_invoice',
    label: 'Tanggal Invoice'
  },
  {
    id: 'no_invoice',
    label: 'No Invoice'
  },
  {
    id: 'tipe',
    label: 'Tipe Invoice'
  },
  {
    id: 'pelanggan',
    label: 'Pelanggan'
  },
  {
    id: 'payment',
    label: 'Metode Pembayaran'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'dp',
    label: 'DP'
  },
  {
    id: 'total',
    label: 'Grand Total'
  }
];

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  },
  avatarPayment: {
    maxWidth: 50,
    height: 'auto'
  },
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const Results = props => {
  const { className, search, orders, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_role');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedOrders = event.target.checked
      ? orders.map(order => order.id)
      : [];

    setSelectedOrders(selectedOrders);
  };

  const handleList = useMemo(() => {
    return search.length > 0 ? search : orders;
  }, [search, orders]);

  const handleTotalSummary = order => {
    let subtotal = order.subtotal_resis.reduce(
      (init, curr) => (init += curr['nominal']),
      0
    );

    let sparepart = order.barangs.map(i =>
      i.kerusakans.map(kerusakan =>
        kerusakan.spareparts.reduce((init, curr) => (init += curr['harga']), 0)
      )
    );
    let summary = parseInt(subtotal) + parseInt(sparepart);
    return summary;
  };

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickOpenDelete = () => {
    let delete_data = window.confirm('Are you sure wants to delete this data');
    if (delete_data) {
      let body = {
        id: selectedOrders
      };
      client
        .delete(`/api/order`, {
          data: body
        })
        .then(data => {
          setSelectedOrders([]);
          dispatch({ type: 'ORDER_TRIGGER' });
        })
        .catch(err => alert('error delete orderan'));
    }
  };

  const handleSelectOne = useCallback(
    (event, id) => {
      const selectedIndex = selectedOrders.indexOf(id);
      let newSelectedOrders = [];

      if (selectedIndex === -1) {
        newSelectedOrders = newSelectedOrders.concat(selectedOrders, id);
      } else if (selectedIndex === 0) {
        newSelectedOrders = newSelectedOrders.concat(selectedOrders.slice(1));
      } else if (selectedIndex === selectedOrders.length - 1) {
        newSelectedOrders = newSelectedOrders.concat(
          selectedOrders.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelectedOrders = newSelectedOrders.concat(
          selectedOrders.slice(0, selectedIndex),
          selectedOrders.slice(selectedIndex + 1)
        );
      }

      setSelectedOrders(newSelectedOrders);
    },
    [selectedOrders]
  );

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const paymentStatusColors = useMemo(() => {
    return {
      'order batal': colors.red[500],
      'new request': colors.blue[500],
      'pembayaran dp': colors.orange[600],
      'pembayaran lunas': colors.green[600],
      refund: colors.red[600],
      'menunggu kepastian': colors.yellow[700],
      'menunggu pembayaran': colors.indigo[700],
      'Order Selesai': colors.grey[900],
      service: colors.indigo[500],
      produk: colors.blue[500]
    };
  }, []);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {orders.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(orders.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Orderan" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <ComponentsGuard roles={['TEKNISI']}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedOrders.length === orders.length}
                          color="primary"
                          indeterminate={
                            selectedOrders.length > 0 &&
                            selectedOrders.length < orders.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                    </ComponentsGuard>
                    {headerTable.map(i => (
                      <TableCell
                        key={i.id}
                        sortDirection={orderBy === i.id ? order : false}>
                        <TableSortLabel
                          active={orderBy === i.id}
                          direction={orderBy === i.id ? order : 'asc'}
                          onClick={() => createSortHandler(i.id)}>
                          {i.label}
                          {orderBy === i.id ? (
                            <span className={classes.visuallyHidden}>
                              {order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(handleList, getComparator(order, orderBy))
                    .slice(firstIndex, lastIndex)
                    .map(order => (
                      <TableRow
                        key={order.id}
                        selected={selectedOrders.indexOf(order.id) !== -1}>
                        <ComponentsGuard roles={['TEKNISI']}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedOrders.indexOf(order.id) !== -1}
                              color="primary"
                              onChange={event =>
                                handleSelectOne(event, order.id)
                              }
                              value={selectedOrders.indexOf(order.id) !== -1}
                            />
                          </TableCell>
                        </ComponentsGuard>
                        <TableCell>
                          {/* {order.payment.ref} */}
                          <Typography variant="body2">
                            {moment(order.tanggal_invoice).format(
                              'DD MMM YYYY | hh:mm'
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>{order.no_invoice}</TableCell>
                        <TableCell>
                          {' '}
                          <Label
                            color={paymentStatusColors[order.tipe]}
                            variant="contained">
                            {order.tipe}
                          </Label>
                        </TableCell>
                        <TableCell>
                          {order.pelanggan.nama_depan}{' '}
                          {order.pelanggan.nama_belakang}
                        </TableCell>
                        <TableCell>
                          {order.payment ? (
                            <img
                              src={
                                order.payment.image_path
                                  ? `${process.env.REACT_APP_SERVER_URL}/${order.payment.image_path}`
                                  : '/images/default.png'
                              }
                              alt={`Image Payment ${order.payment.name_payment}`}
                              className={classes.avatarPayment}
                            />
                          ) : (
                            'No payment method'
                          )}
                        </TableCell>
                        <TableCell>
                          <Label
                            color={paymentStatusColors[order.status]}
                            variant="contained">
                            {order.status}
                          </Label>
                        </TableCell>
                        <TableCell>
                          {formatRupiah(
                            order.dp ? order.dp.toString() : '0',
                            'Rp '
                          )}
                        </TableCell>
                        <TableCell>
                          {formatRupiah(
                            order.total ? order.total.toString() : '0',
                            'Rp '
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            color="primary"
                            component={RouterLink}
                            size="small"
                            to={`/management/orders/${order.id}`}
                            variant="outlined">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={orders.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar
        selected={selectedOrders}
        onDelete={handleClickOpenDelete}
      />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.array.isRequired
};

Results.defaultProps = {
  orders: []
};

export default React.memo(Results);
