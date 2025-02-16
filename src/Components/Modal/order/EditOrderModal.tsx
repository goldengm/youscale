import React, { useEffect, useState, useRef } from "react";
import styles from "./order.module.css";
import { useGetStatusQuery } from "../../../services/api/ClientApi/ClientStatusApi";
import { usePatchClientOrderMutation } from "../../../services/api/ClientApi/ClientOrderApi";
import { ErrorModel, GetClientOrderModel, StatusModel } from "../../../models";
import { showToastError } from "../../../services/toast/showToastError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustumInput, CustumSelectForm, CustumTextArea } from "../../Forms/v2";
import { Spinner4Bar } from "../../Loader";
import * as yup from "yup";
import { DropdownOptionType } from "../../../models";
import { MyCustomSelect } from "../../Forms/v2";
import Button from "../../../common/Button";

type SelectType = {
  label: string;
  value: string | number;
};

type Inputs = {
  nom: string;
  telephone: string;
  prix: string;
  adresse: string;
  message: string;
  status: string;
  source: string;
  updownsell: string;
  changer: string;
  ouvrir: string;
};

const schema = yup
  .object()
  .shape({
    nom: yup.string().notRequired(),
    telephone: yup.string().notRequired(),
    prix: yup.string().notRequired(),
    adresse: yup.string().notRequired(),
    message: yup.string().notRequired(),
    status: yup.string().notRequired(),
    source: yup.string().notRequired(),
    updownsell: yup.string().notRequired(),
    changer: yup.string().notRequired(),
    ouvrir: yup.string().notRequired(),
  })
  .required();

interface Props {
  id_order: string;
  dataEdit: GetClientOrderModel;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => any;
  driverObj: {
    moveNext: () => void;
  };
}
const EditOrderModal: React.FC<Props> = ({
  setIsVisible,
  refetch,
  driverObj,
  id_order,
  dataEdit,
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
          <p className={styles.title}>Modifier une commande</p>

          <FormBody
            refetch={refetch}
            dataEdit={dataEdit}
            id_order={id_order}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

interface FormBodyProps {
  id_order: string;
  dataEdit: GetClientOrderModel;
  refetch: () => any;
  handleClose: () => any;
}

const FormBody = ({
  refetch,
  handleClose,
  id_order,
  dataEdit,
}: FormBodyProps) => {
  const [patchOrder, { isLoading }] = usePatchClientOrderMutation();

  const { data: StatusData, refetch: RefetchStatus } = useGetStatusQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs, any, Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const FilterStatusData = (data: StatusModel[] | undefined): SelectType[] => {
    if (!data) return [];

    var newArr: SelectType[] = [];

    data.filter((dt: StatusModel) => {
      if (dt.checked === true) newArr.push({ label: dt.name, value: dt.name });
    });

    return newArr;
  };

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

  useEffect(() => {
    RefetchStatus();
  }, []);

  const onSubmit = (values: Inputs) => {
    const data = {
      ...values,
      id: Number(id_order),
    };

    patchOrder(data)
      .unwrap()
      .then((res) => {
        console.log(res);
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

  const handleChangeStatus = (option: DropdownOptionType) => {
    //const { value } = e.target;
    const { value } = option;
    setValue("status", String(value));

    // console.log(value);

    // if (value === "Reporte") setShowReporte(true);
    // else setShowReporte(false);
  };

  return (
    <div className="card-body">
      <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <CustumInput
                defaultValue={dataEdit.Destinataire}
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
                defaultValue={dataEdit.Telephone}
                register={register}
                name={"telephone"}
                error={errors.telephone}
                type={"text"}
                label={"Telephone"}
                placeholder={"778143610"}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <CustumInput
                defaultValue={dataEdit.Prix}
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
                defaultValue={dataEdit.Adresse}
                register={register}
                name={"adresse"}
                error={errors.adresse}
                type={"text"}
                label={"Adresse"}
                placeholder={"Bl 4 st.Jean"}
              />
            </div>
          </div>

          <div className="row">
            <CustumTextArea
              defaultValue={dataEdit.Message}
              register={register}
              name={"message"}
              error={errors.message}
              label={"Commentaire"}
            />
          </div>

          <div className="row">
            <div className="col">
              <MyCustomSelect
                label="Status"
                //name="status"
                //setValue={setValue}
                defaultValue={{
                  label: dataEdit?.Status || "",
                  value: dataEdit?.Status || "",
                }}
                onChange={handleChangeStatus}
                options={FilterStatusData(StatusData?.data)}
              />
              {/* <CustumSelectForm
                defaultSelected={dataEdit.Status}
                data={FilterStatusData(StatusData?.data)}
                register={register}
                error={errors.status}
                label={"Status"}
                name={"status"}
              /> */}
            </div>
            <div className="col">
              <CustumSelectForm
                data={sourceData}
                register={register}
                error={errors.source}
                label={"Source"}
                name={"source"}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <CustumSelectForm
                data={upDownData}
                register={register}
                error={errors.updownsell}
                label={"Up/Downsell"}
                name={"updownsell"}
              />
            </div>
            <div className="col">
              <CustumSelectForm
                data={changerOuvrirData}
                register={register}
                error={errors.changer}
                label={"Changer"}
                name={"changer"}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <CustumSelectForm
                data={changerOuvrirData}
                register={register}
                error={errors.ouvrir}
                label={"Ouvrir"}
                name={"ouvrir"}
              />
            </div>
            <div className="col"></div>
          </div>

          {isLoading ? (
            <Spinner4Bar />
          ) : (
            <div className="mt-4 row">
              <div className="col">
                <Button
                  color="primary"
                  value="Enregistrer"
                  type="submit"
                  onClick={() => {}}
                />
              </div>
              {/* <button type="submit" className={styles.saveBtn}>
                Enregistrer
              </button> */}
              <div className="col">
                <Button color="warning" value="Fermer" onClick={handleClose} />
              </div>
              {/* <a href="#" onClick={handleClose} className={styles.NextBtn}>
                Fermer
              </a> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

{
  /* <div className="mt-4 row">
        <div className="col">
          <Button color="primary" value="Valider" onClick={onSubmit} />
        </div>
        <div className="col">
          <Button color="warning" value="Fermer" onClick={handleCloseModal} />
        </div>
      </div> */
}
export default EditOrderModal;
