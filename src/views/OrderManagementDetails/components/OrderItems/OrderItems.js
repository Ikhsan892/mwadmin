import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Tooltip
} from '@material-ui/core';
import client from 'utils/axios';
import Delete from '@material-ui/icons/Delete';
import { StackAvatars, GenericToggleMenu, ComponentsGuard } from 'components';
import { useDispatch } from 'react-redux';
import { getComparator, stableSort } from 'utils/sortable';
import ModalDetail from '../ModalDetail';
import ModalFormBarang from '../ModalFormBarang';
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
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
    id: 'spesifikasi',
    label: 'Spesifikasi'
  },
  {
    id: 'merk',
    label: 'Merk'
  },
  {
    id: 'teknisi',
    label: 'Teknisi'
  }
];

const OrderItems = props => {
  const { barang, className, order, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedBarang, setSelectedBarang] = React.useState([]);
  const [detail, setDetail] = React.useState({ title: '', open: false, id: 0 });
  const [edit, setEdit] = React.useState({ title: '', open: false, id: 0 });
  const [Order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nama_role');

  const handleSelectAll = event => {
    const selectedBarang = event.target.checked
      ? barang.map(barang => barang.id)
      : [];

    setSelectedBarang(selectedBarang);
  };

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Open Detail
  const handleDetail = id => {
    setDetail(prevState => {
      return { ...prevState, title: 'Detail Barang', open: true, id: id };
    });
  };

  /**
   * Get ID Data
   */
  const getDetail = useCallback(
    async (formikRef, id) => {
      const response = await client.get(`/api/barang/${id}`);
      formikRef.current.setFieldValue(
        'nama_barang',
        response.data.nama_barang || ''
      );
      formikRef.current.setFieldValue(
        'teknisi',
        response.data.teknisi.map(i => i.id) || []
      );
      formikRef.current.setFieldValue('merk', response.data.merk || '');
      formikRef.current.setFieldValue(
        'spesifikasi',
        response.data.spesifikasi || ''
      );

      formikRef.current.setFieldValue('keluhan', response.data.keluhan || '');
      formikRef.current.setFieldValue(
        'jenis_barang',
        response.data.jenis_barang || ''
      );
      formikRef.current.setFieldValue('id', response.data.id || 0);
      return response;
    },
    [edit.open]
  );

  // Open Edit
  const handleEdit = id => {
    setEdit(prevState => {
      return { ...prevState, title: 'Edit Barang', open: true, id: id };
    });
  };

  const deleteData = async () => {
    if (selectedBarang.length > 0) {
      let isConfirmed = window.confirm(
        'Yakin mau dihapus, karena tidak bisa diundo'
      );
      if (isConfirmed) {
        client
          .delete('/api/barang', {
            data: {
              id: selectedBarang
            }
          })
          .then(data => {
            setSelectedBarang([]);
            alert('berhasil dihapus');
            dispatch({ type: 'BARANG_TRIGGER' });
          })
          .catch(err => {
            alert('error delete barang');
          });
      }
    } else {
      alert('Data yang mau di delete mana ?');
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBarang.indexOf(id);
    let newselectedBarang = [];

    if (selectedIndex === -1) {
      newselectedBarang = newselectedBarang.concat(selectedBarang, id);
    } else if (selectedIndex === 0) {
      newselectedBarang = newselectedBarang.concat(selectedBarang.slice(1));
    } else if (selectedIndex === selectedBarang.length - 1) {
      newselectedBarang = newselectedBarang.concat(selectedBarang.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedBarang = newselectedBarang.concat(
        selectedBarang.slice(0, selectedIndex),
        selectedBarang.slice(selectedIndex + 1)
      );
    }

    setSelectedBarang(newselectedBarang);
  };

  return (
    <>
      <ModalFormBarang
        title={edit.title}
        open={edit.open}
        id={edit.id}
        order={order}
        getDetail={getDetail}
        action="edit"
        handleClose={() =>
          setEdit(prevState => {
            return { ...prevState, open: false, title: '' };
          })
        }
      />
      <ModalDetail
        title={detail.title}
        open={detail.open}
        id={detail.id}
        handleClose={() =>
          setDetail(prevState => {
            return { ...prevState, open: false, title: '', id: 0 };
          })
        }
      />
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          title="List Barang"
          action={
            selectedBarang.length > 0 ? (
              <ComponentsGuard roles={['teknisi']}>
                <Tooltip title="Hapus Data" placement="bottom">
                  <IconButton onClick={deleteData}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </ComponentsGuard>
            ) : (
              ''
            )
          }
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <ComponentsGuard roles={['TEKNISI']}>
                        <Checkbox
                          checked={selectedBarang.length === barang.length}
                          color="primary"
                          indeterminate={
                            selectedBarang.length > 0 &&
                            selectedBarang.length < barang.length
                          }
                          onChange={handleSelectAll}
                        />
                      </ComponentsGuard>
                    </TableCell>
                    {headerTable.map(i => (
                      <TableCell
                        key={i.id}
                        sortDirection={orderBy === i.id ? Order : false}>
                        <TableSortLabel
                          active={orderBy === i.id}
                          direction={orderBy === i.id ? Order : 'asc'}
                          onClick={() => createSortHandler(i.id)}>
                          {i.label}
                          {orderBy === i.id ? (
                            <span className={classes.visuallyHidden}>
                              {Order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(barang, getComparator(Order, orderBy)).map(
                    item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <ComponentsGuard roles={['TEKNISI']}>
                            <Checkbox
                              checked={selectedBarang.indexOf(item.id) !== -1}
                              color="primary"
                              onChange={event =>
                                handleSelectOne(event, item.id)
                              }
                              value={selectedBarang.indexOf(item.id) !== -1}
                            />
                          </ComponentsGuard>
                        </TableCell>
                        <TableCell>{item.nama_barang}</TableCell>
                        <TableCell>{item.spesifikasi}</TableCell>
                        <TableCell>{item.merk}</TableCell>
                        <TableCell>
                          <StackAvatars avatars={item.teknisi} limit={4} />
                        </TableCell>
                        <TableCell>
                          <GenericToggleMenu
                            handleDetail={() => handleDetail(item.id)}
                            handleEdit={() => handleEdit(item.id)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </>
  );
};

OrderItems.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderItems;
