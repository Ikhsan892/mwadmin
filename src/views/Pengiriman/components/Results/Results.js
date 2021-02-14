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
  const { className, pengiriman, ...rest } = props;

  const classes = useStyles();

  const [selectedPengiriman, setSelectedPengiriman] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedPengiriman = event.target.checked
      ? pengiriman.map(m => m.id)
      : [];

    setSelectedPengiriman(selectedPengiriman);
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

  const activeColors = {
    false: colors.grey[600],
    true: colors.green[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
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
                    <TableCell>Nama Pengiriman</TableCell>
                    <TableCell>Aktif</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pengiriman.slice(firstIndex, lastIndex).map(order => (
                    <TableRow
                      key={order.id}
                      selected={selectedPengiriman.indexOf(order.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedPengiriman.indexOf(order.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, order.id)}
                          value={selectedPengiriman.indexOf(order.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <img src={order.images} className={classes.images} />
                      </TableCell>
                      <TableCell>{order.pengiriman}</TableCell>
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
            count={pengiriman.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedPengiriman} />
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
