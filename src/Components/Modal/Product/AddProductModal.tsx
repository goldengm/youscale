import React, { useState, useEffect, useRef } from "react";
import { ErrorModel } from "../../../models";
import { useAddProductMutation } from "../../../services/api/ClientApi/ClientProductApi";
import { showToastError } from "../../../services/toast/showToastError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustumInput, SwitchForm } from "../../Forms/v2";
import { Spinner4Bar } from "../../Loader";
import styles from "./product.module.css";
import * as yup from "yup";
import { Button } from "../../../common";

type SelectType = {
  label: string;
  value: string | number;
};

type Inputs = {
  name: string;
  price_selling: string;
};

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .max(14, "Maximum 14 caractères")
      .required("Ce champ est obligatoire"),
    price_selling: yup.string().required("Ce champ est obligatoire"),
  })
  .required();

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => any;
  driverObj: {
    moveNext: () => void;
  };
}
const AddProductModal: React.FC<Props> = ({
  setIsVisible,
  refetch,
  driverObj,
}): JSX.Element | null => {
  const handleClose = () => {
    setIsVisible(false);
    driverObj.moveNext();
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
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.main} ref={ref}>
          <p className={styles.title}>Ajouter un produit</p>

          <FormBody refetch={refetch} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

interface FormBodyProps {
  refetch: () => any;
  handleClose: () => void;
}

const FormBody = ({ refetch, handleClose }: FormBodyProps) => {
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const [variantList, setVariantList] = useState<string[]>([]);

  const [addProd, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Inputs) => {
    const data = {
      ...values,
      variant: variantList,
    };

    //console.log(data);

    addProd(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        refetch();
        handleClose();
      })
      .catch((err: { data: ErrorModel; status: number }) =>
        showToastError(err.data.errors[0].msg)
      );
  };

  const switchShowVariant = () => {
    setShowVariant(!showVariant);
  };

  return (
    <div className="card-body">
      <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row" style={{ gap: "20px" }}>
            <CustumInput
              register={register}
              name={"name"}
              error={errors.name}
              type={"text"}
              label={"Nom"}
              placeholder={"Nivea"}
            />

            <CustumInput
              register={register}
              name={"price_selling"}
              error={errors.price_selling}
              type={"text"}
              label={"Prix d'achat"}
              placeholder={"12.55"}
            />
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <SwitchForm
              label={"Variant"}
              active={showVariant}
              SwitchHideProduct={switchShowVariant}
            />
            {showVariant && (
              <AddVariant
                variantList={variantList}
                setVariantList={setVariantList}
              />
            )}
          </div>

          {isLoading ? (
            <Spinner4Bar />
          ) : (
            <div className={styles.bottomAction}>
              {/* <button type="submit" className={styles.saveBtn}>
                Enregistrer
              </button> */}
              <Button
                type="submit"
                color="primary"
                value="Enregistrer"
                //onClick={onSubmit}
              />
              {/* <a href="#" onClick={handleClose} className={styles.NextBtn}>
                Fermer
              </a> */}
              <Button color="warning" value="Fermer" onClick={handleClose} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

interface AddVariantProps {
  setVariantList: React.Dispatch<React.SetStateAction<string[]>>;
  variantList: string[];
}
const AddVariant = ({
  setVariantList,
  variantList,
}: AddVariantProps): JSX.Element => {
  const [variant, setVariant] = useState<string>("");

  const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVariant(value);
  };

  const handleAddVariant = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setVariantList((prev) => [...prev, variant]);
    //setVariant("");
  };

  return (
    <div className={`mt-3 ${styles.variantBox}`}>
      <ul className={styles.variantList}>
        {variantList.map((variant, index) => (
          <li>{variant}</li>
        ))}
      </ul>
      <CustumInput
        onChange={handleChangeVariant}
        name={"variant"}
        error={undefined}
        register={() => {}}
        type={"text"}
        label={"Variant"}
        placeholder={"Mountain"}
      />

      <div className={`mb-3 ${styles.bottomAction}`}>
        <Button
          color="primary"
          value="Enregistrer"
          onClick={handleAddVariant}
        />
        {/* <button
          //type="submit"
          onClick={handleAddVariant}
          className={styles.saveBtn}
        >
          Enregistrer
        </button> */}
      </div>
    </div>
  );
};

export default AddProductModal;
