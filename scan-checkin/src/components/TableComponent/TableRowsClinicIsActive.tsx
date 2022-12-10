import React from "react";

interface TableRowsClinicIsActiveProps {
  content: boolean;
}

const TableRowsClinicIsActive: React.FC<TableRowsClinicIsActiveProps> = ({
  content,
}) => {
  return <>{content ? "Hoạt động" : "Bị khoá"}</>;
};

export default TableRowsClinicIsActive;
