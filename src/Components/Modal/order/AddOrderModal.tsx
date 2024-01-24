import React, { useEffect, useRef, useState } from "react";
import styles from "./order.module.css";
import { useGetStatusQuery } from "../../../services/api/ClientApi/ClientStatusApi";
import { useAddClientOrderMutation } from "../../../services/api/ClientApi/ClientOrderApi";
import {
  CityModel,
  ErrorModel,
  GetProductModel,
  StatusModel,
  DropdownOptionType,
} from "../../../models";
import { useGetProductQuery } from "../../../services/api/ClientApi/ClientProductApi";
import { showToastError } from "../../../services/toast/showToastError";
import { MultiSelectElement } from "../../Input/v2";
import { ProductOrderCard } from "../../Table/Modal/Order/Card";
import { useForm } from "react-hook-form";
import { useGetCityQuery } from "../../../services/api/ClientApi/ClientCityApi";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CityDropDown,
  CustumInput,
  CustumSelectForm,
  CustumTextArea,
  MyCustomSelect,
} from "../../Forms/v2";
import { Spinner4Bar } from "../../Loader";
import * as yup from "yup";
import cx from "classnames";

type SelectType = {
  label: string;
  value: string | number;
};

const GetCityWhosNotFromSheet = (
  data: CityModel[] | undefined
): DropdownOptionType[] => {
  if (!data) return [];

  var newArr: DropdownOptionType[] = [{ label: "none", value: "none" }];

  for (let i = 0; i < data.length; i++) {
    if (data[i].isFromSheet === false) {
      newArr.push({
        value: data[i].id ?? 0,
        label: data[i].name,
      });
    }
  }

  return newArr;
};

const getMinDate = (): string => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

type Inputs = {
  nom: string;
  telephone: string;
  prix: string;
  adresse: string;
  reportedDate: string;
  message: string;
  id_city: string;
  status: string;
  source: string;
  updownsell: string;
  changer: string;
  ouvrir: string;
};

const schema = yup
  .object()
  .shape({
    nom: yup.string().required("Ce champ est obligatoire"),
    telephone: yup.string().required("Ce champ est obligatoire"),
    prix: yup.string().required("Ce champ est obligatoire"),
    adresse: yup.string().notRequired(),
    reportedDate: yup.string().notRequired(),
    message: yup.string().notRequired(),
    id_city: yup.string().required("Ce champ est obligatoire"),
    status: yup.string().required("Ce champ est obligatoire"),
    // source: yup.string().required("Ce champ est obligatoire"),
    // updownsell: yup.string().required("Ce champ est obligatoire"),
    // changer: yup.string().required("Ce champ est obligatoire"),
    // ouvrir: yup.string().required("Ce champ est obligatoire"),
  })
  .required();

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => any;
  driverObj: {
    moveNext: () => void;
  };
}
const AddOrderModal: React.FC<Props> = ({
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
      <div ref={ref} className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <div className={styles.main} ref={ref}>
          <p className={styles.title}>Ajouter une commande</p>

          <FormBody refetch={refetch} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

interface FormBodyProps {
  refetch: () => any;
  handleClose: () => any;
}

const FormBody = ({ refetch, handleClose }: FormBodyProps) => {
  const [addOrder, { isLoading }] = useAddClientOrderMutation();

  const [selectedProduct, setSelectedProduct] = useState<
    {
      label: string;
      value: number | undefined | string;
      quantity: number;
      variant: string[];
      allVariant: string[] | undefined;
    }[]
  >([]);
  console.log(selectedProduct);
  const [showReporte, setShowReporte] = useState<boolean>(false);

  const { data: CityData } = useGetCityQuery();
  const { data: ProductData, isSuccess: ProductSuccess } = useGetProductQuery({
    isHidden: false,
  });
  const { data: StatusData, refetch: RefetchStatus } = useGetStatusQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    RefetchStatus();
  }, []);

  const [sourceData] = useState<SelectType[]>([
    { label: "none", value: "none" },
    { label: "Facebook", value: "Facebook" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "YouTube", value: "YouTube" },
    { label: "TikTok", value: "TikTok" },
    { label: "Snapchat", value: "Snapchat" },
    { label: "Google", value: "Google" },
  ]);

  const [upDownData] = useState<SelectType[]>([
    { label: "none", value: "none" },
    { label: "UpSell", value: "UpSell" },
    { label: "DownSell", value: "UpSell" },
    { label: "CrossSell", value: "UpSell" },
  ]);

  const changerOuvrirData: SelectType[] = [
    { label: "none", value: "none" },
    { label: "Oui", value: "Oui" },
    { label: "Non", value: "Non" },
  ];

  const FormatDataOption = (data: GetProductModel[]) => {
    console.log(data);
    var objArr: {
      label: string;
      value: string;
      allVariant: string[];
      variant: string[];
    }[] = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i].isDeleted)
        objArr.push({
          label: data[i].name,
          value: String(data[i].id),
          allVariant: data[i].variant,
          variant: (data[i].variant.length > 0
            ? data[i].variant
            : []) as string[],
        });
    }

    return objArr;
  };

  const FormatAccessArray = (data: any) => {
    var objArr: { id: number; quantity: number; variant: [] }[] = [];

    for (let i = 0; i < data.length; i++) {
      objArr.push({
        id: data[i].value,
        quantity: data[i].quantity,
        variant: data[i].variant,
      });
    }

    return objArr;
  };

  const handleChangeStatus = (option: DropdownOptionType) => {
    //const { value } = e.target;
    const { value } = option;
    setValue("status", String(value));

    console.log(value);

    if (value === "Reporte") setShowReporte(true);
    else setShowReporte(false);
  };

  const handleChangeCity = (option: DropdownOptionType) => {
    const { value } = option;
    setValue("id_city", String(value));

    console.log(value);
  };

  const FilterStatusData = (
    data: StatusModel[] | undefined
  ): DropdownOptionType[] => {
    var newArr: DropdownOptionType[] = [];

    //if (!data) return [];

    if (data && data.length > 0) {
      data.filter((dt: StatusModel) => {
        if (dt.checked === true)
          newArr.push({ label: dt.name, value: dt.name });
      });
    }

    return newArr;
  };

  const onSubmit = (values: Inputs) => {
    if (selectedProduct.length === 0) {
      showToastError("Please select at least one product");
      return;
    }

    const data = {
      ...values,
      source: "none",
      updownsell: "none",
      changer: "none",
      ouvrir: "none",
      id_product_array: FormatAccessArray(selectedProduct),
    };

    addOrder(data)
      .unwrap()
      .then((res) => {
        refetch();
        handleClose();
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
  };

  //console.log(FormatDataOption(ProductData?.data));

  return (
    <div className="card-body" style={{ width: "100%" }}>
      <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.productLayout}>
            <label className={styles.label}>{"Produit"}</label>
            {ProductSuccess ? (
              <MultiSelectElement
                options={FormatDataOption(ProductData?.data)}
                selected={selectedProduct}
                onChange={setSelectedProduct}
              />
            ) : (
              <></>
            )}

            {selectedProduct.map((dt, index) => (
              <ProductOrderCard
                key={index}
                dt={dt}
                index={index}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                title={dt.label}
              />
            ))}
          </div>
          <div className="row mt-2">
            <div className="col">
              <CustumInput
                register={register}
                name={"nom"}
                error={errors.nom}
                type={"text"}
                label={"Destinataire"}
                placeholder={"Patrick Doe"}
              />
            </div>
            <div className="col">
              <CustumInput
                register={register}
                name={"telephone"}
                error={errors.telephone}
                type={"text"}
                label={"Telephone"}
                placeholder={"778143610"}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <CustumInput
                register={register}
                name={"prix"}
                error={errors.prix}
                type={"text"}
                label={"Prix"}
                placeholder={"36540"}
              />
            </div>
            <div className="col">
              <CustumInput
                register={register}
                name={"adresse"}
                error={errors.adresse}
                type={"text"}
                label={"Adresse"}
                placeholder={"Bl 4 st.Jean"}
              />
            </div>
          </div>
          <div className="row mt-2">
            <CustumTextArea
              register={register}
              name={"message"}
              error={errors.message}
              label={"Commentaire"}
            />

            {showReporte && (
              <CustumInput
                register={register}
                min={getMinDate()}
                name={"reportedDate"}
                error={errors.reportedDate}
                type={"date"}
                label={"Date de report"}
                placeholder={"jj/mm/aaaa"}
              />
            )}
          </div>

          <div className="row">
            <div className="col">
              {" "}
              <CityDropDown
                setValue={setValue}
                data={GetCityWhosNotFromSheet(CityData?.data)}
                error={errors.id_city}
                label={"Ville"}
              />
              {/* <MyCustomSelect
                label="Ville"
                //name="status"
                //setValue={setValue}
                error={errors.id_city}
                onChange={handleChangeCity}
                options={GetCityWhosNotFromSheet(CityData?.data)}
              /> */}
            </div>
            <div className="col">
              <MyCustomSelect
                label="Status"
                //name="status"
                //setValue={setValue}
                defaultValue={{
                  label: "Nouveau",
                  value: "Nouveau",
                }}
                onChange={handleChangeStatus}
                options={FilterStatusData(StatusData?.data)}
              />
              {/* <CustumSelectForm
                data={FilterStatusData(StatusData?.data)}
                Onchange={handleChangeStatus}
                defaultSelected={"Nouveau"}
                register={register}
                error={errors.status}
                label={"Status"}
                name={"status"}
              /> */}
            </div>

            {/* <CustumSelectForm
              data={sourceData}
              register={register}
              error={errors.source}
              label={"Source"}
              name={"source"}
            />

            <CustumSelectForm
              data={upDownData}
              register={register}
              error={errors.updownsell}
              label={"Up/Downsell"}
              name={"updownsell"}
            />

            <CustumSelectForm
              data={changerOuvrirData}
              register={register}
              error={errors.changer}
              label={"Changer"}
              name={"changer"}
            />

            <CustumSelectForm
              data={changerOuvrirData}
              register={register}
              error={errors.ouvrir}
              label={"Ouvrir"}
              name={"ouvrir"}
            /> */}
          </div>

          {isLoading ? (
            <Spinner4Bar />
          ) : (
            <div className={styles.bottomAction}>
              <button
                className={cx(
                  { [styles.ripple]: true },
                  { [styles.saveBtn]: true }
                )}
                type="submit"
              >
                Enregistrer
              </button>

              <a
                className={cx(
                  { [styles.ripple]: true },
                  { [styles.NextBtn]: true }
                )}
                href="#"
                onClick={handleClose}
              >
                Fermer
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
