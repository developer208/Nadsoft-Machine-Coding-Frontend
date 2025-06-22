import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type tableProps = {
  rowData: any[];
  colDefs: any[];
};

const CustomTable = ({ rowData = [], colDefs = [] }: tableProps) => {
  return (
    <div>
      <div style={{ height: 400 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default CustomTable;
