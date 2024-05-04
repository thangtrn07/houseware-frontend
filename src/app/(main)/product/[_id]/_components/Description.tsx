"use client";
import React from "react";
import SunEditor from "suneditor-react";

const Description = ({ description = "" }) => {
   return (
      <SunEditor
         setOptions={{ height: "auto" }}
         hideToolbar
         readOnly
         defaultValue={description}
      />
   );
};

export default Description;
