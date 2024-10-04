/* eslint-disable react/prop-types */
import { Textarea } from "@/components/ui/textarea";

const TextAreaFeild = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <Textarea
        defaultValue={carInfo?.[item.name]}
        name={item?.name}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        required={item.required}
      />
    </div>
  );
};

export default TextAreaFeild;
