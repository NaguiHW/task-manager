const Switch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
  return (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-200 ${
        checked ? "bg-green-500" : "bg-red-300"
      }`}
      onClick={onChange}
    >
      <span
        className={`inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      ></span>
    </div>
  )
};

export default Switch;
