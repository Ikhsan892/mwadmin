import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
  Checkbox,
  Tooltip
} from '@material-ui/core';
import client from 'utils/axios';
import Delete from '@material-ui/icons/Delete';
import { StackAvatars, GenericToggleMenu, ComponentsGuard } from 'components';
import { useDispatch } from 'react-redux';
import ModalDetail from '../ModalDetail';
import ModalFormBarang from '../ModalFormBarang';
const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  }
}));

const OrderItems = props => {
  const { barang, className, order, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedBarang, setSelectedBarang] = React.useState([]);
  const [detail, setDetail] = React.useState({ title: '', open: false, id: 0 });
  const [edit, setEdit] = React.useState({ title: '', open: false, id: 0 });

  const handleSelectAll = event => {
    const selectedBarang = event.target.checked
      ? barang.map(barang => barang.id)
      : [];

    setSelectedBarang(selectedBarang);
  };

  // Open Detail
  const handleDetail = id => {
    setDetail(prevState => {
      return { ...prevState, title: 'Detail Barang', open: true, id: id };
    });
  };

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
                    <TableCell>Nama Barang</TableCell>
                    <TableCell>Spesifikasi</TableCell>
                    <TableCell>Merk</TableCell>
                    <TableCell>Teknisi</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {barang.map(item => (
                    <TableRow key={item.id}>
                      <TableCell padding="checkbox">
                        <ComponentsGuard roles={['TEKNISI']}>
                          <Checkbox
                            checked={selectedBarang.indexOf(item.id) !== -1}
                            color="primary"
                            onChange={event => handleSelectOne(event, item.id)}
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
                  ))}
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
