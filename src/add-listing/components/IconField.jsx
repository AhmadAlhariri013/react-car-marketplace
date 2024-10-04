/* eslint-disable react/prop-types */
// import { FaClipboardList } from "react-icons/fa6";
// import { FaTag } from "react-icons/fa6";
// import { MdOutlinePriceCheck } from "react-icons/md";
// import { FaHandHoldingDollar } from "react-icons/fa6";
// import { FaIdCard } from "react-icons/fa6";
// import { MdDescription } from "react-icons/md";
// import { FaTags } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { IoLogoModelS } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRoad } from "react-icons/fa6";
import { GiGears } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa6";
import { PiEngineFill } from "react-icons/pi";
import { IoMdSpeedometer } from "react-icons/io";
import { IoIosColorPalette } from "react-icons/io";
import { PiCylinderFill } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";

const iconMap = {
  FaCar: <FaCar />,
  FaCheckCircle: <FaCheckCircle />,
  FaIndustry: <MdAnalytics />,
  FaCarSide: <IoLogoModelS />,
  FaCalendarAlt: <FaCalendarAlt />,
  FaRoad: <FaRoad />,
  FaCogs: <GiGears />,
  FaGasPump: <FaGasPump />,
  FaWrench: <PiEngineFill />,
  FaTachometerAlt: <IoMdSpeedometer />,
  FaPalette: <IoIosColorPalette />,
  FaCircle: <PiCylinderFill />,
  FaDoorClosed: <GiCarDoor />,
};

function IconField({ icon }) {
  return (
    <div className="text-primary bg-blue-100 p-1.5 rounded-full">
      {iconMap[icon]}
    </div>
  );
}

export default IconField;
