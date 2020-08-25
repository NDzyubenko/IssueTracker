export const selectEditedIssue = (state) => {
  const issues = state.issues.all;
  const editedIssueId = state.issues.editedId;

  return issues.find(issue => issue.id === editedIssueId);
}
