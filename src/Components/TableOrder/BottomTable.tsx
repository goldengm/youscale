import { ElementRef, useRef, useState } from "react";
import {
  OrderQueryModel,
  StatusModel,
  countOrderByStatusModel,
} from "../../models";
import style from "./table.module.css";
import { string } from "yup";

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncated: string = str.substr(0, maxLength);
    const lastSpaceIndex: number = truncated.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      return truncated.substr(0, lastSpaceIndex) + "...";
    } else {
      return truncated + "...";
    }
  }
}

type dataType = {
  id: number;
  label: string | undefined;
  value: string;
};

interface Props {
  statusList: dataType[];
  selectedStatus: dataType | undefined;
  setStatusValue: React.Dispatch<React.SetStateAction<dataType | undefined>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  dataStatus:
    | {
        code: Number;
        data: StatusModel[];
        countOrderByStatus: countOrderByStatusModel[];
      }
    | undefined;
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  refetch: () => any;
}
export default function BottomTable({
  setStatus,
  dataStatus,
  setOrderQueryData,
  refetch,
  statusList,
  selectedStatus,
  setStatusValue,
}: Props) {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const displayElemRef = useRef<HTMLDivElement>(null);

  const moveLeft = () => {
    if (displayElemRef.current && dataStatus?.data) {
      const scrollStep = 100; // Adjust this value as needed
      const newPosition = scrollPosition - scrollStep;

      if (newPosition >= 0) {
        displayElemRef.current.scrollTo({
          left: newPosition,
          behavior: "smooth", // You can use 'auto' for instant scroll without animation
        });
        setScrollPosition(newPosition);
      } else {
        displayElemRef.current.scrollTo({
          left: 0,
          behavior: "smooth", // 'auto' for instant scroll
        });
        setScrollPosition(0);
      }
    }
  };

  const moveRight = () => {
    if (displayElemRef.current && dataStatus?.data) {
      const scrollStep = 100; // Adjust this value as needed
      const maxScroll =
        displayElemRef.current.scrollWidth - displayElemRef.current.clientWidth;
      const newPosition = scrollPosition + scrollStep;

      if (newPosition <= maxScroll) {
        displayElemRef.current.scrollTo({
          left: newPosition,
          behavior: "smooth", // You can use 'auto' for instant scroll without animation
        });
        setScrollPosition(newPosition);
      } else {
        displayElemRef.current.scrollTo({
          left: maxScroll,
          behavior: "smooth", // 'auto' for instant scroll
        });
        setScrollPosition(maxScroll);
      }
    }
  };

  const scrollContainerStyles: React.CSSProperties = {
    overflowX: "auto",
    scrollLeft: scrollPosition,
  } as React.CSSProperties; // Using type assertion here

  return (
    <div className={style.bottomTable}>
      <div
        ref={displayElemRef}
        className={style.displayStatus}
        style={scrollContainerStyles}
      >
        {dataStatus?.data.map(
          (dt, index) =>
            dt.checked && (
              <StatusItems
                key={index}
                name={dt.name}
                setOrderQueryData={setOrderQueryData}
                refetch={refetch}
                setStatus={setStatus}
                borderColor={dt.color || "transparent"}
                statusList={statusList}
                selectedStatus={selectedStatus}
                setStatusValue={setStatusValue}
              />
            )
        )}
      </div>
      <div className={style.statusControls}>
        <img
          src="/svg/order/prev_table.svg"
          alt="prev_table"
          onClick={moveLeft}
        />
        <img
          src="/svg/order/next_table.svg"
          alt="next_table"
          onClick={moveRight}
        />
      </div>
    </div>
  );
}

interface StatusProps {
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  name: string;
  borderColor: string;
  setOrderQueryData: React.Dispatch<React.SetStateAction<OrderQueryModel>>;
  refetch: () => any;
  statusList: dataType[];
  selectedStatus: dataType | undefined;
  setStatusValue: React.Dispatch<React.SetStateAction<dataType | undefined>>;
}

const StatusItems = ({
  name,
  setStatus,
  setOrderQueryData,
  refetch,
  statusList,
  selectedStatus,
  setStatusValue,
}: StatusProps): JSX.Element => {
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //console.log("++++++++++++", name);
    e.preventDefault();
    setStatus(name);
    setStatusValue(statusList.filter((item) => item.value === name)[0]);
    ////console.log(statusList.filter((item) => item.value === name)[0]);

    setOrderQueryData({ status: name, search: "", _skip: 0, _limit: 20 });
    refetch();
  };

  return (
    <div title={name} onClick={onClick} className={style.status}>
      <p>{truncateString(name, 10)}</p>
    </div>
  );
};
