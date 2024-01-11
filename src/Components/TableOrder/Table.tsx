import { createPortal } from "react-dom";
import HeaderTable from "./HeaderTable";
import TableContainer from "./TableContainer";
import Row from "./Row";
// import BottomTable from "./BottomTable";
import style from "./table.module.css";
import { ConfirmationModal } from "../Modal";
import {
  ColumnModel,
  GetClientOrderModel,
  OrderQueryModel,
  ProductOrder,
} from "../../models";
import AddOrderModal from "../Modal/order/AddOrderModal";
import EditOrderModal from "../Modal/order/EditOrderModal";
import { useGetStatusQuery } from "../../services/api/ClientApi/ClientStatusApi";
import { useEffect, useState } from "react";
import { useGetColumnQuery } from "../../services/api/ClientApi/ClientColumnApi";
import { AddProductOrderModal, DeleteOrderModal } from "../Table/Modal/Order";
import { countOrderByStatusModel } from "../../models";

type Order =
  | {
      code: Number;
      data: GetClientOrderModel[];
      order: {
        id: number;
        id_city: number;
        isSendLivo: string;
        SheetId: string;
        id_team: number;
        Product_Orders: ProductOrder[];
        reportedDate: string;
        telDuplicate: boolean;
        createdAt: Date;
      }[];
    }
  | undefined;

const GetColumn = (col: ColumnModel[] | undefined): string[] => {
  if (!col) return [];

  var column: string[] = [];

  col.map((dt) => dt.active && column.push(dt.alias || dt.name));

  return [...column];
};

interface OrderModel {
  id: number;
  SheetId: string;
  checked?: boolean;
  id_city: number;
  id_team: number;
  Product_Orders: ProductOrder[];
  createdAt: Date;
  reportedDate: string;
  isSendLivo: string;
  telDuplicate: boolean;
}

interface Props {
  data: Order;
  OrderQueryData: OrderQueryModel;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  refetch: () => any;
  _setSkip: React.Dispatch<React.SetStateAction<number>>;
  _skip: number;
  driverObj: {
    moveNext: () => void;
  };
  setStatusConfirmation: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  statusConfirmation: string | undefined;
  orders_id: number[];
}

type dataType = {
  id: number;
  label: string | undefined;
  value: string;
};

export const Table = ({
  data,
  OrderQueryData,
  setStatus,
  setOrderQueryData,
  refetch,
  _setSkip,
  _skip,
  driverObj,
  setStatusConfirmation,
  statusConfirmation,
  orders_id,
}: Props): JSX.Element => {
  const { data: dataStatus, refetch: RefetchStatusData } =
    useGetStatusQuery(OrderQueryData);
  const [editData, setEditData] = useState<GetClientOrderModel>(
    {} as GetClientOrderModel
  );
  const [order, setOrder] = useState<OrderModel | undefined>();
  const [statusList, setStatusList] = useState<dataType[]>([]);
  const [selectedStatus, setStatusValue] = useState<dataType | undefined>({
    id: 0,
    label: `Tous les status`,
    value: "",
  });

  const fetchData = async () => {
    _setSkip(_skip + 50);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductOrderModal, setShowProductOrderModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { data: ColumnData, isLoading, isFetching } = useGetColumnQuery();

  const [id_orders, setIdOrders] = useState<number[]>();

  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [rowData, setRowData] = useState<
    | {
        id: number;
        checked?: boolean;
        isSendLivo: string;
        SheetId: string;
        id_city: number;
        id_team: number;
        Product_Orders: ProductOrder[];
        createdAt: Date;
        reportedDate: string;
        telDuplicate: boolean;
      }[]
    | undefined
  >();

  useEffect(() => {
    setStatusList(convertStatusData(dataStatus?.countOrderByStatus));
  }, [dataStatus]);

  useEffect(() => {
    if (!selectedStatus?.id && statusList[0]) {
      setStatusValue(statusList[0]);
    } else if (selectedStatus && statusList.length > 0) {
      setStatusValue(
        statusList.filter((item) => item.id === selectedStatus.id)[0]
      );
      //////console.log(data.filter((item) => item.id === selectedStatus.id));
    }
  }, [statusList]);

  // //console.log(selectedStatus);
  // //console.log(statusList);

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
          ///label: `${dt.name} + (${dt.count})`,
          label: `${dt.name} (${dt.count})`,
          value: String(dt.name),
        });
      }
    });
    return outputData;
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

  useEffect(() => {
    setRowData(data?.order);
  }, [data?.order]);

  const handleCheckAll = () => {
    const newRows =
      data?.order &&
      data?.order.map((row) => ({
        ...row,
        checked: !selectAll,
      }));
    setSelectAll(!selectAll);

    const newIdOrders =
      newRows && newRows.filter((row) => row.checked).map((row) => row.id);
    setIdOrders(newIdOrders);

    setRowData(newRows); // Do whatever you want with the checked rows
  };

  const handleCheckRow = (id: number) => {
    const newRows =
      rowData &&
      rowData.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            checked: !row.checked,
          };
        }
        return row;
      });

    const newIdOrders =
      newRows && newRows.filter((row) => row.checked).map((row) => row.id);
    setIdOrders(newIdOrders);
    setRowData(newRows);
  };

  return (
    <div className={style.tableWrapper}>
      {showDeleteModal &&
        createPortal(
          <DeleteOrderModal
            refetch={refetch}
            showModal={showDeleteModal}
            setShowModal={setShowDeleteModal}
            id_orders={id_orders}
          />,
          document.body
        )}
      {showOrderModal &&
        createPortal(
          <AddOrderModal
            driverObj={driverObj}
            refetch={refetch}
            setIsVisible={setShowOrderModal}
          />,
          document.body
        )}

      {createPortal(
        <ConfirmationModal
          driverObj={driverObj}
          statusConfirmation={statusConfirmation}
          refetch={refetch}
          setStatus={setStatusConfirmation}
          id_orders={orders_id ?? []}
          isOpen={showConfirmationModal}
          setIsVisible={setShowConfirmationModal}
        />,
        document.body
      )}

      {showEditModal &&
        createPortal(
          <EditOrderModal
            setIsVisible={setShowEditModal}
            refetch={refetch}
            dataEdit={editData}
            id_order={String(order?.id)}
            driverObj={driverObj}
          />,
          document.body
        )}
      {showProductOrderModal &&
        createPortal(
          <AddProductOrderModal
            editData={order?.Product_Orders}
            id={order?.id ?? 0}
            refetch={refetch}
            showModal={showProductOrderModal}
            setShowModal={setShowProductOrderModal}
          />,
          document.body
        )}

      <HeaderTable
        setShowConfirmationModal={setShowConfirmationModal}
        driverObj={driverObj}
        dataStatus={dataStatus}
        setShowDeleteModal={setShowDeleteModal}
        setShowModal={setShowOrderModal}
        id_orders={id_orders}
        refetch={refetch}
        _skip={_skip}
        setOrderQueryData={setOrderQueryData}
        setStatus={setStatus}
        statusList={statusList}
        selectedStatus={selectedStatus}
        setStatusValue={setStatusValue}
      />

      <TableContainer
        column={GetColumn(ColumnData?.data)}
        handleCheckAll={handleCheckAll}
        dataLength={data?.data.length || 0}
        fetchData={fetchData}
        isLoading={isFetching}
      >
        {data ? (
          data?.data.map((dt, index) => (
            <Row
              RefetchStatusData={RefetchStatusData}
              key={index}
              handleCheckRow={handleCheckRow}
              row={dt}
              setIdOrders={setIdOrders}
              setOrder={setOrder}
              setEditData={setEditData}
              setShowEditModal={setShowEditModal}
              setShowOrderModal={setShowProductOrderModal}
              refetch={refetch}
              order={rowData ? rowData[index] : undefined}
              column={ColumnData?.data}
            />
          ))
        ) : (
          <></>
        )}
      </TableContainer>

      {/* <BottomTable
        dataStatus={dataStatus}
        setStatus={setStatus}
        setOrderQueryData={setOrderQueryData}
        refetch={refetch}
        selectedStatus={selectedStatus}
        setStatusValue={setStatusValue}
        statusList={statusList}
      /> */}
    </div>
  );
};
