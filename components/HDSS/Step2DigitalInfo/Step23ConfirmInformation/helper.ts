export const parseEKYCErrorMessage = (warning: any, listNotAllowed = []) => {
  for (let temp = 0; temp < warning.length; temp++) {
    let errors: any = listNotAllowed.filter((x: any) => x.id === warning[temp]);
    if (errors.length > 0) {
      return errors[0].label;
    }
  }
  return null;
};
