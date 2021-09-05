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
import { Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  GenericMoreButton,
  Label,
  StackAvatars,
  TableEditBar
} from 'components';
import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import client from 'utils/axios';
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
    id: 'nama_role',
    label: 'Nama Barang'
  },
  {
    id: 'nama_role',
    label: 'Harga Beli'
  },
  {
    id: 'previlleges',
    label: 'Harga Jual'
  },
  {
    id: 'previlleges',
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
  const [openEdit, setOpenEdit] = useState(false);
  const [features, setFeatures] = useState([]);
  const [user, setUser] = useState('');
  const [idEdit, setIdEdit] = useState(0);

  const dispatch = useDispatch();
  const firstIndex = useMemo(() => {
    return page * rowsPerPage;
  }, [page]);
  const lastIndex = useMemo(() => {
    return page * rowsPerPage + rowsPerPage;
  }, [page, rowsPerPage]);

  const handleSelectAll = event => {
    const selectedInventory = event.target.checked
      ? inventory.map(m => m.id)
      : [];

    setselectedInventory(selectedInventory);
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
        id: selectedInventory
      };
      client
        .delete(`/api/role`, {
          data: body
        })
        .then(data => {
          setselectedInventory([]);
          dispatch({ type: 'ROLE_TRIGGER' });
        })
        .catch(err => {
          console.log(err);
          alert('something error while deleting this data');
        });
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedInventory.indexOf(id);
    let newselectedInventory = [];

    if (selectedIndex === -1) {
      newselectedInventory = newselectedInventory.concat(selectedInventory, id);
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
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleList = useMemo(() => {
    return search.length > 0 ? search : inventory;
  }, [search, inventory]);

  const handleOpenEdit = (id, user, features) => {
    setOpenEdit(true);
    setUser(user);
    setIdEdit(id);
    setFeatures(features);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setUser('');
    setIdEdit(0);
    setFeatures([]);
  };

  const activeColors = useMemo(() => {
    return {
      false: colors.red[600],
      true: colors.green[600]
    };
  }, []);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {/* <ModalEdit
        open={openEdit}
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
              <Table>
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
                        selected={selectedInventory.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          {order.user.length < 1 ? (
                            <Checkbox
                              checked={
                                selectedInventory.indexOf(order.id) !== -1
                              }
                              color="primary"
                              onChange={event =>
                                handleSelectOne(event, order.id)
                              }
                              value={selectedInventory.indexOf(order.id) !== -1}
                            />
                          ) : (
                            ''
                          )}
                        </TableCell>
                        <TableCell className={classes.name_role}>
                          {order.nama_role}
                        </TableCell>
                        <TableCell>
                          {order.user.length > 0 ? (
                            <StackAvatars avatars={order.user} limit={4} />
                          ) : (
                            '0 users'
                          )}
                        </TableCell>
                        <TableCell>
                          <Label
                            color={
                              activeColors[
                                order.menu.length > 0 ? 'true' : 'false'
                              ]
                            }>
                            {order.menu.length} Previllege
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              aria-label="edit data"
                              onClick={() =>
                                handleOpenEdit(
                                  order.id,
                                  order.nama_role,
                                  order.menu
                                )
                              }>
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
