

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function FormInput({
  name,
  label,
  type,
  placeholder,
  defaultValue,
}: FormInputProps) {
  return (
    <div>
      <Label htmlFor={name} className=" capitalize ">
        {label || name}
      </Label>
      <Input
        className=" mt-2"
        type={type}
        defaultValue={defaultValue}
        name={name}
        id={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
