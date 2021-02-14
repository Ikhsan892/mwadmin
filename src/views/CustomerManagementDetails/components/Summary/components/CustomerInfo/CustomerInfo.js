import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';

import { Label } from 'components';
import { CustomerEdit } from './components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CustomerInfo = props => {
  const { customer, className, ...rest } = props;

  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Info Pelanggan" action={
          <IconButton aria-label="settings" onClick={handleEditOpen}>
            <EditIcon/>
          </IconButton>
        }/>
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                {customer.email}
                <div>
                  <Label
                    color={
                      customer.verified ? colors.green[600] : colors.orange[600]
                    }
                  >
                    {customer.verified
                      ? 'Email Terverifikasi'
                      : 'Email Belum Terverifikasi'}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Telepon</TableCell>
              <TableCell>{customer.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kecamatan</TableCell>
              <TableCell>{customer.kecamatan}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kota / Kabupaten</TableCell>
              <TableCell>{customer.kota_kabupaten}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Provinsi</TableCell>
              <TableCell>{customer.state}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Negara</TableCell>
              <TableCell>{customer.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alamat</TableCell>
              <TableCell>{customer.address1}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CustomerEdit
        customer={customer}
        onClose={handleEditClose}
        open={openEdit}
      />
    </Card>
  );
};

CustomerInfo.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.object.isRequired
};

export default CustomerInfo;
