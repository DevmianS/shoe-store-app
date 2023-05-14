import {forwardRef, useState} from 'react';
import {Search, SearchIconWrapper, StyledInputBase} from './styles';

const Searchbar = forwardRef(({searchExpanded, setSearchExpanded}, ref) => {
  const [input, setInput] = useState('');

  const handleInput = event => {
    setInput(event.target.value);
  };

  return (
    <Search
      onClick={() => setSearchExpanded(true)}
      onBlur={() => setSearchExpanded(false)}
      onChange={event => handleInput(event)}
      sx={{
        display: {
          xs: searchExpanded ? 'flex' : 'none',
          md: 'flex',
        },
        transition: 'all 0.7s ease-in-out',
        marginRight: '15px',
        minWidth: {
          xs: searchExpanded ? '90%' : '',
          md: searchExpanded ? '95%' : '0',
        },
      }}
    >
      <SearchIconWrapper>
        <i className="icon-search"></i>
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Search…"
        inputProps={{'aria-label': 'search'}}
        ref={ref}
      />
    </Search>
  );
});

Searchbar.displayName = 'Search';

export default Searchbar;
