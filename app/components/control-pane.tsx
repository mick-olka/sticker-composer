import { Button } from "@/components/ui/button"
import React from "react";
import {Dropdown} from "@/app/components/ui/dropdown";
import {pageSizes} from "@/app/components/data";

type Props = {
  pageSize: string;
  onPageSizeChange: (pageSize: string) => void;
  onSaveResult: () => void;
};

export const ControlPane = ({
  onSaveResult,
    pageSize,
    onPageSizeChange
}: Props) => {
  // const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newRows = parseInt(event.target.value);
  //   if (!isNaN(newRows)) {
  //     onRowsChange(newRows);
  //   }
  // };
  //
  // const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newCols = parseInt(event.target.value);
  //   if (!isNaN(newCols)) {
  //     onColsChange(newCols);
  //   }
  // };

  return (
    <div className="flex flex-col m-12 w-56 gap-4">
      <Dropdown items={pageSizes} value={pageSize} onChange={onPageSizeChange} />
      {/*<label className="flex justify-between">*/}
      {/*  Rows:*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={rows}*/}
      {/*    onChange={handleRowsChange}*/}
      {/*    className="bg-slate-800 px-2 w-24"*/}
      {/*  />*/}
      {/*</label>*/}
      {/*<label className="flex justify-between">*/}
      {/*  Columns:*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={cols}*/}
      {/*    onChange={handleColsChange}*/}
      {/*    className="bg-slate-800 px-2 w-24"*/}
      {/*  />*/}
      {/*</label>*/}
      <Button onClick={onSaveResult} className="bg-slate-600 p-4 text-white text-xl">
        Save PNG
      </Button>
    </div>
  );
};
