import React from 'react';

// eslint-disable-next-line react/prop-types
const Page = ({ style, children }) => (
  <div style={{ ...styles, ...style }}>{children}</div>
);

const styles = {
  width: '100%',
  height: '100%'
};

export default Page;
