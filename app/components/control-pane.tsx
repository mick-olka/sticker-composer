type Props = {
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  onSaveResult: () => void;
};

export const ControlPane = ({
  rows,
  cols,
  onRowsChange,
  onColsChange,
  onSaveResult,
}: Props) => {
  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(event.target.value);
    if (!isNaN(newRows)) {
      onRowsChange(newRows);
    }
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(event.target.value);
    if (!isNaN(newCols)) {
      onColsChange(newCols);
    }
  };

  return (
    <div className="flex flex-col m-12 w-56 gap-4">
      <label className="flex justify-between">
        Rows:
        <input
          type="number"
          value={rows}
          onChange={handleRowsChange}
          className="bg-slate-800 px-2 w-24"
        />
      </label>
      <label className="flex justify-between">
        Columns:
        <input
          type="number"
          value={cols}
          onChange={handleColsChange}
          className="bg-slate-800 px-2 w-24"
        />
      </label>
      <button onClick={onSaveResult} className="bg-slate-600 p-4 text-white">
        Save PNG
      </button>
    </div>
  );
};
