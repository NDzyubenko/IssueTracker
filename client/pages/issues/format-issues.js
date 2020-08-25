export const formatIssues = (state) => {
  const issues = state.issues.all;
  const users = state.users.all;
  return issues.map((issue) => {
    const {
      assignedTo,
      createdBy,
      createdOn,
    } = issue;
    
    const assignedToUser = users.find(user => user.id === assignedTo);
    const createdByUser = users.find(user => user.id === createdBy);

    return {
      ...issue,
      assignedTo: assignedToUser ? assignedToUser.name : assignedTo,
      createdBy: createdByUser ? createdByUser.name : createdBy,
      createdOn: new Date(createdOn).toLocaleString(),
    };
  });
}