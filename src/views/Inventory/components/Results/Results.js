import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  colors,
  Divider,
  Link,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { GenericMoreButton, Label, TableEditBar } from 'components';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import React, { useState, useMemo, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import client from 'utils/axios';
import { formatRupiah } from 'utils/formatRupiah';
import { getComparator, stableSort } from 'utils/sortable';

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  name_role: {
    textTransform: 'capitalize'
  },
  inner: {},
  actions: {
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  images: {
    width: 70,
    height: 'auto'
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

const headerTable = [
  {
    id: 'nama_barang',
    label: 'Nama Barang'
  },
  {
    id: 'harga_beli',
    label: 'Harga Beli'
  },
  {
    id: 'harga_jual',
    label: 'Harga Jual'
  },
  {
    id: 'disabled',
    label: 'Status'
  },
  {
    id: 'stok',
    label: 'Stok'
  }
];

const Results = props => {
  const { className, inventory, search, ...rest } = props;

  const classes = useStyles();

  const [selectedInventory, setselectedInventory] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_role');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const firstIndex = useMemo(() => {
    return page * rowsPerPage;
  }, [page]);
  const lastIndex = useMemo(() => {
    return page * rowsPerPage + rowsPerPage;
  }, [page, rowsPerPage]);

  const handleSelectAll = useCallback(event => {
    const selectedInventory = event.target.checked
      ? inventory.map(m =>
          JSON.stringify({ id: m.id, tipe_barang: m.tipe_barang })
        )
      : [];

    setselectedInventory(selectedInventory);
  }, []);

  const createSortHandler = useCallback(property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, []);

  const handleClickOpenDelete = useCallback(() => {
    let delete_data = window.confirm('Are you sure wants to delete this data');
    if (delete_data) {
      let body = {
        id: selectedInventory
      };
      client
        .delete(`/api/inventory`, {
          data: body
        })
        .then(data => {
          setselectedInventory([]);
          dispatch({ type: 'INVENTORY_TRIGGER' });
        })
        .catch(err => {
          console.log(err);
          alert('something error while deleting this data');
        });
    }
  }, [selectedInventory]);

  const handleSelectOne = useCallback(
    (event, id) => {
      const selectedIndex = selectedInventory.indexOf(id);
      let newselectedInventory = [];

      if (selectedIndex === -1) {
        newselectedInventory = newselectedInventory.concat(
          selectedInventory,
          id
        );
      } else if (selectedIndex === 0) {
        newselectedInventory = newselectedInventory.concat(
          selectedInventory.slice(1)
        );
      } else if (selectedIndex === selectedInventory.length - 1) {
        newselectedInventory = newselectedInventory.concat(
          selectedInventory.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newselectedInventory = newselectedInventory.concat(
          selectedInventory.slice(0, selectedIndex),
          selectedInventory.slice(selectedIndex + 1)
        );
      }

      setselectedInventory(newselectedInventory);
    },
    [selectedInventory]
  );

  const handleChangePage = useCallback((event, page) => {
    setPage(page);
  }, []);

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleList = useMemo(() => {
    return search.length > 0 ? search : inventory;
  }, [search, inventory]);

  const activeColors = useMemo(() => {
    return {
      false: colors.green[600],
      true: colors.red[600],
      warning: colors.yellow[600]
    };
  }, []);

  const isDisabled = useCallback(
    (disabled, stok) => {
      if (disabled) {
        return <Label color={activeColors[disabled]}>Disembunyikan</Label>;
      }
      if (stok < 3) {
        return <Label color={activeColors['warning']}>Stok Menipis</Label>;
      }
    },
    [activeColors]
  );

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {/* <ModalEditwwwwwopen={openEdit}
        handleClose={handleCloseEdit}
        user={user}
        feature={features}
        id={idEdit}
      /> */}
      <Typography color="textSecondary" gutterBottom variant="body2">
        {inventory.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(inventory.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="List Inventory" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedInventory.length === inventory.length}
                        color="primary"
                        indeterminate={
                          selectedInventory.length > 0 &&
                          selectedInventory.length < inventory.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
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
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(handleList, getComparator(order, orderBy))
                    .slice(firstIndex, lastIndex)
                    .map(order => (
                      <TableRow
                        key={order.id}
                        selected={
                          selectedInventory.indexOf(
                            JSON.stringify({
                              id: order.id,
                              tipe_barang: order.tipe_barang
                            })
                          ) !== -1
                        }>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={
                              selectedInventory.indexOf(
                                JSON.stringify({
                                  id: order.id,
                                  tipe_barang: order.tipe_barang
                                })
                              ) !== -1
                            }
                            color="primary"
                            onChange={event =>
                              handleSelectOne(
                                event,
                                JSON.stringify({
                                  id: order.id,
                                  tipe_barang: order.tipe_barang
                                })
                              )
                            }
                            value={
                              selectedInventory.indexOf(
                                JSON.stringify({
                                  id: order.id,
                                  tipe_barang: order.tipe_barang
                                })
                              ) !== -1
                            }
                          />
                        </TableCell>
                        <TableCell className={classes.name_role}>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/inventory/detail/${order.nama_barang}/${order.tipe_barang}`}
                            variant="h6">
                            {order.nama_barang}
                          </Link>
                        </TableCell>
                        <TableCell>
                          Rp {formatRupiah(order.harga_beli)},-
                        </TableCell>
                        <TableCell>
                          Rp {formatRupiah(order.harga_jual)},-
                        </TableCell>
                        <TableCell>
                          {isDisabled(order.disabled, order.stok)}
                        </TableCell>
                        <TableCell>{order.stok}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              aria-label="edit data"
                              component={RouterLink}
                              to={`/inventory/edit/${order.nama_barang}/${order.tipe_barang}`}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
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
            count={inventory.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar
        selected={selectedInventory}
        onClick={handleClickOpenDelete}
      />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  metode: PropTypes.array.isRequired
};

Results.defaultProps = {
  metode: []
};

export default Results;
