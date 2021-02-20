import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const AutoComplete = ({ options, handleSelected }) => {
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // (async () => {
    //   const response = await fetch(
    //     'https://country.register.gov.uk/records.json?page-size=5000'
    //   );
    //   await sleep(1e3); // For demo purposes.
    //   const countries = await response.json();

    //   if (active) {
    //     setOptions(Object.keys(countries).map(key => countries[key].item[0]));
    //   }
    // })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    // if (!open) {
    //   setOptions([]);
    // }
  }, [open]);
  return (
    <Autocomplete
      id="customers-list"
      style={{ width: 300 }}
      open={open}
      onChange={handleSelected}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => `${option.nama_depan} ${option.nama_belakang}`}
      options={options}
      loading={loading}
      fullWidth
      renderInput={params => (
        <TextField
          {...params}
          label="Pelanggan"
          variant="outlined"
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
