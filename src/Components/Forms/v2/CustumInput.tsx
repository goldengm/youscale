import React from "react";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FieldError } from "react-hook-form/dist/types/errors";
import styles from "./form.module.css";
import "./form.style.css";

interface Props {
  label: string;
  placeholder: string;
  type: string;
  defaultValue?: string | number;
  register: UseFormRegister<any> | any;
  name: string;
  error: FieldError | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  min?: string;
  children?: JSX.Element | JSX.Element[];
  confirmation?: boolean;
}
export default function CustumInput({
  label,
  placeholder,
  type,
  defaultValue = "",
  register,
  name,
  error,
  onChange,
  min,
  children,
  confirmation,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={ confirmation? styles.confirmform : styles.form}>
        <label className={confirmation ? styles.confirmlabel : styles.label}>
          {label}
        </label>
        <div style={confirmation?( window.innerWidth > 550 ? {width:'205px'} : {width: '120px'}): { width: "50%" }}>
          <input
            style={{ width: "100%" }}
            min={min || 0}
            {...register(name)}
            defaultValue={defaultValue}
            role="presentation"
            autoComplete="off"
            onChange={onChange}
            className={styles.input}
            type={type}
            placeholder={placeholder}
          />
        </div>
      </div>
      {children}
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
}
