import React, { useEffect, useRef } from "react";
import { FieldError, UseFormRegister, useForm } from "react-hook-form";
import { CityModel, ErrorModel, ShippingModel } from "../../../models";
import { useGetShippingQuery } from "../../../services/api/ClientApi/ClientShippingApi";
import {
  useAddCityMutation,
  usePatchCityMutation,
} from "../../../services/api/ClientApi/ClientCityApi";
import { showToastError } from "../../../services/toast/showToastError";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./setting.module.css";
import { CustumInput, SwitchForm } from "../../Forms/v2";

type Inputs = {
  name: string;
  price: string;
  id_shipping: number;
};

type SelectType = {
  label: string;
  value: string | number;
};

const GetShippingCompanies = (
  data: ShippingModel[] | undefined
): SelectType[] => {
  if (!data) return [];

  var newArr: SelectType[] = [{ label: "none", value: 0 }];

  for (let i = 0; i < data.length; i++) {
    newArr.push({
      value: data[i].id ?? 0,
      label: data[i].name,
    });
  }

  return newArr;
};

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Ce champ est obligatoire"),
    price: yup.string().required("Ce champ est obligatoire"),
  })
  .required();

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  item: CityModel | undefined;
  refetch: () => any;
}
export default function EditCityModal({
  setIsVisible,
  refetch,
  item,
}: Props): JSX.Element {
  console.log(item);
  const handleClose = () => {
    setIsVisible(false);
  };

  const { data: shippingData } = useGetShippingQuery();
  const [addCity] = useAddCityMutation();
  const [patchCity] = usePatchCityMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Inputs) => {
    const data = {
      ...values,
      id: item?.id,
      id_shipping:
        String(values.id_shipping) === "" ? null : values.id_shipping,
    };

    console.log(data);

    patchCity(data)
      .unwrap()
      .then((res) => {
        refetch();
      })
      .catch(
        (err: { data: ErrorModel | { message: string }; status: number }) => {
          if (err.data) {
            if (
              "errors" in err.data &&
              Array.isArray(err.data.errors) &&
              err.data.errors.length > 0
            )
              showToastError(err.data.errors[0].msg);
            else if ("message" in err.data) showToastError(err.data.message);
          }
        }
      );
    handleClose();
  };

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [callback]);

    return ref;
  };

  const ref = useOutsideClick(() => {
    console.log("Clicked outside of MyComponent");
    handleClose();
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent_Whatsapp}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.main_Whatsapp} ref={ref}>
          <p className={styles.title}>Modifier une ville</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.whtContent}>
              <Field
                defaultValue={item?.name || ""}
                register={register}
                name={"name"}
                error={errors.name}
                type={"text"}
                label={"Name"}
                placeholder={"Nom"}
              />

              <Field
                defaultValue={item?.price || ""}
                register={register}
                name={"price"}
                error={errors.price}
                type={"text"}
                label={"Price"}
                placeholder={"Prix"}
              />

              <Select
                defaultSelected={item?.id_shipping}
                data={GetShippingCompanies(shippingData?.data)}
                register={register}
                error={errors.id_shipping}
                label={"Shipping companies"}
                name={"id_shipping"}
              />
            </div>

            <div className={styles.bottomBtn}>
              <button className={styles.saveBtn}>Ajouter</button>

              <a href="#" onClick={handleClose} className={styles.closeBtn}>
                Fermer
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  placeholder: string;
  type: "text" | "number";
  defaultValue?: string | number;
  register: UseFormRegister<any> | any;
  name: string;
  error: FieldError | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
const Field = ({
  label,
  placeholder,
  type,
  defaultValue,
  register,
  name,
  error,
  onChange,
}: FieldProps): JSX.Element => {
  return (
    <div className={styles.whtField}>
      <p>{label}</p>
      <input
        {...register(name)}
        defaultValue={defaultValue}
        onChange={onChange}
        className={styles.input}
        type={type}
        placeholder={placeholder}
      />
      {/* <input
                {...register(name)}
                type={type}
                //name={name}
                placeholder={placeholder}
                value={defaultValue}
                onChange={onChange}
            /> */}

      {error && <p className={styles.errorTxt}>{error.message}</p>}
    </div>
  );
};

interface SelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  data: { label: string; value: string | number }[];
  defaultSelected?: string | number | null;
}
const Select = ({
  label,
  name,
  register,
  error,
  data,
  defaultSelected,
}: SelectProps): JSX.Element => {
  return (
    <div className={styles.whtField}>
      <p>{label}</p>

      <select {...register(name)} name={name}>
        {data.map((dt) => (
          <option
            selected={String(defaultSelected) === String(dt.value)}
            value={dt.value}
          >
            {dt.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.errorTxt}>{error.message}</p>}
    </div>
  );
};
