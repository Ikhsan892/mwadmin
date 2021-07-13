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
import React, { useState } from 'react';
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
    label: 'Nama Role'
  },
  {
    id: 'nama_role',
    label: 'Linked User'
  },
  {
    id: 'previlleges',
    label: 'Previlleges'
  }
];

const Results = props => {
  const { className, role, search, ...rest } = props;

  const classes = useStyles();

  const [selectedRole, setSelectedRole] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_role');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const dispatch = useDispatch();
  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedRole = event.target.checked ? role.map(m => m.id) : [];

    setSelectedRole(selectedRole);
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
        id: selectedRole
      };
      client
        .delete(`/api/role`, {
          data: body
        })
        .then(data => {
          setSelectedRole([]);
          dispatch({ type: 'ROLE_TRIGGER' });
        })
        .catch(err => {
          console.log(err);
          alert('something error while deleting this data');
        });
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRole.indexOf(id);
    let newSelectedRole = [];

    if (selectedIndex === -1) {
      newSelectedRole = newSelectedRole.concat(selectedRole, id);
    } else if (selectedIndex === 0) {
      newSelectedRole = newSelectedRole.concat(selectedRole.slice(1));
    } else if (selectedIndex === selectedRole.length - 1) {
      newSelectedRole = newSelectedRole.concat(selectedRole.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRole = newSelectedRole.concat(
        selectedRole.slice(0, selectedIndex),
        selectedRole.slice(selectedIndex + 1)
      );
    }

    setSelectedRole(newSelectedRole);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const handleList = () => {
    return search.length > 0 ? search : role;
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
    false: colors.red[600],
    true: colors.green[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {role.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(role.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="List Role" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRole.length === role.length}
                        color="primary"
                        indeterminate={
                          selectedRole.length > 0 &&
                          selectedRole.length < role.length
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
                  {stableSort(handleList(), getComparator(order, orderBy))
                    .slice(firstIndex, lastIndex)
                    .map(order => (
                      <TableRow
                        key={order.id}
                        selected={selectedRole.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          {order.user.length < 1 ? (
                            <Checkbox
                              checked={selectedRole.indexOf(order.id) !== -1}
                              color="primary"
                              onChange={event =>
                                handleSelectOne(event, order.id)
                              }
                              value={selectedRole.indexOf(order.id) !== -1}
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
            count={role.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedRole} onClick={handleClickOpenDelete} />
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
