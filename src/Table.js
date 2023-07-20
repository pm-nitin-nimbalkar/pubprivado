import React, { useState } from 'react';
import OuterAccordion from './OuterAccordion';

const Table = ({data}) => {
  const { countData, domainRecordsMap } = data;
  return (
    <>
      {
      Object.keys(domainRecordsMap).map((domain, index) => {
        let records = domainRecordsMap[domain];
        return (<OuterAccordion
            key={'key-'+index}
            health={countData[domain].error/countData[domain].total}
            domain={domain}
            data={records}>
          </OuterAccordion>);
      })
      }
    </>
  );
};

export default Table;
