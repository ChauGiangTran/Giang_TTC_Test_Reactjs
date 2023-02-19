import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="spinner">
      <Spinner role="status" animation="border" size="sm" variant="secondary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
export default Loading;
