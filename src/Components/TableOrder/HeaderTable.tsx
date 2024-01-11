import { useEffect, useState } from "react";
import {
  OrderQueryModel,
  StatusModel,
  countOrderByStatusModel,
} from "../../models";
import { GetCurrTeamMember } from "../../services/auth/GetCurrTeamMember";
import { useGetClientOrderExportModelQuery } from "../../services/api/ClientApi/ClientOrderApi";
import { CSVLink } from "react-csv";
import { BulkEditAgentModal } from "../Table/Modal/Order";
import { GetRole } from "../../services/storageFunc";
import style from "./table.module.css";
import { OrderFilter } from "../Filter/OrderFilter";
import { AiFillFilter } from "react-icons/ai";
import { Button } from "../../common";
import { createPortal } from "react-dom";

var currentTeam = GetCurrTeamMember();

type dataType = {
  id: number;
  label: string | undefined;
  value: string;
};

interface Props {
  statusList: dataType[];
  selectedStatus: dataType | undefined;
  setStatusValue: React.Dispatch<React.SetStateAction<dataType | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  _skip: number;
  refetch: () => any;
  id_orders: number[] | undefined;
  driverObj: {
    moveNext: () => void;
  };
  dataStatus:
    | {
        code: Number;
        data: StatusModel[];
        countOrderByStatus: countOrderByStatusModel[];
      }
    | undefined;
}
export default function HeaderTable({
  setShowModal,
  refetch,
  id_orders,
  setOrderQueryData,
  _skip,
  setStatus,
  setShowConfirmationModal,
  setShowDeleteModal,
  driverObj,
  dataStatus,
  statusList,
  setStatusValue,
  selectedStatus,
}: Props) {
  //console.log(selectedStatus);
  //console.log(statusList);
  return (
    <div className={style.headerTable}>
      <div className={style.leftTools}>
        <StartConfirmationBtn
          setShowModal={setShowConfirmationModal}
          driverObj={driverObj}
        />
        <AddOrderBtn setShowModal={setShowModal} driverObj={driverObj} />
      </div>
      <div className={style.middleTools}>
        <InputSearch
          _skip={_skip}
          setOrderQueryData={setOrderQueryData}
          refetch={refetch}
        />
        <StatusDropdown
          _skip={_skip}
          setOrderQueryData={setOrderQueryData}
          setStatus={setStatus}
          refetch={refetch}
          dataStatus={dataStatus}
          statusList={statusList}
          selectedStatus={selectedStatus}
          setStatusValue={setStatusValue}
        />
      </div>
      <div className={style.rightTools}>
        {GetRole() === "TEAM" ? (
          currentTeam.can_delete_order ? (
            <DeleteBulkOrder
              id_orders={id_orders}
              refetch={refetch}
              setShowDeleteModal={setShowDeleteModal}
            />
          ) : (
            <></>
          )
        ) : (
          <DeleteBulkOrder
            id_orders={id_orders}
            refetch={refetch}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        {GetRole() === "TEAM" ? (
          currentTeam.can_edit_order ? (
            <EditBulkOrder id_orders={id_orders} refetch={refetch} />
          ) : (
            <></>
          )
        ) : (
          <EditBulkOrder id_orders={id_orders} refetch={refetch} />
        )}
        <ImportBtn id_orders={id_orders} />
      </div>
    </div>
  );
}

interface SearchBarProps {
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  _skip: number;
  refetch: any;
}
const InputSearch = ({
  setOrderQueryData,
  refetch,
  _skip,
}: SearchBarProps): JSX.Element => {
  return (
    <div className={style.searchContainer}>
      <div className={style.searchIcon}>
        <img src="/svg/order/search.svg" alt="searcg" />
      </div>

      <input
        onChange={(e) => {
          setOrderQueryData({
            search: e.target.value,
            status: "",
            _skip: 0,
            _limit: _skip,
          });
          refetch();
        }}
        type="text"
        className={style.searchInput}
        placeholder="Recherche"
      />
    </div>
  );
};

interface DeleteBulkOrderProps {
  id_orders: number[] | undefined;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => any;
}
const DeleteBulkOrder = ({
  id_orders,
  setShowDeleteModal,
}: DeleteBulkOrderProps): JSX.Element => {
  const handleDestroyOrder = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  return (
    <Button
      color="primary"
      onClick={handleDestroyOrder}
      icon={
        <img
          src="/svg/order/delete.svg"
          alt="delete"
          className={id_orders && id_orders?.length > 0 ? "del-order-hov" : ""}
          color={id_orders && id_orders?.length > 0 ? "red" : "gray"}
          // onClick={handleDestroyOrder}
        />
      }
    />
    // <img
    //   src="/svg/order/delete.svg"
    //   alt="delete"
    //   className={id_orders && id_orders?.length > 0 ? "del-order-hov" : ""}
    //   color={id_orders && id_orders?.length > 0 ? "red" : "gray"}
    //   onClick={handleDestroyOrder}
    // />
  );
};

interface EditBulkOrderProps {
  id_orders: number[] | undefined;
  refetch: () => any;
}
const EditBulkOrder = ({
  id_orders,
  refetch,
}: EditBulkOrderProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDestroyOrder = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!id_orders || id_orders?.length <= 0) return;

    setShowModal(true);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <BulkEditAgentModal
            id_orders={id_orders}
            showModal={showModal}
            setShowModal={setShowModal}
            refetch={refetch}
          />,
          document.body
        )}

      <Button
        color="primary"
        onClick={handleDestroyOrder}
        icon={
          <img
            src="/svg/order/pencil.svg"
            alt="pencil"
            className={
              id_orders && id_orders?.length > 0 ? "del-order-hov" : ""
            }
            color={id_orders && id_orders?.length > 0 ? "black" : "gray"}
            onClick={handleDestroyOrder}
          />
        }
      />
    </>
  );
};

interface AddOrderBtnProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  driverObj: {
    moveNext: () => void;
  };
}

const AddOrderBtn = ({
  setShowModal,
  driverObj,
}: AddOrderBtnProps): JSX.Element => {
  const handleShowTeamModal = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      driverObj.moveNext();
    }, 1000);
  };

  return (
    <Button
      color="primary"
      icon={<img src="/svg/order/add.svg" alt="add" />}
      onClick={handleShowTeamModal}
    />
    // <button
    //   icon={<img src="/svg/order/add.svg" alt="add" />}
    //   onClick={handleShowTeamModal}
    // >
    //   <img src="/svg/order/add.svg" alt="add" />
    // </button>
  );
};

const StartConfirmationBtn = ({
  setShowModal,
  driverObj,
}: AddOrderBtnProps): JSX.Element => {
  const handleShowTeamModal = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      driverObj.moveNext();
    }, 1000);
  };

  return (
    <Button
      color="primary"
      onClick={handleShowTeamModal}
      icon={<img src="/svg/order/call.svg" alt="add" />}
    />
    // <img src="/svg/order/call.svg" onClick={handleShowTeamModal} alt="add" />
  );
};

interface ImportBtnProps {
  id_orders: number[] | undefined;
}
const ImportBtn = ({ id_orders }: ImportBtnProps): JSX.Element => {
  const { data: exportData, refetch } = useGetClientOrderExportModelQuery({
    id_orders: JSON.stringify(id_orders),
  });

  useEffect(() => {
    refetch();
  }, [id_orders]);

  const headers: { label: string; key: string }[] = [];

  return (
    <CSVLink
      separator={";"}
      filename={"youscale_order.csv"}
      className="all-status-txt"
      data={exportData ? exportData?.data : []}
      headers={exportData ? exportData?.header : headers}
    >
      <Button
        color="primary"
        onClick={() => {}}
        icon={<img src="/svg/order/xsls.svg" alt="xsls" />}
      />
    </CSVLink>
  );
};

interface PropsStatus {
  statusList: dataType[];
  selectedStatus: dataType | undefined;
  setStatusValue: React.Dispatch<React.SetStateAction<dataType | undefined>>;
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  _skip: number;
  refetch: any;
  dataStatus:
    | {
        code: Number;
        data: StatusModel[];
        countOrderByStatus: countOrderByStatusModel[];
      }
    | undefined;
}
const StatusDropdown = ({
  setOrderQueryData,
  refetch,
  _skip,
  setStatus,
  dataStatus,
  statusList,
  selectedStatus,
  setStatusValue,
}: PropsStatus): JSX.Element => {
  const [count, SetCount] = useState(0);
  const [data, setData] = useState<dataType[]>([]);
  const [selectedStatusValue, SetSelectedStatusValue] = useState<
    dataType | undefined
  >({
    id: 0,
    label: `Tous les status`,
    value: "",
  });

  useEffect(() => {
    SetCount(getTotalStatus);
  }, [setOrderQueryData, refetch, _skip, setStatus, dataStatus]);

  //set the data
  // useEffect(() => {
  //     setData(convertStatusData(dataStatus?.countOrderByStatus));
  // }, [dataStatus]);

  // useEffect(() => {
  //     if (!selectedStatusValue?.id && data[0]) {
  //         SetSelectedStatusValue(data[0]);
  //     } else if (selectedStatusValue && data.length > 0) {
  //         SetSelectedStatusValue(
  //             data.filter((item) => item.id === selectedStatusValue.id)[0]
  //         );
  //         //////console.log(data.filter((item) => item.id === selectedStatusValue.id));
  //     }
  // }, [data]);

  const convertStatusData = (
    data: countOrderByStatusModel[] | undefined
  ): dataType[] => {
    if (!data) return [];

    var outputData: dataType[] = [];

    outputData.push({
      id: 0,
      label: `Tous les status (${getTotalStatus()})`,
      value: "",
    });

    data.map((dt) => {
      if (dt.checked) {
        outputData.push({
          id: dt.id,
          label: `${dt.name} + (${dt.count})`,
          value: String(dt.name),
        });
      }
    });
    return outputData;
  };

  const handleChangeStatus = (selected: dataType) => {
    const { label, value, id } = selected;

    var search = value === "Status" ? undefined : value;

    ////console.log("------------value------------");
    ////console.log(search, label, value, id);

    setStatus(search);
    //SetSelectedStatusValue(selected);
    setStatusValue(selected);

    setOrderQueryData((prevState) => ({
      ...prevState,
      status: search,
      _skip: 0,
      _limit: 20,
    }));
    refetch();
  };

  const getTotalStatus = (): number => {
    var sum: number = 0;
    if (dataStatus) {
      dataStatus.countOrderByStatus.map((status, index) => {
        if (status.checked) {
          sum += status.count;
        }
      });
    }

    return sum;
  };

  ////console.log(data);
  ////console.log(selectedStatusValue);

  return (
    <div className="col-auto my-1">
      <OrderFilter
        Icons={AiFillFilter}
        label={`Tous les status`}
        count={count}
        data={statusList}
        //data={convertStatusData(dataStatus?.countOrderByStatus)}
        onChange={handleChangeStatus}
        filteredValue={selectedStatus}
      />
    </div>
  );
};
