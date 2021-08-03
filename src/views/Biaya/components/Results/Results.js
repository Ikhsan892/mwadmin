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
import EditIcon from '@material-ui/icons/Edit';
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
import rupiahFormat from 'rupiah-format';
import client from 'utils/axios';
import { getComparator, stableSort } from 'utils/sortable';
import ModalBiaya from '../ModalBiaya';

const useStyles = makeStyles(theme => ({
  root: {},
  filterButton: {
    marginRight: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  capitalize: {
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
    id: 'nama_biaya',
    label: 'Nama Biaya'
  },
  {
    id: 'biaya_ditaksir',
    label: 'Biaya Ditaksir'
  },
  {
    id: 'is_utama',
    label: 'Jadi Utama'
  }
];

const Results = props => {
  const { className, biaya, search, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedBiaya, setSelectedBiaya] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_biaya');
  const [url, setUrl] = useState('http://localhost:3000/api/biaya-tambahan');
  const [open, setOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [title, setTitle] = useState('Tambahan Biaya Tambahan');

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedBiaya = event.target.checked ? biaya.map(m => m.id) : [];

    setSelectedBiaya(selectedBiaya);
  };

  const handleOpenEdit = id => {
    setUrl(`http://localhost:3000/api/biaya-tambahan/${id}`);
    setOnEdit(true);
    setTitle('Edit Biaya Tambahan');
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    let delete_data = window.confirm('Are you sure wants to delete this data');
    if (delete_data) {
      let body = {
        id: selectedBiaya
      };
      client
        .delete(`/api/biaya-tambahan`, {
          data: body
        })
        .then(data => {
          setSelectedBiaya([]);
          dispatch({ type: 'BIAYA_TRIGGER' });
        })
        .catch(err => console.log(err));
    }
  };

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleList = () => {
    return search.length > 0 ? search : biaya;
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBiaya.indexOf(id);
    let newSelectedBiaya = [];

    if (selectedIndex === -1) {
      newSelectedBiaya = newSelectedBiaya.concat(selectedBiaya, id);
    } else if (selectedIndex === 0) {
      newSelectedBiaya = newSelectedBiaya.concat(selectedBiaya.slice(1));
    } else if (selectedIndex === selectedBiaya.length - 1) {
      newSelectedBiaya = newSelectedBiaya.concat(selectedBiaya.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBiaya = newSelectedBiaya.concat(
        selectedBiaya.slice(0, selectedIndex),
        selectedBiaya.slice(selectedIndex + 1)
      );
    }

    setSelectedBiaya(newSelectedBiaya);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  const activeColors = {
    false: colors.grey[600],
    true: colors.green[600]
  };
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <ModalBiaya
        open={open}
        url={url}
        onEdit={onEdit}
        title={title}
        handleClose={() => setOpen(false)}
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {biaya.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(biaya.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Biaya Tambahan" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedBiaya.length === biaya.length}
                        color="primary"
                        indeterminate={
                          selectedBiaya.length > 0 &&
                          selectedBiaya.length < biaya.length
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
                        selected={selectedBiaya.indexOf(order.id) !== -1}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedBiaya.indexOf(order.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, order.id)}
                            value={selectedBiaya.indexOf(order.id) !== -1}
                          />
                        </TableCell>
                        <TableCell className={classes.capitalize}>
                          {order.nama_biaya}
                        </TableCell>
                        <TableCell>
                          {rupiahFormat
                            .convert(order.biaya_ditaksir)
                            .replace(',00', ',-')}
                        </TableCell>
                        <TableCell>
                          <SwitchActive
                            active={order.is_utama}
                            id={order.id}
                            url="/api/biaya-tambahan"
                            trigger="BIAYA_TRIGGER"
                          />
                        </TableCell>
                        <TableCell>
                          <Label color={activeColors[order.is_utama]}>
                            {order.is_utama ? 'Utama' : 'Tidak Utama'}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleOpenEdit(order.id)}>
                            <EditIcon />
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
            count={biaya.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedBiaya} onClick={handleClickOpenDelete} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  biaya: PropTypes.array.isRequired
};

Results.defaultProps = {
  biaya: []
};

export default Results;
