import { useState } from "react";

export const useForm = () => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange]; // 여기서 가져온값은 다 문자열로 처리되는듯
};
