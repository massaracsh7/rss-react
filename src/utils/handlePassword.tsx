type Props = string | undefined;

export const handlePassword = (err: Props, password: Props) => {
  if (err?.includes('is a required field')) {
    return ['no password', 'red'];
  }
  if (err?.includes('Must Contain One Uppercased Character')) {
    return ['weak password', 'red'];
  }
  if (err?.includes('Must Contain One Number Character')) {
    return ['weak password', 'red'];
  }
  if (err?.includes('Must Contain  One Special Case Character')) {
    return ['average password', 'orange'];
  }
  if (err?.includes('Must Contain  One Special Case Character')) {
    return ['average password', 'orange'];
  }
  if ((!err || err?.includes('Must Contain 8 Characters')) && password) {
    return ['strong password', 'green'];
  }
};
