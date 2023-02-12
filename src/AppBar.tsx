import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Collection } from './models/collection.model';
import { useCollection } from './context/collectionContext';
import { CollectionActionEnum } from './state/collectionActionEnum';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const filterOptions = createFilterOptions();



export default function SearchAppBar(props) {
    const data = useCollection();


    const filterOptions = createFilterOptions<Collection>({
        matchFrom: 'any',
        limit: 5,
        stringify: (option) => option.label,
      });
     
    const handleAutocompleteValue = (value) => {
      props.dispatch({type: CollectionActionEnum.SELECT, value})
    }

  return (
    <Box sx={{ flexGrow: 1, "& .MuiToolbar-root": {height: '75px'} }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Solana
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
                <Autocomplete
                    options={data.list}
                    onChange={(_event, value) => handleAutocompleteValue(value)}
                    sx={{ width: 300, paddingLeft: 5,
                            border: 'none',
                            color: '#fff',
                            "& .MuiFormLabel-root": {color: '#fff'},
                            "& .MuiAutocomplete-focused": {color: '#fff'}
                        }}
                    filterOptions={filterOptions}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} 
                            key={option.id}>
                            <img
                            loading="lazy"
                            width="20"
                            src={option.image}
                            alt=""
                            />
                        {option.label}
                      </Box>
                        )}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{border: 'none', color: '#fff', "& fieldset": { border: 'none' }}}
                        label="Add a collection..."
                        variant="outlined"
                    />
                    )}/>
            </Search>
         </Toolbar>
      </AppBar>
    </Box>
  );
}