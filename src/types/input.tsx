import { OptionHTMLAttributes } from 'react';

export interface Input {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: OptionHTMLAttributes<HTMLOptionElement>[];
}
