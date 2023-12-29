import { useState, useRef, useEffect } from "react";
import style from "./Filter.module.css";
import { IconType } from "react-icons/lib";

type dataType = {
  id: number;
  label: string | undefined;
  value: string;
};

// const DEFAULT_VALUE: dataType[] = [
//   { label: "One", value: "1", id: 1 },
//   { label: "Two", value: "2", id: 2 },
//   { label: "Three", value: "3", id: 3 },
// ];

interface Props {
  Icons: IconType;
  label: string;
  data?: dataType[];
  onChange: ({ label, value }: dataType) => void;
  count: number;
  filteredValue: dataType | undefined;
}

interface ItemsProps {
  isChecked?: boolean;
  setTitle?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChange?: ({ label, value }: dataType) => void;
  defaultLabel: string | undefined;
  label: string | undefined;
  value: string;
  id: number;
  filteredValue: dataType | undefined;
}

interface DisplayProps {
  elementRef: React.RefObject<HTMLDivElement>;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: dataType[];
  defaultLabel: string | undefined;
  onChange: ({ label, value }: dataType) => void;
  label: string | undefined;
  Allcount: number;
  filteredValue: dataType | undefined;
}

export const OrderFilter = ({
  Icons,
  label,
  onChange,
  data = [],
  count,
  filteredValue,
}: Props): JSX.Element => {
  const [defaultLabel, setDefaultLabel] = useState<string | undefined>(
    filteredValue?.label
  );
  const [title, setTitle] = useState<string | undefined>(filteredValue?.label);
  const [display, setIsDisplay] = useState<boolean>(false);

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle(filteredValue?.label);
  }, [data, filteredValue]);

  // ////console.log(data);
  // ////console.log(filteredValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsDisplay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //////console.log(title)

  return (
    <div>
      <div className={style.orderFilterContainer}>
        <div
          onClick={(e) => setIsDisplay(!display)}
          className={style.orderFilter}
        >
          <Icons size={20} className={style.logo} />
          <p>{`${title}`}</p>
          {/* {!filteredValue && <p>{`${title}`}</p>}
          {filteredValue && <p>{`${title}`}</p>} */}
        </div>
        {display && (
          <Display
            onChange={onChange}
            elementRef={elementRef}
            defaultLabel={defaultLabel}
            setTitle={setTitle}
            data={data}
            label={title}
            Allcount={count}
            filteredValue={filteredValue}
          />
        )}
      </div>
    </div>
  );
};

const Display = ({
  elementRef,
  defaultLabel,
  setTitle,
  data,
  onChange,
  label,
  Allcount,
  filteredValue,
}: DisplayProps): JSX.Element => {
  // ////console.log(filteredValue);
  // ////console.log(data);
  return (
    <div ref={elementRef} className={style.display}>
      {/* <Items
        label={`Tous les status (${Allcount})`}
        id={0}
        isChecked={label == defaultLabel}
        defaultLabel={defaultLabel}
        setTitle={setTitle}
        onChange={onChange}
        value=""
      /> */}
      {data.map((dt, key) => (
        <Items
          key={key}
          id={dt.id}
          label={dt.label}
          //isChecked={filteredValue.label == dt.label || label == defaultLabel}
          isChecked={filteredValue?.id == 0 || filteredValue?.id == dt.id}
          defaultLabel={defaultLabel}
          setTitle={setTitle}
          value={dt.value}
          onChange={onChange}
          filteredValue={filteredValue}
        />
      ))}
    </div>
  );
};

const Items = ({
  isChecked,
  label,
  setTitle,
  defaultLabel,
  onChange,
  value,
  id,
  filteredValue,
}: ItemsProps): JSX.Element => {
  const onCheck = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const element = document.querySelectorAll(`.${style.items}`);

    // for (const elem of element) elem.classList.remove(style.checked)

    e.currentTarget.classList.add(style.checked);
    if (label == "Tout") {
      setTitle && setTitle(defaultLabel);
    } else {
      setTitle && setTitle(label);
    }
    onChange && onChange({ label, value, id });
  };

  return (
    <div
      onClick={onCheck}
      className={`${style.items} ${isChecked ? style.checked : ""}`}
    >
      <div className={style.itemLabel}>{label}</div>
      <div className={style.itemCheckbox} />
    </div>
  );
};
