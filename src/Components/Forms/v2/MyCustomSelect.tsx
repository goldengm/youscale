import React, { useState, useRef, useEffect } from "react";
import styles from "./YourStyles.module.css"; // Import your CSS module
import formstyles from "./form.module.css";
import { FieldError } from "react-hook-form/dist/types/errors";

import cx from "classnames";
import { UseFormSetValue } from "react-hook-form";

import { DropdownOptionType } from "../../../models";

type Inputs = {
  [key: string]: string | number | boolean;
  // nom: string;
  // telephone: string;
  // prix: string;
  // adresse: string;
  // reportedDate: string;
  // message: string;
  // id_city: string;
  // status: string;
  // source: string;
  // updownsell: string;
  // changer: string;
  // ouvrir: string;
};

// type DropdownOptionType = {
//   label: string;
//   value: string;
// };

interface Props {
  label: string;
  defaultValue?: DropdownOptionType;
  //name: string;
  // register: UseFormRegister<any>;
  // className?: string;
  error?: FieldError | undefined;
  options: DropdownOptionType[];
  // defaultSelected?: string | number | null;
  onChange: (value: DropdownOptionType) => void;
  //setValue?: UseFormSetValue<Inputs>;
  // confirmation?: boolean;
  // selectedStatus?: string | undefined;
  // setSelectedStatus?: any;
}

const CustomSelect = ({
  options,
  onChange,
  label,
  error,
  defaultValue,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<DropdownOptionType>({
    label: "",
    value: "",
  });

  useEffect(() => {
    if (defaultValue) {
      setSelectedOptions(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue?.value, defaultValue?.label]);

  const [display, setIsDisplay] = useState<boolean>(false);

  const elementRef = useRef<HTMLDivElement>(null);

  // console.log(options);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: DropdownOptionType) => {
    //const isSelected = selectedOptions.includes(value);
    // const newSelectedOptions = isSelected
    //   ? selectedOptions.filter((selected) => selected !== value)
    //   : [...selectedOptions, value];

    // const newSelectedOptions = isSelected
    //   ? selectedOptions.filter((selected) => selected !== value)
    //   : [value];

    setSelectedOptions(value);
    onChange(value);
  };

  //console.log(selectedOptions);

  return (
    <div className={styles.customSelect}>
      <label className={formstyles.label}>{label}</label>
      <div
        className={cx(
          { [formstyles["error-input"]]: error },
          { [styles.open]: isOpen },
          { [styles.selectHeader]: true }
        )}
        //className={`${styles.selectHeader} ${isOpen ? styles.open : ""}`}
        onClick={toggleSelect}
      >
        <span className={styles.selectLabel}>
          {selectedOptions.label.length > 0
            ? `${selectedOptions.label}`
            : "Select option"}
        </span>
        <div className={styles.arrow}></div>
      </div>
      {isOpen && (
        <div ref={elementRef} className={styles.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={cx(
                { [styles.option]: true },
                { [styles.items]: true },
                { [styles.itemLabel]: true },
                //{ [styles.selected]: selectedOptions.includes(option.value) }
                { [styles.selected]: selectedOptions.value == option.value }
              )}
              //className={`${styles.option} ${selectedOptions.includes(option.value) ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
              {/* <input
                className={cx(
                  { [styles.itemCheckbox]: true }
                  //{ [styles.checked]: selectedOptions.includes(option.value) }
                  //{ [styles.itemLabel]: true },
                  //{ [styles.selected]: selectedOptions.includes(option.value) }
                )}
                //className={styles.itemCheckbox}
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionClick(option.value)}
              /> */}
              <div
                className={cx(
                  { [styles.checked]: selectedOptions.value == option.value },
                  {
                    [styles.itemCheckbox]: true,
                  }
                  //{ [styles.itemLabel]: true },
                  //{ [styles.selected]: selectedOptions.includes(option.value) }
                )}
                //className={styles.checked}
              />
            </div>
          ))}
        </div>
      )}
      {error && <p className={formstyles.error}>{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
