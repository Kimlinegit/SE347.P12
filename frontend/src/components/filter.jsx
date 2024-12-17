
import React, { useState, useContext } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { GlobalState } from '../globalState.jsx'


function Filter() {
  const state = useContext(GlobalState)
  const [categories] = state.categoryAPI.categories;

  const [category, setCategory] = state.productAPI.category;
  const [sort, setSort] = state.productAPI.sort;
  const [search, setSearch] = state.productAPI.search;


  const handleCategory = e => {
    setCategory(e.target.value)
    setSearch('')
  }

  return (
    <Grid container >
      <Grid item>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          style={{ marginRight: '50px' }}
          value={search || ""}
          onChange={e => setSearch(e.target.value.toLowerCase())} 
          InputProps={{
            endAdornment: <Search />,
          }}
        />
      </Grid>
      <Grid item>
        <FormControl variant="outlined" size="small" style={{ width: '150px', marginRight: '8px' }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select value={sort || ""} onChange={e => setSort(e.target.value)} label="Sort By">
            <MenuItem value="">Mới nhất</MenuItem>
            <MenuItem value="sort=oldest">Cũ nhất</MenuItem>
            <MenuItem value="sort=-sold">Bán chạy</MenuItem>
            <MenuItem value="sort=-price">Giá: cao - thấp</MenuItem>
            <MenuItem value="sort=price">Giá: thấp - cao</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl variant="outlined" size="small" style={{ width: '150px' }}>
          {/* <InputLabel>Filter</InputLabel> */}
          <InputLabel>Lọc</InputLabel>
          <Select value={category || ""} onChange={handleCategory} label="Filter">
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem value={`category=${category._id}`} key={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Filter;

