/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

const InputField = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <Input
        defaultValue={carInfo?.[item.name]}
        required={item.required}
        name={item?.name}
        type={item.fieldType}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  );
};

export default InputField;
