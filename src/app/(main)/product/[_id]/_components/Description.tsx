'use client';
import React from 'react';
import SunEditor from 'suneditor-react';

const Description = ({ description = '' }) => {
   return <SunEditor hideToolbar readOnly defaultValue={description} />;
};

export default Description;
