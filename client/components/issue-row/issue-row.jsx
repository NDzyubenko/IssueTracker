import React from 'react';

export const IssueRow = ({
  id,
  type,
  title,
  description,
  assignedTo,
  createdBy,
  state,
  createdOn,
  onRowClick = () => {},
}) => (
  <tr
    className="issue"
    onClick={() => onRowClick(id)}  
  >
    <td>{type}</td>
    <td>{title}</td>
    <td>{description}</td>
    <td>{assignedTo}</td>
    <td>{createdBy}</td>
    <td>{state}</td>
    <td>{createdOn}</td>
  </tr>
);
