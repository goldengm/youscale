import React from "react";
import AddSupportModal from "../../Modal/support/AddSupportModal";
import { AiFillFilter } from "react-icons/ai";
import { SupportFilter } from "../../Filter/SupportFilter";
import { Support } from "../../../models";
import styles from "./support.module.css";
import { createPortal } from "react-dom";
//import { Table } from "../Order";
import { Table } from "reactstrap";

type dataType = {
  label: string;
  value: string;
};

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[] | any;
  column: string[];
  AddBtn: JSX.Element;
  refetch?: () => any;
  item?: Support | undefined;
  showAddSupportModal?: boolean;
  setShowCreateSupportModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<
    React.SetStateAction<{
      status?: string | undefined;
    }>
  >;
}
export default function TableWrapper({
  children,
  title,
  column,
  AddBtn,
  refetch,
  showAddSupportModal,
  setShowCreateSupportModal,
  setQuery,
}: Props): JSX.Element {
  const changeStatus = ({ value, label }: dataType) => {
    setQuery({ status: value === String("0") ? undefined : value });
  };

  const never = (): any => { };

  return (
    <div className="col product-table">
      {showAddSupportModal ? (
        createPortal(
          <AddSupportModal
            refetch={refetch ?? never()}
            setIsVisible={setShowCreateSupportModal ?? never()}
          />,
          document.body
        )
      ) : (
        <></>
      )}

      <div className="card">
        <div className="card-header">
          <SearchInput />
          <SupportFilter
            Icons={AiFillFilter}
            label={"Produit"}
            data={[
              { value: "pending", label: "pending" },
              { value: "open", label: "open" },
              { value: "in_progress", label: "in_progress" },
              { value: "done", label: "done" },
            ]}
            onChange={changeStatus}
          />
          {AddBtn}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  {column.map((col: string, key: number) => (
                    <th key={key}>{col}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchInput = (): JSX.Element => {
  return (
    <div className={styles.searchContainer}>
      <img src="/svg/support/search.svg" alt="search" />
      <input type="text" placeholder={"Recherche"} />
    </div>
  );
};
