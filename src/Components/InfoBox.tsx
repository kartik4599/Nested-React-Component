import React, { useRef, useState } from "react";
import classes from "./main.module.css";
import { boxdetail } from "./Main";

const InfoBox: React.FC<{
  detail: boxdetail;
  removeHandler: any;
  color: boolean;
  manipulate: any;
}> = ({ detail, removeHandler, color, manipulate }) => {
  const [value, setValue] = useState("");

  const addHandler = () => {
    if (!value) return;

    manipulate([
      ...detail.children,
      {
        detail: {
          id: new Date().getTime(),
          name: value,
        },
        children: [],
      },
    ]);
    setValue("");
  };

  const deleteHandler = (id: number) => {
    manipulate(detail.children.filter((l) => l.detail.id !== id));
  };

  const manipulateHandler = (id: number, arr: boxdetail[]) => {
    const sortedArr = detail.children.map((l) => {
      if (l.detail.id === id) {
        return { ...l, children: arr };
      } else {
        return l;
      }
    });
    manipulate(sortedArr);
  };

  return (
    <div className={classes.cover}>
      <div className={classes.innerCover}>
        <div className={color ? classes.alterbox : classes.box}>
          <div>
            <h3>{detail.detail.name}</h3>
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <div className={classes.btngroup}>
            <button onClick={addHandler}>Add +</button>
            <button onClick={removeHandler}>Delete -</button>
          </div>
        </div>
        {/* <div style={{ display: "flex" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={classes.flatPath} />
          ))}
        </div> */}
      </div>
      <div style={{ display: "flex" }}>
        {detail.children.map((list, index) => (
          <InfoBox
            key={index}
            detail={list}
            removeHandler={deleteHandler.bind(null, list.detail.id)}
            color={!color}
            manipulate={manipulateHandler.bind(null, list.detail.id)}
          />
        ))}
      </div>
      {/* {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={classes.path} />
      ))} */}
    </div>
  );
};

export default InfoBox;
