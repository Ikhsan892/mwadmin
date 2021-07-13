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
  Typography,
  Tooltip
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  GenericMoreButton,
  Label,
  SwitchActive,
  TableEditBar
} from 'components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { getComparator, stableSort } from 'utils/sortable';
import client from 'utils/axios';
import ModalPengiriman from '../ModalPengiriman';

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
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
  },
  uppercase: {
    textTransform: 'uppercase'
  }
}));

const headerTable = [
  {
    id: 'nama_pengiriman',
    label: 'Nama Pengiriman'
  },
  {
    id: 'aktif',
    label: 'Aktif'
  }
];

const Results = props => {
  const { className, pengiriman, search, ...rest } = props;

  const classes = useStyles();

  const [selectedPengiriman, setSelectedPengiriman] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_pengiriman');
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('http://localhost:3000/api/pengiriman');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedPengiriman = event.target.checked
      ? pengiriman.map(m => m.id)
      : [];

    setSelectedPengiriman(selectedPengiriman);
  };

  const handleClickOpenDelete = () => {
    let delete_data = window.confirm('Are you sure wants to delete this data');
    if (delete_data) {
      let body = {
        id: selectedPengiriman
      };
      client
        .delete(`/api/pengiriman`, {
          data: body
        })
        .then(data => {
          setSelectedPengiriman([]);
          dispatch({ type: 'PENGIRIMAN_TRIGGER' });
        })
        .catch(err => console.log(err));
    }
  };

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPengiriman.indexOf(id);
    let newSelectedPengiriman = [];

    if (selectedIndex === -1) {
      newSelectedPengiriman = newSelectedPengiriman.concat(
        selectedPengiriman,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedPengiriman = newSelectedPengiriman.concat(
        selectedPengiriman.slice(1)
      );
    } else if (selectedIndex === selectedPengiriman.length - 1) {
      newSelectedPengiriman = newSelectedPengiriman.concat(
        selectedPengiriman.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedPengiriman = newSelectedPengiriman.concat(
        selectedPengiriman.slice(0, selectedIndex),
        selectedPengiriman.slice(selectedIndex + 1)
      );
    }

    setSelectedPengiriman(newSelectedPengiriman);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleOpenEdit = id => {
    setUrl(`http://localhost:3000/api/pengiriman/${id}`);
    setEdit(true);
    setOpen(true);
  };

  const handleList = () => {
    return search.length > 0 ? search : pengiriman;
  };

  const activeColors = {
    false: colors.grey[600],
    true: colors.green[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalPengiriman
        onEdit={edit}
        url={url}
        open={open}
        title="Edit Data Pengiriman"
        handleClose={() => {
          setOpen(false);
          setEdit(false);
        }}
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {pengiriman.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(pengiriman.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Pengiriman Pembayaran"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedPengiriman.length === pengiriman.length
                        }
                        color="primary"
                        indeterminate={
                          selectedPengiriman.length > 0 &&
                          selectedPengiriman.length < pengiriman.length
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(handleList(), getComparator(order, orderBy))
                    .slice(firstIndex, lastIndex)
                    .map(order => (
                      <TableRow
                        key={order.id}
                        selected={selectedPengiriman.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={
                              selectedPengiriman.indexOf(order.id) !== -1
                            }
                            color="primary"
                            onChange={event => handleSelectOne(event, order.id)}
                            value={selectedPengiriman.indexOf(order.id) !== -1}
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
                        <TableCell className={classes.uppercase}>
                          {order.nama_pengiriman}
                        </TableCell>
                        <TableCell>
                          <SwitchActive
                            active={order.aktif}
                            id={order.id}
                            url="/api/pengiriman"
                            trigger="PENGIRIMAN_TRIGGER"
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
            count={pengiriman.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar
        selected={selectedPengiriman}
        onClick={handleClickOpenDelete}
      />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  pengiriman: PropTypes.array.isRequired
};

Results.defaultProps = {
  pengiriman: []
};

export default Results;
