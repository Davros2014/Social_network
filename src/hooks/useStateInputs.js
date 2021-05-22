import { useState } from "react";
export default initialVal => {
  const [value, setValue] = useState(initialVal);
  const onChange = event => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return [value, onChange, reset];
};
