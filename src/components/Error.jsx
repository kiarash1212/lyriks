import React from 'react';

const Error = ({title}) => (
  <div className='w-full flex justify-center items-center'>
    <h1 className='text-2xl text-red-600'>
      {title|| 'Something unexpected happened. Try again.'}
    </h1>
  </div>
);

export default Error;
