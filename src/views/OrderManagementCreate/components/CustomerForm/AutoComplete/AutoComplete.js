import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const AutoComplete = ({
  label,
  options,
  handleSelected,
  showingLabel,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    // if (!open) {
    //   setOptions([]);
    // }
  }, [open]);
  return (
    <Autocomplete
      {...props}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>
        option[showingLabel] === value[showingLabel]
      }
      getOptionLabel={option =>
        label === 'Pelanggan'
          ? `${option.nama_depan} ${option.nama_belakang}`
          : option[showingLabel]
      }
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={props.error}
          helperText={props.helperText}
          onBlur={props.onBlur}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default AutoComplete;
