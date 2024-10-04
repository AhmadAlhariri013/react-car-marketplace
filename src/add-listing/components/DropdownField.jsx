/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownField = ({ item, handleInputChange, carInfo }) => {
  return (
    <div>
      <Select
        defaultValue={carInfo?.[item.name]}
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              carInfo?.[item.name] ? carInfo?.[item.name] : item.lable
            }
          />
        </SelectTrigger>
        <SelectContent>
          {item.options.map((option, index) => (
            <SelectItem value={option} key={index}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownField;
