function setRef(ref: any, value: any): any {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export default setRef;
