import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  colors,
  Divider,
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
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  GenericMoreButton,
  Label,
  TableEditBar,
  SwitchActive
} from 'components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getComparator, stableSort } from 'utils/sortable';
import client from 'utils/axios';
import { Edit } from '@material-ui/icons';
import ModalEditPayment from '../ModalEditPayment';

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  name_payment: {
    textTransform: 'uppercase'
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
    id: 'name_payment',
    label: 'Nama Metode'
  },
  {
    id: 'aktif',
    label: 'Aktif'
  }
];

const Results = props => {
  const { className, metode, search, ...rest } = props;

  const classes = useStyles();

  const [selectedMetode, setSelectedMetode] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name_payment');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const dispatch = useDispatch();
  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedMetode = event.target.checked ? metode.map(m => m.id) : [];

    setSelectedMetode(selectedMetode);
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
        id: selectedMetode
      };
      client
        .delete(`/api/payment-method`, {
          data: body
        })
        .then(data => {
          setSelectedMetode([]);
          dispatch({ type: 'PAYMENT_INSERTED' });
        })
        .catch(err => console.log(err));
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMetode.indexOf(id);
    let newSelectedMetode = [];

    if (selectedIndex === -1) {
      newSelectedMetode = newSelectedMetode.concat(selectedMetode, id);
    } else if (selectedIndex === 0) {
      newSelectedMetode = newSelectedMetode.concat(selectedMetode.slice(1));
    } else if (selectedIndex === selectedMetode.length - 1) {
      newSelectedMetode = newSelectedMetode.concat(selectedMetode.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMetode = newSelectedMetode.concat(
        selectedMetode.slice(0, selectedIndex),
        selectedMetode.slice(selectedIndex + 1)
      );
    }

    setSelectedMetode(newSelectedMetode);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleList = () => {
    return search.length > 0 ? search : metode;
  };

  const handleOpenEdit = id => {
    setOpenEdit(true);
    setIdEdit(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIdEdit(0);
  };

  const activeColors = {
    false: colors.grey[600],
    true: colors.green[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalEditPayment
        title="Edit Metode Pembayaran"
        open={openEdit}
        id={idEdit}
        handleClose={handleCloseEdit}
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {metode.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(metode.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Metode Pembayaran" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedMetode.length === metode.length}
                        color="primary"
                        indeterminate={
                          selectedMetode.length > 0 &&
                          selectedMetode.length < metode.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Image</TableCell>
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
                  {stableSort(handleList(), getComparator(order, orderBy))
                    .slice(firstIndex, lastIndex)
                    .map(order => (
                      <TableRow
                        key={order.id}
                        selected={selectedMetode.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedMetode.indexOf(order.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, order.id)}
                            value={selectedMetode.indexOf(order.id) !== -1}
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              order.image_path
                                ? `http://localhost:3000/${order.image_path}`
                                : '/images/default.png'
                            }
                            className={classes.images}
                          />
                        </TableCell>
                        <TableCell className={classes.name_payment}>
                          {order.name_payment}
                        </TableCell>
                        <TableCell>
                          <SwitchActive
                            active={order.aktif}
                            id={order.id}
                            url="/api/payment-method"
                            trigger="PAYMENT_INSERTED"
                          />
                        </TableCell>
                        <TableCell>
                          <Label color={activeColors[order.aktif]}>
                            {order.aktif ? 'Aktif' : 'Tidak Aktif'}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              aria-label="edit data"
                              onClick={() => handleOpenEdit(order.id)}>
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
            count={metode.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedMetode} onClick={handleClickOpenDelete} />
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
