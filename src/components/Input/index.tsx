import { useCallback, useRef, useState } from "react";

import { Container } from "./styles";

interface InputProps {
  name?: string;
  placeholder?: string;
  value?: string;
  onchange?: (e: any) => void;
}

export function Input({ name, placeholder, value, onchange }: InputProps) {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef?.current);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {Icon && <Icon size={20} />} */}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
    </Container>
  );
}
