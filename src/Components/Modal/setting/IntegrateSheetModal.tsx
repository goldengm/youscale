import React, { useEffect, useState, useRef } from "react";
import { FieldError, UseFormRegister, useForm } from "react-hook-form";
import { PreviewImagesModal } from "../../Table/Modal/Images";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useDeleteSheetMutation,
  useGetLinkSheetQuery,
  useIntegrateSheetMutation,
  usePatchSheetMutation,
} from "../../../services/api/ClientApi/ClientIntegrateSheetApi";
import {
  ColumnModel,
  ErrorModel,
  GetSheetIntegrationModel,
} from "../../../models";
import styles from "./setting.module.css";
import {
  useGetColumnQuery,
  usePatchColumnMutation,
} from "../../../services/api/ClientApi/ClientColumnApi";
import { showToastSucces } from "../../../services/toast/showToastSucces";
import { showToastError } from "../../../services/toast/showToastError";
import { Button } from "../../../common";

type Inputs = {
  spreadsheetId: string;
  range: string;
  name: string;
};

const schema = yup
  .object()
  .shape({
    spreadsheetId: yup.string().required("Ce champ est obligatoire"),
    range: yup.string().required("Ce champ est obligatoire"),
    name: yup
      .string()
      .required("Ce champ est obligatoire")
      .test("no-spaces", "Le champ ne doit pas contenir d'espace", (value) => {
        return !/\s/.test(value);
      }),
  })
  .required();

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  driverObj: {
    moveNext: () => void;
  };
}
export default function IntegrateSheetModal({
  setIsVisible,
  driverObj,
}: Props): JSX.Element {
  const [patchColumn] = usePatchColumnMutation();

  const [modifiedColumns, setModifiedColumns] = useState<{
    [key: string]: any;
  }>({});
  const [mode, setMode] = useState<"sheet" | "colonne">("sheet");

  const { data: columnData, refetch: refetchColumn } = useGetColumnQuery();
  const { data, refetch } = useGetLinkSheetQuery();
  const [row, setRow] = useState<GetSheetIntegrationModel[]>([]);

  const handleClose = () => {
    setIsVisible(false);
    driverObj.moveNext();
  };

  useEffect(() => {
    data && setRow(data?.data);
  }, [data]);

  const handleSaveChanges = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const keys = Object.keys(modifiedColumns);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      try {
        await patchColumn({ id: key, alias: modifiedColumns[key] }).unwrap();
        showToastSucces("Your alias is added");
        refetchColumn();
        if (i < keys.length - 1) {
          await delay(2000);
        }
        handleClose();
      } catch (err) {
        console.log(err);
      }
    }
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
          <p className={styles.title}>Intégration de Google Sheets</p>

          <div className={styles.switchContainer}>
            <div
              onClick={() => setMode("sheet")}
              className={`${styles.switchItems} ${
                mode === "sheet" && styles.itemsActive
              }`}
            >
              Sheets
            </div>
            <div
              onClick={() => setMode("colonne")}
              className={`${styles.switchItems} ${
                mode === "colonne" && styles.itemsActive
              } `}
            >
              Colonnes
            </div>
          </div>

          {mode === "sheet" ? (
            <SheetContainer />
          ) : (
            <div>
              <ColumnContainer
                data={columnData}
                modifiedColumns={modifiedColumns}
                setModifiedColumns={setModifiedColumns}
              />

              <div className={styles.bottomBtn}>
                <Button
                  type="submit"
                  color="primary"
                  value="Enregistrer"
                  onClick={handleSaveChanges}
                />
                {/* <button onClick={handleSaveChanges} className={styles.saveBtn}>
                  Enregistrer
                </button> */}

                <Button color="warning" value="Fermer" onClick={handleClose} />
                {/* <button
                  onClick={() => handleClose()}
                  className={styles.closeBtn}
                >
                  Fermer
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ColumnContainerProps {
  modifiedColumns: {};
  setModifiedColumns: React.Dispatch<React.SetStateAction<{}>>;
  data:
    | {
        code: Number;
        data: ColumnModel[];
      }
    | undefined;
}
const ColumnContainer = ({
  modifiedColumns,
  setModifiedColumns,
  data,
}: ColumnContainerProps): JSX.Element => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ColumnModel
  ) => {
    const { name, value } = event.target;
    setModifiedColumns((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   console.log(modifiedColumns);

  const formatData = (data: any) => {
    let tempData = [];
    for (let i = 0; i < data.length; i++) {
      tempData.push(data[i]);
    }

    let element = tempData.splice(1, 1)[0];
    tempData.splice(7, 0, element);

    return tempData;
  };

  console.log(data?.data && formatData(data.data));

  return (
    <div className={styles.columnContainer}>
      {/* <p className={styles.columnDescription}>
                Faîtes correspondre le nom des colonnes de votre google sheets aux colonnes de Youscale
            </p> */}
      <ul className={`my-3 ${styles.instructionList}`}>
        <li>veuillez remplir tous les colomns qui sont en violet</li>
        <li>
          les noms des colonnes de votre google sheets doivent correspondre au
          nom des colonnes de Youscale
        </li>
        <li>veuillez faire attention au majuscule et minuscule</li>
        <li>ne pas utiliser d’espace dans les colomns remplie</li>
        <li>les produits doivent exister dans Youscale</li>
      </ul>

      <div className={styles.columnDisplay}>
        <div className={styles.columnTitle}>
          <div>Colonne de Youscale</div>
          <div>Colonne de votre Google Sheet</div>
        </div>
        {data?.data &&
          formatData(data.data).map((item, key) => (
            <ColumnRow
              key={key}
              item={item}
              onInputChange={(event) => handleInputChange(event, item)}
            />
          ))}
      </div>
    </div>
  );
};

interface ColumnProps {
  item: ColumnModel;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const mandatoryFields = [
  "Order id",
  "Produit",
  "Destinataire",
  "Telephone",
  "Ville",
  "Prix",
  "Quantity",
];

const ColumnRow = ({ item, onInputChange }: ColumnProps): JSX.Element => {
  const [value, setValue] = useState(item.alias);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    e.preventDefault();
    let regex = /^[a-zA-Z]+$/;

    //if (regex.test(value) || value.length == 0) {
    setValue(value);
    onInputChange(e);
    //}
  };

  return (
    <div className={styles.columnRow}>
      <input
        className={
          mandatoryFields.includes(item.name)
            ? styles.customValueInputStyle
            : styles.columnValueInput
        }
        type="text"
        value={item.name}
        readOnly
      />
      <img src="/svg/setting/next.svg" alt="next" />

      <input
        className={styles.columnInputTxt}
        type="text"
        defaultValue={item.alias}
        value={value}
        placeholder={"No alias"}
        //onChange={onInputChange}
        onChange={onChange}
        name={String(item.id)}
      />
    </div>
  );
};

const EXAMPLE_1_URL = `/svg/setting/example-1.png`;
const EXAMPLE_2_URL = `/svg/setting/example-2.png`;

const SheetContainer = (): JSX.Element => {
  const [copied, setCopied] = React.useState(false);
  const { data, refetch } = useGetLinkSheetQuery();
  const [row, setRow] = useState<GetSheetIntegrationModel[]>([]);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [attachement, setAttachement] = useState<string>(EXAMPLE_1_URL);

  useEffect(() => {
    data && setRow(data?.data);
  }, [data]);

  const onViewExample1 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setAttachement(EXAMPLE_1_URL);
    setShowImage(true);
  };

  const onViewExample2 = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setAttachement(EXAMPLE_2_URL);
    setShowImage(true);
  };

  const onCopy = React.useCallback(() => {
    navigator.clipboard.writeText(
      "appsheet@fluent-edition-339019.iam.gserviceaccount.com"
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, []);

  return (
    <div className={styles.sheetContainer}>
      {showImage && (
        <PreviewImagesModal
          showImage={showImage}
          setShowImage={setShowImage}
          attachement={attachement}
        />
      )}
      <p className={styles.stepTxt}>
        <span>Etape 1: </span>
        Veuillez le partager avec l’adresse e-mail ci-dessous avec votre Google
        Sheets comme citer dans l’exemple
      </p>

      <a onClick={onViewExample1} className={styles.exampleBtn} href="#">
        <img src="/svg/setting/light.svg" alt="light" />
        Exemple
      </a>

      {copied && (
        <span style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          copied
        </span>
      )}
      <a className={styles.sheetMail} href="#" onClick={onCopy}>
        appsheet@fluent-edition-339019.iam.gserviceaccount.com
      </a>

      <p className={styles.stepTxt}>
        <span>Etape 2: </span>
        Saisir les informations nécessaires comme citer dans l’exemple
      </p>

      <div className={styles.topAction}>
        <a onClick={onViewExample2} className={styles.exampleBtn} href="#">
          <img src="/svg/setting/light.svg" alt="light" />
          Exemple
        </a>

        <a
          onClick={() =>
            setRow((prev) => [
              ...prev,
              { SheetID: "", range_: "" } as GetSheetIntegrationModel,
            ])
          }
          className={styles.addSheetBtn}
          href="#"
        >
          <img src="/svg/setting/add.svg" alt="add" />
          {window.innerWidth > 600
            ? "Ajouter un nouveau sheet"
            : window.innerWidth > 424
            ? "nouveau"
            : null}
        </a>
      </div>

      {row.map((dt) => (
        <ItemSheet data={dt} refetch={refetch} />
      ))}
    </div>
  );
};

interface ItemSheetProps {
  data: GetSheetIntegrationModel | undefined;
  refetch: () => any;
}
const ItemSheet = ({ data, refetch }: ItemSheetProps) => {
  const [integrateSheet] = useIntegrateSheetMutation();
  const [patchSheet] = usePatchSheetMutation();
  const [deleteSheet] = useDeleteSheetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: Inputs) => {
    if (!data?.id) {
      integrateSheet(values)
        .unwrap()
        .then((result: any) => {
          showToastSucces("Votre feuille a été enregistré");
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
    } else {
      patchSheet({
        id: data.id,
        ...values,
      })
        .unwrap()
        .then((result: any) => {
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
    }
  };

  const onDeleteSheet = () => {
    deleteSheet({ id: data?.id || 0 })
      .unwrap()
      .then((result: any) => {
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
  };

  return (
    <div className={styles.itemSheet}>
      <p className={styles.sheetTitle}>Sheet</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.rowsInput}>
          <SheetInput
            defaultValue={data?.SheetID ?? ""}
            register={register}
            name={"spreadsheetId"}
            error={errors.spreadsheetId}
            label={"SheetID"}
            placeholder={"SheetID"}
          />

          <SheetInput
            defaultValue={data?.range_ ?? ""}
            register={register}
            name={"range"}
            error={errors.range}
            label={"range_"}
            placeholder={"range_"}
          />

          <SheetInput
            defaultValue={data?.name ?? ""}
            register={register}
            name={"name"}
            error={errors.name}
            label={"name"}
            placeholder={"Stock Janvier"}
          />
        </div>

        <div className={styles.sheetBottomAction}>
          <button className={styles.sheetSaveBtn}>Enregistrer</button>

          <a
            href="#"
            onClick={() => onDeleteSheet()}
            className={styles.sheetCloseBtn}
          >
            Supprimer
          </a>
        </div>
      </form>
    </div>
  );
};

interface SheetInputProps {
  label: string;
  placeholder: string;
  defaultValue?: string | number;
  register: UseFormRegister<any> | any;
  name: string;
  error: FieldError | undefined;
}
const SheetInput = ({
  label,
  placeholder,
  defaultValue,
  register,
  name,
  error,
}: SheetInputProps) => {
  return (
    <div className={styles.sheetInput}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        {...register(name)}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />

      {error && <p className={styles.errorTxt}>{error.message}</p>}
    </div>
  );
};
