import React from 'react';
import style from './index.module.css';
import {useRouter} from 'next/router';

const SearchResults = () => {
  const {query} = useRouter();
  const {name} = query;

  // This is just an example: http://localhost:3000/search/results?name=bruno

  return (
    <div className={style.test}>
      <h1>ErrorPage</h1>
      <p>{name && name}</p>
      {/* This should show bruno */}
    </div>
  );
};

export default SearchResults;
