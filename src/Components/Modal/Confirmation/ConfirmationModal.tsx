import React, { useEffect, useState, useRef } from "react";
import styles from "./confirmation.module.css";
import { AiFillFilter } from "react-icons/ai";
import { CommandeFilter } from "../../Filter/CommandeFilter";
import { useGetStatusQuery } from "../../../services/api/ClientApi/ClientStatusApi";
import {
  useGetClientOrderByIdQuery,
  usePatchClientOrderMutation,
} from "../../../services/api/ClientApi/ClientOrderApi";
import {
  CityModel,
  ErrorModel,
  GetClientOrderModel,
  GetProductModel,
  OrderOnlyModel,
  ProductOrder,
  StatusModel,
  countOrderByStatusModel,
} from "../../../models";
import { useGetProductQuery } from "../../../services/api/ClientApi/ClientProductApi";
import { showToastError } from "../../../services/toast/showToastError";
import { CustumDropdown, MultiSelectElement } from "../../Input/v2";
import { ProductOrderCard } from "../../Table/Modal/Order/Card";
import { useForm } from "react-hook-form";
import { useGetSettingQuery } from "../../../services/api/ClientApi/ClientSettingApi";
import { useGetCityQuery } from "../../../services/api/ClientApi/ClientCityApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustumInput, CustumSelectForm } from "../../Forms/v2";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { Spinner4Bar } from "../../Loader";
import * as yup from "yup";
import { showToastSucces } from "../../../services/toast/showToastSucces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { MyCustomSelect } from "../../Forms/v2";
import cx from "classnames";
import { DropdownOptionType } from "../../../models";

type dataType = {
  label: string;
  value: string;
};

interface GetStatusModel {
  code: Number;
  data: StatusModel[];
  countOrderByStatus: countOrderByStatusModel[];
}

interface Inputs {
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
}

type SchemaObject = {
  [key in keyof Inputs]: yup.Schema<any>;
};

interface SaveBtnProps {
  onClick: () => any;
  value: string;
}

type SelectType = {
  label: string;
  value: string | number;
};

interface ModalProps {
  id_orders: number[];
  isOpen: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  statusConfirmation: string | undefined;
  refetch: () => any;
  driverObj: {
    moveNext: () => void;
  };
}

interface selectedProductModel {
  label: string;
  value: number | undefined | string;
  quantity: number;
  variant: string[];
  allVariant: string[] | undefined;
}

interface ProductLayoutProps {
  id: number;
  refetch: () => any;
  editData?: ProductOrder[] | undefined;
  formSubmitRef: any;
}

interface FormBodyProps {
  StatusData: GetStatusModel | undefined;
  RefetchStatus: () => void;
  id_orders: number[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => any;
  handleClose: any;
  // currentOrder: {
  //   code: Number;
  //   data: GetClientOrderModel;
  //   order: OrderOnlyModel[];
  // };
  currentOrder: any;
  selectedStatus: string | undefined;
  setSelectedStatus: any;
  formSubmitRef: any;
  bottomSubmitRef: any;
}

const schema = yup.object().shape({
  nom: yup.string(),
  telephone: yup.string(),
  prix: yup.string(),
  adresse: yup.string(),
  message: yup.string(),
  status: yup.string(),
  source: yup.string(),
  updownsell: yup.string(),
  changer: yup.string(),
  ouvrir: yup.string(),
});

const FilterStatusData = (data: StatusModel[] | undefined): dataType[] => {
  if (!data) return [];

  var newArr: dataType[] = [];

  data.filter((dt: StatusModel) => {
    if (dt.checked === true) newArr.push({ label: dt.name, value: dt.name });
  });

  return newArr;
};

const ConfirmationModal: React.FC<ModalProps> = ({
  id_orders,
  isOpen,
  setIsVisible,
  setStatus,
  statusConfirmation,
  refetch,
  driverObj,
}): JSX.Element | null => {
  const { data: StatusData, refetch: RefetchStatus } = useGetStatusQuery({});
  const formSubmitRef = useRef();
  const bottomSubmitRef = useRef();

  const [index, setIndex] = useState<number>(0);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const {
    data: currentOrder,
    isSuccess,
    refetch: refetchCurrentOrder,
    isFetching,
  } = useGetClientOrderByIdQuery({ id: id_orders[index] });

  useEffect(() => {
    refetchCurrentOrder();
  }, [id_orders[index]]);

  useEffect(() => {
    refetchCurrentOrder();
  }, [isOpen, index]);

  useEffect(() => {
    setShowButton(false);
  }, [isOpen]);

  useEffect(() => {
    RefetchStatus();
  }, []);

  const OnChangeStatus = ({ label, value }: dataType) => {
    setStatus(value);
    setIndex(0);
    setSelectedStatus(value);
  };

  const handleClose = () => {
    setIsVisible(false);
    refetch();
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
    ////console.log("Clicked outside of MyComponent");
    handleClose();
  });

  const FilterStatusWithOrder = (
    data: countOrderByStatusModel[] | undefined
  ): dataType[] => {
    if (!data) return [];
    var newArr: dataType[] = [];
    data.filter((dt: countOrderByStatusModel) => {
      if (dt.count > 0) newArr.push({ label: dt.name, value: dt.name });
    });
    return newArr;
  };

  const onSubmitHandle = () => {
    setShowButton(true);

    // @ts-ignore
    bottomSubmitRef?.current?.click();
  };

  const onNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (id_orders.length === index + 1) {
      handleClose();
    }
    setIndex((prevIndex) => prevIndex + 1);
    setShowButton(false);
  };

  return isOpen ? (
    id_orders.length > 0 ? (
      <div className={styles.modalOverlay}>
        <div ref={ref} className={styles.modalContent}>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
          <div className={styles.main}>
            <p className={styles.title}>Confirmation des commandes</p>
            <p className={styles.cmdRestante}>
              {id_orders.length - (index + 1)} commandes restantes
            </p>

            <div className={styles.header}>
              <div className={styles.dateId}>
                <div className={styles.dateId_desc}>
                  <p>Date</p>
                  <p>ID</p>
                </div>
                {isSuccess && (
                  <div className={styles.dateId_value}>
                    <p>
                      {
                        new Date(currentOrder.order[0].date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                    <p>{currentOrder.order[0].id}</p>
                  </div>
                )}
              </div>
              <CommandeFilter
                Icons={AiFillFilter}
                data={FilterStatusWithOrder(StatusData?.countOrderByStatus)}
                onChange={OnChangeStatus}
                label="Tous les status"
              />
            </div>
            {isFetching ? (
              <p>Chargement</p>
            ) : (
              isSuccess && (
                <>
                  <ProductLayout
                    formSubmitRef={formSubmitRef}
                    refetch={refetch}
                    id={id_orders[index]}
                    editData={currentOrder.order[0].Product_Orders}
                  />
                  <FormBody
                    // RefetchStatus={RefetchStatus}
                    // currentOrder={currentOrder}
                    // StatusData={StatusData}
                    // refetch={refetchCurrentOrder}
                    // handleClose={handleClose}
                    // setIndex={setIndex}
                    // id_orders={id_orders}
                    // index={index}
                    // selectedStatus={selectedStatus}
                    // setSelectedStatus={setSelectedStatus}

                    //isSuccess={isSuccess}
                    formSubmitRef={formSubmitRef}
                    RefetchStatus={RefetchStatus}
                    currentOrder={currentOrder}
                    StatusData={StatusData}
                    refetch={refetchCurrentOrder}
                    handleClose={handleClose}
                    setIndex={setIndex}
                    id_orders={id_orders}
                    index={index}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    bottomSubmitRef={bottomSubmitRef}
                  />
                </>
              )
            )}
            {/* {isSuccess && (
              <ProductLayout
                formSubmitRef={formSubmitRef}
                refetch={refetch}
                id={id_orders[index]}
                editData={currentOrder.order[0].Product_Orders}
              />
            )} */}

            {/* <FormBody
              isSuccess={isSuccess}
              formSubmitRef={formSubmitRef}
              RefetchStatus={RefetchStatus}
              currentOrder={currentOrder}
              StatusData={StatusData}
              refetch={refetchCurrentOrder}
              handleClose={handleClose}
              setIndex={setIndex}
              id_orders={id_orders}
              index={index}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              bottomSubmitRef={bottomSubmitRef}
            /> */}

            <div className={styles.bottomAction}>
              <button
                hidden={true}
                //ref={formRef}
                type="submit"
              />
              <button
                //type="submit"
                className={cx(
                  { [styles.ripple]: true },
                  { [styles.saveBtn]: true }
                )}
                onClick={onSubmitHandle}
                //className={styles.saveBtn}
              >
                Enregistrer
              </button>
              {showButton && (
                <button
                  onClick={onNext}
                  //className={styles.NextBtn}
                  className={cx(
                    { [styles.ripple]: true },
                    { [styles.NextBtn]: true }
                  )}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.main}>
            <p>Veuillez patienter vos informations se charge...</p>
            <div
              className={styles.bottomAction}
              style={{
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <a href="#" onClick={handleClose} className={styles.NextBtn}>
                Fermer
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  ) : null;
};

const ProductLayout = ({
  editData,
  refetch,
  id,
  formSubmitRef,
}: ProductLayoutProps): JSX.Element => {
  const [patchOrder] = usePatchClientOrderMutation();
  const { data: ProductData, isSuccess } = useGetProductQuery({
    isHidden: false,
  });

  const FormatDataOption = (data: GetProductModel[]) => {
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
        quantity: data[i].quantity || 1,
        variant: data[i].variant,
      });
    }

    return objArr;
  };

  const [selectedProduct, setSelectedProduct] = useState<
    selectedProductModel[]
  >([]);

  useEffect(() => {
    ////console.log("editdata", editData)
    setSelectedProduct(
      editData
        ? editData
            ?.filter((dt) => dt.Product.variant?.length === 0)
            .map((dt) => {
              return {
                label: dt.Product.name,
                value: dt.Product.id ? String(dt.Product.id) : "",
                quantity: dt.quantity,
                variant: dt.variant,
                allVariant: dt.Product.variant,
              };
            })
        : []
    );
  }, [id]);

  const onSubmit = () => {
    if (selectedProduct.length === 0) {
      showToastError("Please select at least one product");
      return;
    }

    const data = {
      id_product_array: FormatAccessArray(selectedProduct),
    };

    patchOrder({ ...data, id })
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
  };

  return (
    <div className={styles.productLayout}>
      {isSuccess ? (
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

      <div className={styles.centerBtn}>
        <button
          hidden={true}
          ref={formSubmitRef}
          onClick={onSubmit}
          className={styles.saveBtn}
        >
          Sauvegarder
        </button>
        {/* <SaveBtn value="Sauvegarder" onClick={onSubmit} /> */}
      </div>
    </div>
  );
};

export default ConfirmationModal;

const SaveBtn = ({ onClick, value }: SaveBtnProps) => {
  return (
    <button onClick={onClick} className={styles.saveBtn}>
      {value}
    </button>
  );
};

const FormBody = ({
  //isSuccess,
  refetch,
  id_orders,
  setIndex,
  index,
  currentOrder,
  StatusData,
  RefetchStatus,
  handleClose,
  selectedStatus,
  setSelectedStatus,
  formSubmitRef,
  bottomSubmitRef,
}: FormBodyProps) => {
  const { data: dataSetting } = useGetSettingQuery();
  const { data: dataCity } = useGetCityQuery();
  const [patchOrder, { isLoading }] = usePatchClientOrderMutation();
  const [showButton, setShowButton] = useState<boolean>(false);
  const [thisOrder, setThisOrder] = useState(false);

  const formRef = useRef<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const [upDownData] = useState<SelectType[]>([
    { label: "none", value: "none" },
    { label: "UpSell", value: "UpSell" },
    { label: "DownSell", value: "UpSell" },
    { label: "CrossSell", value: "UpSell" },
  ]);

  const FormatCity = (data: CityModel[]) => {
    var options: { label: string; value: string | number }[] = [];

    data.map((dt) => {
      if (currentOrder.order[0].id_city === dt.id)
        options.push({ label: dt.name, value: dt.id || 0 });
      if (!dt.isDeleted && !dt.isFromSheet) {
        if (currentOrder.order[0].id_city !== dt.id)
          options.push({ label: dt.name, value: dt.id || 0 });
      }
    });

    return options;
  };

  const onSubmit = (values: Inputs) => {
    formSubmitRef?.current?.click();
    const data = {
      ...values,
      id: Number(id_orders[index]),
    };
    patchOrder(data)
      .unwrap()
      .then((res) => {
        refetch();
        showToastSucces("enregistré avec succès");
        if (id_orders.length === index + 1) return;
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

  const onSubmitHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowButton(true);
    formRef?.current?.click();
  };

  const onNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (id_orders.length === index + 1) {
      handleClose();
    }
    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    setSelectedStatus(currentOrder.data[0].status);
  }, [index]);

  const handleClick = (phone_number: string) => {
    window.open(
      `https://wa.me/${phone_number}?text=${encodeURI(
        dataSetting?.data.automated_msg || ""
      )}`,
      "_blank"
    );
  };

  const handleChangeStatus = (option: DropdownOptionType) => {
    //const { value } = e.target;
    const { value } = option;
    // console.log("--------come ehre------------");
    // console.log(value);
    setValue("status", String(value));
    setSelectedStatus(value);

    // console.log(value);

    // if (value === "Reporte") setShowReporte(true);
    // else setShowReporte(false);
  };

  // console.log(selectedStatus);

  return (
    <>
      <div className="card-body" style={{ width: "100%", flex: "none" }}>
        <div className="basic-form">
          <form
            // ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => {}}
          >
            <div className="row">
              <div className="col">
                <CustumInput
                  //defaultValue=""
                  defaultValue={currentOrder.order[0].nom}
                  //value={currentOrder.order[0].nom}
                  register={register}
                  name={"nom"}
                  error={errors.nom}
                  type={"text"}
                  label={"Destinataire"}
                  placeholder={"Patrick Doe"}
                  confirmation={true}
                />
              </div>
              <div className="col">
                <CustumInput
                  defaultValue={currentOrder.order[0].prix}
                  register={register}
                  name={"prix"}
                  error={errors.prix}
                  type={"text"}
                  label={"Prix"}
                  placeholder={"36540"}
                  confirmation={true}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <CustumInput
                  defaultValue={currentOrder.order[0].adresse}
                  register={register}
                  name={"adresse"}
                  error={errors.adresse}
                  type={"text"}
                  label={"Adresse"}
                  placeholder={"Bl 4 st.Jean"}
                  confirmation={true}
                />
              </div>
              <div className="col">
                {/* <div className={styles.rowCity}> */}
                <label className={styles.labelCity}>Ville</label>
                <CustumDropdown
                  refetch={refetch}
                  options={FormatCity(dataCity ? dataCity.data : [])}
                  name="id_city"
                  data={dataCity ? dataCity.data : []}
                  order={{
                    id: currentOrder.order[0].id,
                    id_city: currentOrder.order[0].id_city,
                    id_team: currentOrder.order[0].id_team,
                    createdAt: currentOrder.order[0].createdAt,
                  }}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <CustumInput
                  //defaultValue=""
                  //value={currentOrder.order[0].telephone}
                  defaultValue={currentOrder.order[0].telephone}
                  //defaultValue={currentOrder.order[0].telephone}
                  register={register}
                  name={"telephone"}
                  error={errors.telephone}
                  type={"text"}
                  label={"Telephone"}
                  placeholder={"778143610"}
                  confirmation={true}
                ></CustumInput>
              </div>
              <div className="col">
                <MyCustomSelect
                  label="Status"
                  //name="status"
                  //setValue={setValue}
                  defaultValue={{
                    label: currentOrder?.order[0]?.status || "",
                    value: currentOrder?.order[0]?.status || "",
                  }}
                  onChange={handleChangeStatus}
                  options={FilterStatusData(StatusData?.data)}
                />
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  //justifyContent: "center",
                }}
                className="col"
              >
                <div style={{ marginTop: "35px" }} className="call-ws-media">
                  <IoLogoWhatsapp
                    className="io-logo"
                    onClick={() =>
                      handleClick("+212" + currentOrder.order[0].telephone)
                    }
                    size={25}
                    color={"green"}
                  />
                  <a href={`tel:+212${currentOrder.order[0].telephone}`}>
                    <IoCallOutline
                      className="io-logo"
                      size={25}
                      color={"green"}
                    />
                  </a>
                </div>
              </div> */}
            </div>

            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    //justifyContent: "center",
                  }}
                  className="col"
                >
                  <div style={{ marginTop: "15px" }} className="call-ws-media">
                    <IoLogoWhatsapp
                      className="io-logo"
                      onClick={() =>
                        handleClick("+212" + currentOrder.order[0].telephone)
                      }
                      size={25}
                      color={"green"}
                    />
                    <a href={`tel:+212${currentOrder.order[0].telephone}`}>
                      <IoCallOutline
                        className="io-logo"
                        size={25}
                        color={"green"}
                      />
                    </a>
                  </div>
                </div>
                {/* <MyCustomSelect
                  label="Status"
                  //name="status"
                  //setValue={setValue}
                  defaultValue={{
                    label: currentOrder?.order[0]?.status || "",
                    value: currentOrder?.order[0]?.status || "",
                  }}
                  onChange={handleChangeStatus}
                  options={FilterStatusData(StatusData?.data)}
                /> */}
                {/* <CustumSelectForm
                  className={"lg-input-cus"}
                  defaultSelected={currentOrder.order[0].status}
                  data={FilterStatusData(StatusData?.data)}
                  register={register}
                  error={errors.status}
                  label={"Status"}
                  name={"status"}
                  confirmation={true}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                /> */}
              </div>
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                  //className="col"
                >
                  {currentOrder.order[0].isSendLivo === "not_send" ? (
                    <TbPointFilled size={40} color={"gray"} />
                  ) : currentOrder.order[0].isSendLivo === "error_send" ? (
                    <TbPointFilled size={40} color={"red"} />
                  ) : (
                    <TbPointFilled size={40} color={"green"} />
                  )}
                </div>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 30,
                }}
                className="col"
              >
                {currentOrder.order[0].isSendLivo === "not_send" ? (
                  <TbPointFilled size={40} color={"gray"} />
                ) : currentOrder.order[0].isSendLivo === "error_send" ? (
                  <TbPointFilled size={40} color={"red"} />
                ) : (
                  <TbPointFilled size={40} color={"green"} />
                )}
              </div> */}
            </div>
            {isLoading && <Spinner4Bar />}

            {/* <button hidden={true} ref={bottomSubmitRef} type="submit" /> */}

            <button
              //type="submit"
              hidden={true}
              ref={bottomSubmitRef}
              onClick={onSubmitHandle}
              className={styles.saveBtn}
            >
              Enregistrer
            </button>
            <button hidden={true} ref={formRef} type="submit" />

            {/* <div className={styles.bottomAction}>
                <button hidden={true} ref={bottomSubmitRef} type="submit" />
                <button
                  //type="submit"
                  onClick={onSubmitHandle}
                  className={styles.saveBtn}
                >
                  Enregistrer
                </button>
                {showButton && (
                  <button onClick={onNext} className={styles.NextBtn}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                )}
              </div> */}
          </form>
        </div>
      </div>
    </>
  );
};
