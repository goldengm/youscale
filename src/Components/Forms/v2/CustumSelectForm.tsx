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
  selectedStatus?: string | undefined;
  setSelectedStatus?: any;
}
export default function CustumSelectForm({
  label,
  name,
  register,
  error,
  data,
  Onchange,
  defaultSelected,
  className,
  confirmation,
  selectedStatus,
  setSelectedStatus,
}: Props): JSX.Element {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
  };

  return (
    <div className={confirmation ? styles.confirmcontainer : styles.container}>
      <div className={confirmation ? styles.confirmform : styles.form}>
        <label className={confirmation ? styles.confirmlabel : styles.label}>
          {label}
        </label>
        <div
          style={
            confirmation
              ? window.innerWidth > 550
                ? //? { width: "205px" }
                  {}
                : { width: "120px" }
              : { width: "100%" }
          }
        >
          {confirmation ? (
            <select
              id="confirmation_select"
              {...register(name)}
              onChange={selectChange}
              defaultValue={defaultSelected ? defaultSelected : "Livre"}
              value={selectedStatus}
              name={name}
              className={styles.confirmationselect}
            >
              {data.map((dt, index) => (
                <option
                  // style={{
                  //   padding: 5,
                  //   margin: 5,
                  //   background: "rgba(119, 32, 225, 0.70)",
                  // }}
                  key={index}
                  value={dt.value}
                >
                  {dt.label}
                </option>
              ))}
            </select>
          ) : (
            <select
              {...register(name)}
              onChange={Onchange}
              name={name}
              className={styles.select}
            >
              {data.map((dt, index) => (
                <option key={index} value={dt.value}>
                  {dt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
