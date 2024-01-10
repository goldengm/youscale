import { MultiSelect } from "react-multi-select-component";
import styles from "./input.module.css";
import cx from "classnames";

import "./MultiselectStyles.css";

type OptionsType = {
  label: string;
  value: string | number | undefined;
  quantity?: number;
  variant?: string[];
  allVariant?: string[] | undefined;
}[];
interface MultiSelectElementProps {
  options: { label: string; value: string; allVariant?: string[] }[];
  selected: OptionsType;
  onChange: any;
  className?: string;
  style?: "confirmation" | "default";
}
export default function MultiSelectElement({
  options,
  selected,
  onChange,
  className,
  style,
}: MultiSelectElementProps): JSX.Element {
  const Item = (item: any) => {
    const {
      checked,
      onClick,
      option: { label },
    } = item;
    // console.log(item);

    return (
      <div
        //key={option.value}
        className={cx(
          { [styles.option]: true },
          { [styles.items]: true },
          { [styles.itemLabel]: true },
          { [styles.selected]: checked }
        )}
        onClick={onClick}
      >
        {label}
        <div
          className={cx(
            { [styles.checked]: checked },
            {
              [styles.itemCheckbox]: true,
            }
          )}
        />
      </div>
    );
  };

  return (
    <MultiSelect
      className={`${className} ${
        style === "confirmation" ? styles.confirmation_multiSelect : ""
      }`}
      //className={styles.confirmation_multiSelect}
      options={options}
      value={selected}
      onChange={onChange}
      labelledBy="Sélectionner"
      ItemRenderer={Item}
    />
  );
}
