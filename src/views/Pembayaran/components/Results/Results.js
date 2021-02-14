import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Switch,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  colors
} from '@material-ui/core';

import { Label, GenericMoreButton, TableEditBar } from 'components';

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
  }
}));

const Results = props => {
  const { className, metode, ...rest } = props;

  const classes = useStyles();

  const [selectedMetode, setSelectedMetode] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedMetode = event.target.checked ? metode.map(m => m.id) : [];

    setSelectedMetode(selectedMetode);
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

  const activeColors = {
    false: colors.grey[600],
    true: colors.green[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
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
                    <TableCell>Nama Metode</TableCell>
                    <TableCell>Aktif</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metode.slice(firstIndex, lastIndex).map(order => (
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
                        <img src={order.image} className={classes.images} />
                      </TableCell>
                      <TableCell>{order.nama}</TableCell>
                      <TableCell>
                        <Switch
                          checked={order.active}
                          color="primary"
                          name="aktif"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Label color={activeColors[order.active]}>
                          {order.active ? 'Aktif' : 'Tidak Aktif'}
                        </Label>
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
      <TableEditBar selected={selectedMetode} />
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
