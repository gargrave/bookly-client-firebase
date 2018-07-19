// @flow
import React, { Fragment } from 'react';
import { array, func, string } from 'prop-types';

import type { Author } from '../../../flowtypes';

import Alert from '../../../../common/components/Alert/Alert';
import AuthorList from '../../../components/AuthorList/AuthorList';
import InputField from '../../../../common/components/InputField/InputField';

type Props = {
  authors: Author[],
  onAuthorClick: Function,
  onInputChange: Function,
  searchValue: string,
};

const AuthorsListVerified = ({
  authors,
  onAuthorClick,
  onInputChange,
  searchValue,
}: Props) => {
  return (
    <Fragment>
      <InputField
        boundValue={searchValue}
        name="searchValue"
        onInputChange={onInputChange}
        placeholder={'Filter by author name...'}
        type="search"
      />
      {searchValue &&
        <Alert
          message={`Showing results matching "${searchValue}"`}
          type="info"
        />
      }
      <AuthorList
        authors={authors}
        filterBy={searchValue}
        onAuthorClick={onAuthorClick}
      />
    </Fragment>
  );
};

AuthorsListVerified.propTypes = {
  authors: array,
  onAuthorClick: func.isRequired,
  onInputChange: func.isRequired,
  searchValue: string,
};

export default AuthorsListVerified;
