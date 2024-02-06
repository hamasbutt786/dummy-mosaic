
// import React, { useState } from 'react';
// import XLSX from 'xlsx';

// const FileUploader = () => {
//     const [file, setFile] = useState(null);
//     const [columns, setColumns] = useState([]);
//     const [selectedColumn, setSelectedColumn] = useState('');
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');
//     const [newColumnName, setNewColumnName] = useState('');

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//         setError('');
//         if (selectedFile) {
//             readExcelFile(selectedFile);
//         }
//     };

//     const readExcelFile = (file) => {
//         const fileReader = new FileReader();
//         fileReader.onload = (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = XLSX.read(data, { type: 'array' });
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//             const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//             const headers = excelData[0];
//             const formattedData = excelData.slice(1).map((row) => {
//                 const rowData = {};
//                 headers.forEach((header, index) => {
//                     const updatedHeader = header === selectedColumn ? selectedColumn : header;
//                     rowData[updatedHeader] = row[index];
//                 });
//                 return rowData;
//             });

//             setColumns(headers);
//             setData(formattedData);
//         };
//         fileReader.readAsArrayBuffer(file);
//     };

//     const handleColumnClick = (column) => {
//         setSelectedColumn(column);
//         setNewColumnName('');
//     };

//     const handleNewColumnNameChange = (e) => {
//         setNewColumnName(e.target.value);
//     };

//     const handleRenameColumn = () => {
//         if (newColumnName) {
//             const updatedColumns = columns.map((header) =>
//                 header === selectedColumn ? newColumnName : header
//             );
//             const updatedData = data.map((row) => {
//                 const updatedRow = { ...row };
//                 const value = updatedRow[selectedColumn];
//                 delete updatedRow[selectedColumn];
//                 updatedRow[newColumnName] = value;
//                 return updatedRow;
//             });
//             setColumns(updatedColumns);
//             setData(updatedData);
//             setSelectedColumn(newColumnName);
//         }
//     };

//     return (
//         <div className="w-full mx-auto p-6 bg-gray-200 rounded shadow">

//             {error && <p>{error}</p>}
//             <input type="file" onChange={handleFileChange} accept=".xlsx" />
//             {selectedColumn && (
//                 <div className="mt-4 max-w-[300px]">
//                     <label htmlFor="newColumnName" className="block font-medium mb-2">
//                         Select the header for {selectedColumn}:
//                     </label>
//                     <select
//                         id="newColumnName"
//                         value={newColumnName}
//                         onChange={handleNewColumnNameChange}
//                         className="w-full py-2 px-4 border flex justify-center items-center border-gray-300 rounded"
//                     >
//                         <option value="">-- Select a new header --</option>
//                         <option value="PO_Number">PO_Number</option>
//                         <option value="PO_Facility">PO_Facility</option>
//                         <option value="PO_Date">PO_Date</option>
//                         <option value="PO_Order">PO_Order</option>
//                     </select>
//                     <button
//                         onClick={handleRenameColumn}
//                         className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//                     >
//                         Update
//                     </button>
//                 </div>
//             )}
//             {data.length > 0 && (
//                 <div>
//                     <table className="w-full mt-4">
//                         <thead>
//                             <tr>
//                                 {columns.map((column) => (
//                                     <th
//                                         key={column}
//                                         className={`py-2 px-4 cursor-pointer ${column === selectedColumn ? 'bg-blue-500 text-white' : 'bg-gray-300'
//                                             }`}
//                                         onClick={() => handleColumnClick(column)}
//                                     >
//                                         {column === selectedColumn ? selectedColumn : column}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((row, index) => (
//                                 <tr key={index} className='text-center'>
//                                     {columns.map((column) => (
//                                         <td key={column}>{row[column]}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}


//         </div>
//     );
// };

// export default FileUploader;
import React, { useState } from 'react';
import XLSX from 'xlsx';

const FileUploader = () => {
    const [files, setFiles] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [newColumnName, setNewColumnName] = useState('');
    const handleNewColumnNameChange = (e) => {
                setNewColumnName(e.target.value);
            };
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFiles(selectedFiles);
        setDataList([]);

        Array.from(selectedFiles).forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const headers = excelData[0];
                const formattedData = excelData.slice(1).map((row) => {
                    const rowData = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index];
                    });
                    return rowData;
                });

                setDataList((prevDataList) => [
                    ...prevDataList,
                    { file: file.name, headers, data: formattedData, selectedColumn: '' },
                ]);
            };
            fileReader.readAsArrayBuffer(file);
        });
    };

    const handleColumnSelect = (fileIndex, selectedColumn) => {
        setDataList((prevDataList) =>
            prevDataList.map((fileData, index) =>
                index === fileIndex ? { ...fileData, selectedColumn } : fileData
            )
        );
    };

    const handleRenameColumn = (fileIndex) => {
        setDataList((prevDataList) =>
            prevDataList.map((fileData, index) => {
                if (index === fileIndex) {
                    const { headers, data, selectedColumn } = fileData;
                    const updatedColumns = headers.map((header) =>
                        header === selectedColumn ? newColumnName : header
                    );
                    const updatedData = data.map((row) => {
                        const updatedRow = { ...row };
                        const value = updatedRow[selectedColumn];
                        delete updatedRow[selectedColumn];
                        updatedRow[newColumnName] = value;
                        return updatedRow;
                    });
                    return { ...fileData, headers: updatedColumns, data: updatedData };
                }
                return fileData;
            })
        );
    };
    return (
        <>
            <input type="file" onChange={handleFileChange} multiple accept=".xlsx" />

            <div className="w-full  flex-wrap max-w-[1920] gap-8 border  mx-auto p-6 flex bg-gray-200 rounded shadow">

                {dataList.map(({ file, headers, data, selectedColumn }, fileIndex) => (
                    <div key={file} className="mt-8 mx-auto overflow-x-auto border-gray-600 border p-4">
                        <h3 className="font-bold">{file}</h3>
                        <div className="mt-4 max-w-[300px]">
                            <label htmlFor={`header-select-${fileIndex}`} className="block font-medium mb-2">
                                Select the header:
                            </label>
                            <select
                                id={`header-select-${fileIndex}`}
                                value={selectedColumn}
                                onChange={(e) => handleColumnSelect(fileIndex, e.target.value)}
                                className="w-full py-2 px-4 border border-gray-300 rounded"
                            >
                                <option value="">-- Select a header --</option>
                                {headers.map((header, index) => (
                                    <option key={index} value={header}>
                                        {header}
                                    </option>
                                ))}
                            </select>
                            {selectedColumn && (
                                <div className="mt-4">
                                    <label htmlFor={`new-column-name-${fileIndex}`} className="block font-medium mb-2">
                                        Select the new column name:
                                    </label>
                                    <select
                                        id="newColumnName"
                                        value={newColumnName}
                                        onChange={handleNewColumnNameChange}
                                        className="w-full py-2 px-4 border flex justify-center items-center border-gray-300 rounded"
                                    >
                                        <option value="">-- Select a new header --</option>
                                        <option value="PO_Number">PO_Number</option>
                                        <option value="PO_Facility">PO_Facility</option>
                                        <option value="PO_Date">PO_Date</option>
                                        <option value="PO_Order">PO_Order</option>
                                    </select>
                                    <button
                                        onClick={() => handleRenameColumn(fileIndex)}
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                        </div>
                        {data.length > 0 && (
                            <div>
                                <table className="w-full mt-4">
                                    <thead>
                                        <tr>
                                            {headers.map((header, index) => (
                                                <th
                                                    key={index}
                                                    className={`py-2 px-4 cursor-pointer ${header === selectedColumn ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                                        }`}
                                                    onClick={() => handleColumnSelect(fileIndex, header)}
                                                >
                                                    {header === selectedColumn ? selectedColumn : header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, index) => (
                                            <tr key={index} className="text-center">
                                                {headers.map((header, index) => (
                                                    <td key={index}>{row[header]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default FileUploader;
