import React from "react";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FieldError } from "react-hook-form/dist/types/errors";
import styles from "./form.module.css";
import "./form.style.css";

interface Props {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
  error: FieldError | undefined;
  data: { label: string; value: string | number }[];
  defaultSelected?: string | number | null;
  Onchange?: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  confirmation?: boolean;
}
export default function CustumSelectForm({
  label,
  name,
  register,
  error,
  data,
  Onchange,
  defaultSelected = "",
  className,
  confirmation,
}: Props): JSX.Element {

  return (
    <div className={confirmation ? styles.confirmcontainer : styles.container}>
      <div className={confirmation ? styles.confirmform :styles.form}>
        <label className={confirmation ? styles.confirmlabel : styles.label}>
          {label}
        </label>
        <div style={confirmation ? (window.innerWidth > 550 ? { width: "205px" } : { width: "120px" }) : { width: "50%" }}>
          <select
            {...register(name)}
            onChange={Onchange}
            value={defaultSelected?.toString()}
            name={name}
            className={confirmation ? styles.confirmationselect : styles.select}
          >
            {data.map((dt, index) => (
              <option key={index} value={dt.value}>
                {dt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
