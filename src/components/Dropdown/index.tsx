import {useState} from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({
  onSelect
}: {
  onSelect: (value: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  const handleSelect = (value: string) => {
    setSelectedItem(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 focus:outline-none flex items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedItem}<IoMdArrowDropdown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-24 bg-white border border-gray-300 rounded shadow-lg">
          {["All", "True", "False"].map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
