import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import rupiahFormat from 'rupiah-format';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
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
import EditIcon from '@material-ui/icons/Edit';
import { GenericMoreButton, TableEditBar } from 'components';

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
  const { className, biaya, ...rest } = props;

  const classes = useStyles();

  const [selectedBiaya, setSelectedBiaya] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleSelectAll = event => {
    const selectedBiaya = event.target.checked ? biaya.map(m => m.id) : [];

    setSelectedBiaya(selectedBiaya);
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

  return (
    <div {...rest} className={clsx(classes.root, className)}>
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
                    <TableCell>Nama Biaya</TableCell>
                    <TableCell>Biaya Ditaksir</TableCell>
                    <TableCell>Jadi Utama</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {biaya.slice(firstIndex, lastIndex).map(order => (
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
                      <TableCell>{order.nama}</TableCell>
                      <TableCell>
                        {rupiahFormat.convert(order.biaya).replace(',00', ',-')}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={order.default}
                          color="primary"
                          name="aktif"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button color="primary" variant="outlined">
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
      <TableEditBar selected={selectedBiaya} />
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
