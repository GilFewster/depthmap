class State {
  private _value;
  constructor(defaultValue) {
    this._value = defaultValue;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

export const useState = (defaultValue) => {
  const state = new State(defaultValue);

  const getValue = () => state.value;
  const setValue = (newValue) => (state.value = newValue);

  return [getValue, setValue];
};
