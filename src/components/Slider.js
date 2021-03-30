import * as React from "react";
import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

// Component source: https://www.npmjs.com/package/react-range
const LabeledTwoThumbs = ({
  rtl,
  STEP,
  MIN,
  MAX,
  filters,
  setFilters,
  fetchData,
}) => {
  const [values, setValues] = useState([0, 500]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        // zIndex: 0,
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        // On change, update of filters value and send of a new data offers request
        onChange={(values) => {
          setValues(values);
          const newFilters = { ...filters };
          newFilters.priceMin = values[0];
          newFilters.priceMax = values[1];
          setFilters(newFilters);
          fetchData(
            filters.title,
            newFilters.priceMin,
            newFilters.priceMax,
            filters.sort,
            filters.skip,
            filters.limit
          );
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#2DB0BA", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#2DB0BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-24px",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "Roboto,Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#2DB0BA",
                width: "40px",
                textAlign: "center",
              }}
            >
              {values[index].toFixed(0)} €
            </div>
            <div
              style={{
                height: "0px",
                width: "0px",
                backgroundColor: isDragged ? "#2DB0BA" : "#CCC",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default LabeledTwoThumbs;
