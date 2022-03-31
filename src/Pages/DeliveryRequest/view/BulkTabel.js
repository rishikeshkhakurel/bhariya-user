import React from "react";
import BulkTabelContainer from "./BulkTabelContainer";

const BulkTabel = () => {
  return (
    <div className="bulktabel">
      <div className="bulktabel__navigation">
        <span>Request delivery Forms {">"} Bulk option</span>
      </div>
      <div className="bulktabel__navigation__heading">
        <h1>Bulk Option table</h1>
      </div>
      <div className="bulktabel__table">
        <BulkTabelContainer />
      </div>
    </div>
  );
};

export default BulkTabel;
