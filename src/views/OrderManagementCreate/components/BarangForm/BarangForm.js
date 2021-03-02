import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { FieldArray, Field } from 'formik';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'formik-material-ui';

const BarangForm = ({ ...props }) => {
  const defaultProps = {
    m: 1,
    border: 1,
    style: {
      width: 'auto',
      height: 'auto',
      padding: '20px',
      borderRadius: '5px'
    }
  };
  return (
    <>
      <FieldArray
        name="barang"
        render={arrayHelpers => (
          <>
            {props.values.barang.length > 0 &&
              props.values.barang.map((b, index) => (
                <>
                  <Box color="grey.500" {...defaultProps} key={index}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Field
                          component={TextField}
                          style={{ width: '100%' }}
                          name={`barang.${index}.nama_barang`}
                          type="text"
                          variant="outlined"
                          label="Nama Barang"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={9} lg={9}>
                        <FieldArray name={`barang.${index}.kerusakan`}>
                          {({ push, remove }) => (
                            <>
                              {b.kerusakan.length > 0 &&
                                b.kerusakan.map((k, i) => (
                                  <>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <Field
                                          component={TextField}
                                          style={{ width: '100%' }}
                                          name={`barang.${index}.kerusakan.${i}.nama_kerusakan`}
                                          type="text"
                                          variant="outlined"
                                          label="Nama Kerusakan"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8} lg={8}>
                                        <FieldArray
                                          name={`barang.${index}.kerusakan.${i}.sparepart`}>
                                          {({ push, remove }) => (
                                            <>
                                              {k.sparepart.length > 0 &&
                                                k.sparepart.map((s, j) => (
                                                  <Grid container spacing={1}>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                      sm={12}
                                                      md={5}
                                                      lg={5}>
                                                      <Field
                                                        component={TextField}
                                                        style={{
                                                          width: '100%'
                                                        }}
                                                        name={`barang.${index}.kerusakan.${i}.sparepart.${j}.nama_sparepart`}
                                                        type="text"
                                                        variant="outlined"
                                                        label="Nama Sparepart"
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                      sm={12}
                                                      md={5}
                                                      lg={5}>
                                                      <Field
                                                        component={TextField}
                                                        style={{
                                                          width: '100%'
                                                        }}
                                                        name={`barang.${index}.kerusakan.${i}.sparepart.${j}.harga`}
                                                        type="text"
                                                        variant="outlined"
                                                        label="Harga"
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                      sm={12}
                                                      md={1}
                                                      lg={1}>
                                                      {j > 0 ? (
                                                        <Button
                                                          color="red.500"
                                                          size="small"
                                                          onClick={() =>
                                                            remove(j)
                                                          }>
                                                          <RemoveIcon />
                                                        </Button>
                                                      ) : (
                                                        ''
                                                      )}
                                                      <Button
                                                        color="primary"
                                                        size="small"
                                                        onClick={() =>
                                                          push({
                                                            nama_sparepart: '',
                                                            harga: ''
                                                          })
                                                        }>
                                                        <AddIcon />
                                                      </Button>
                                                    </Grid>
                                                  </Grid>
                                                ))}
                                            </>
                                          )}
                                        </FieldArray>
                                      </Grid>
                                    </Grid>
                                    {i > 0 ? (
                                      <Button
                                        color="secondary"
                                        onClick={() => remove(i)}>
                                        <RemoveIcon /> Hapus Kerusakan
                                      </Button>
                                    ) : (
                                      ''
                                    )}
                                  </>
                                ))}
                              <Button
                                color="primary"
                                onClick={() =>
                                  push({
                                    nama_kerusakan: '',
                                    sparepart: [
                                      { nama_sparepart: '', harga: '' }
                                    ]
                                  })
                                }>
                                <AddIcon /> Tambah Kerusakan
                              </Button>
                            </>
                          )}
                        </FieldArray>
                      </Grid>
                    </Grid>
                  </Box>
                  {index > 0 ? (
                    <Button
                      color="secondary"
                      onClick={() => arrayHelpers.remove(index)}>
                      <RemoveIcon /> Hapus Barang
                    </Button>
                  ) : (
                    ''
                  )}
                </>
              ))}
            <Button
              color="primary"
              onClick={() =>
                arrayHelpers.push({
                  nama_barang: '',
                  kerusakan: [
                    {
                      nama_kerusakan: '',
                      sparepart: [{ nama_sparepart: '', harga: '' }]
                    }
                  ]
                })
              }>
              <AddIcon /> Tambah Barang
            </Button>
          </>
        )}
      />
    </>
  );
};

export default BarangForm;
