import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Heatmap from "./charts/heatmap";

function Diagramm2(props) {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState([]);
  const [variable, setVariable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(props.data.currentDataSource)) {
      setGroup([
        ...new Set(
          props.data.currentDataSource.map((item) => item.CantonCode).sort()
        ),
      ]);
      setVariable([
        ...new Set(
          props.data.currentDataSource
            .map((item) => item.AccidentType_de)
            .sort()
        ),
      ]);

      setData(
        Array.from(
          d3.flatGroup(
            props.data.currentDataSource,
            // (v) => v.length,
            (d) => d.CantonCode,
            (d) => d.AccidentType_de
          )
        )
      );

      setLoading(false);
    }
    // d3.json(
    //   "https://severin.fra1.digitaloceanspaces.com/hslu/UnfallTypKantonYear.json"
    // ).then((d) => {
    //   setGroup([...new Set(d.data.map((item) => item.group))]);
    //   setVariable([...new Set(d.data.map((item) => item.variable))]);
    //   setData(d.data);
    //   setLoading(false);
    // });
    // console.log(data);
    // console.log(variable);
    // console.log(group);
    // return () => undefined;
  }, [props.data.currentDataSource]);

  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && (
        <Heatmap
          width={450}
          height={450}
          data={data}
          group={group}
          variable={variable}
        />
      )}
    </div>
  );
}

export default Diagramm2;