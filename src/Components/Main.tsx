import { useState } from "react";
import classes from "./main.module.css";
import InfoBox from "./InfoBox";

export interface boxdetail {
  detail: {
    id: number;
    name: string;
  };
  children: boxdetail[];
}

const Main = () => {
  const [list, setList] = useState<boxdetail[]>([]);

  const addHandler = () => {
    setList([
      ...list,
      {
        detail: {
          id: new Date().getTime(),
          name: (list.length + 1).toString(),
        },
        children: [],
      },
    ]);
  };

  const deleteHandler = (id: number) => {
    setList(list.filter((l) => l.detail.id !== id));
  };

  const manipulateHandler = (id: number, arr: boxdetail[]) => {
    const sortedArr = list.map((l) => {
      if (l.detail.id === id) {
        return { ...l, children: arr };
      } else {
        return l;
      }
    });
    setList(sortedArr);
  };

  return (
    <div>
      <button className={classes.mainBtn} onClick={addHandler}>
        Add New Node
      </button>
      <div style={{ display: "flex",justifyContent:"center" }}>
        {list.map((list, index) => (
          <InfoBox
            key={index}
            detail={list}
            removeHandler={deleteHandler.bind(null, list.detail.id)}
            color={false}
            manipulate={manipulateHandler.bind(null, list.detail.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
