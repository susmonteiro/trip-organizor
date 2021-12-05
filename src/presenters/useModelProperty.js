import * as React from 'react';

export default function UseModelProperty(model, propertyName) {
  const [value, setValue] = React.useState(model[propertyName]);
  React.useEffect(
    function () {
      function obs() {
        setValue(model[propertyName]);
      }
      model.addObserver(obs); // 1. subscribe
      return function () {
        model.removeObserver(obs);
      }; // 2.unsubscribe
    },
    [model]
  ); //  stricter: [props.model] !
  return value;
}
