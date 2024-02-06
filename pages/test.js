
// import React, { useState } from 'react';
// import XLSX from 'xlsx';

// const ExcelUploader = () => {
//   const [data, setData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(-1);
// console.log(data,"datataaa")
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const workbook = XLSX.read(event.target.result, { type: 'binary' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       setData(excelData);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleCellChange = (e, rowIndex, columnIndex) => {
//     const updatedData = [...data];
//     updatedData[rowIndex][columnIndex] = e.target.value;
//     setData(updatedData);
//   };

//   return (
//     <div>
//       <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
//       <table>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, columnIndex) => (
//                 <td key={columnIndex}>
//                   {editingIndex === rowIndex && (
//                     <input
//                       type="text"
//                       value={cell}
//                       onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
//                     />
//                   )}
//                   {editingIndex !== rowIndex && <span>{cell}</span>}
//                 </td>
//               ))}
//               <td>
//                 <button onClick={() => setEditingIndex(rowIndex)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExcelUploader;
// import React, { useState } from 'react';
// import XLSX from 'xlsx';

// const ExcelUploader = () => {
//   const [data, setData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(-1);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const workbook = XLSX.read(event.target.result, { type: 'binary' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       setData(excelData);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleCellChange = (e, rowIndex, columnIndex) => {
//     const updatedData = [...data];
//     updatedData[rowIndex][columnIndex] = e.target.value;
//     setData(updatedData);
//   };

//   const deleteRow = (rowIndex) => {
//     const updatedData = [...data];
//     updatedData.splice(rowIndex, 1);
//     setData(updatedData);
//   };

//   return (
//     <div>
//       <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
//       <table>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, columnIndex) => (
//                 <td key={columnIndex}>
//                   {editingIndex === rowIndex ? (
//                     <input
//                       type="text"
//                       value={cell}
//                       onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
//                     />
//                   ) : (
//                     <span>{cell}</span>
//                   )}
//                 </td>
//               ))}
//               <td>
//                 <button className='px-4 py-2 bg-green-700' onClick={() => setEditingIndex(rowIndex)}>Edit</button>
//                 <button  className='px-4 py-2 bg-red-700' onClick={() => deleteRow(rowIndex)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExcelUploader;
// import React, { useRef, useState } from 'react';
// import XLSX from 'xlsx';

// const ExcelUploader = () => {
//   const [data, setData] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(-1);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const workbook = XLSX.read(event.target.result, { type: 'binary' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       let temp = excelData.map(it => {
//         let curr = {}
//         curr['id'] = it[0]
//         curr['First Name'] = it[1]
//         curr['Last Name'] = it[2]
//         curr['Gender'] = it[3]
//         curr['Country'] = it[4]
//         curr['Age'] = it[5]
//         curr['Date'] = it[6]
//         return curr
//       }
//       )
//       setData(temp);
//     };

//     reader.readAsBinaryString(file);
//   };
//   const [headers, setHeaders] = useState([
//     "id",
//     "First Name",
//     "Last Name",
//     "Gender",
//     "Country",
//     "Age",
//     "Date"
//   ])
//   const handleCellChange = (e, rowIndex, columnIndex) => {
//     const updatedData = [...data];
//     updatedData[rowIndex][columnIndex] = e.target.value;
//     setData(updatedData);
//   };

//   const deleteRow = (rowIndex) => {
//     const updatedData = [...data];
//     updatedData.splice(rowIndex, 1);
//     setData(updatedData);
//   };
//   const drageRef = useRef(null)
//   const drageRef2 = useRef(null)
//   const handleStart = (ind) => {
//     drageRef.current = ind
//   }
//   const handleDragEnter = (ind) => {
//     drageRef2.current = ind
//   }
//   const dragEnd = () => {
//     const temp = structuredClone(headers)
//     let drageditem = temp[drageRef.current]
//     if (drageRef.current > drageRef2.current) {
//       temp.splice(drageRef2.current, 0, drageditem)
//       temp.splice(drageRef.current + 1, 1)
//   } else if (drageRef.current < drageRef2.current) {
//       temp.splice(drageRef2.current + 1, 0, drageditem)
//       temp.splice(drageRef.current, 1)
//   }
//   drageRef.current = null
//   drageRef2.current = null
//     setHeaders(temp)
//   }
//   return (
//     <div>
//       <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
//       <table className='w-full'>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {headers.map((cell, columnIndex) => (
//                 <td className=' text-center' draggable onDragEnter={() => handleDragEnter(columnIndex)} onDragEnd={() => dragEnd()} onDragStart={() => handleStart(columnIndex)} key={columnIndex}>

//                   {editingIndex === rowIndex ? (
//                     <input
//                     className='flex justify-center'
//                       type="text"
//                       value={row[cell]}
//                       onChange={(e) => handleCellChange(e, rowIndex, columnIndex)}
//                     />
//                   ) : (
//                     <span>{row[cell]}</span>
//                   )}
//                 </td>
//               ))}
//               <td>
//                 <button className='px-4 py-2 bg-green-700' onClick={() => setEditingIndex(rowIndex)}>Edit</button>
//                 <button className='px-4 py-2 bg-red-700' onClick={() => deleteRow(rowIndex)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExcelUploader;

// // import React, { useState } from 'react';
// // import ReactPaginate from 'react-paginate';

// // const MyComponent = () => {
// //   const [currentPage, setCurrentPage] = useState(0);

// //   // Sample array of objects
// //   const data = [
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     { name: 'John', age: 25, gender: 'Male' },
// //     { name: 'Jane', age: 30, gender: 'Female' },
// //     // Add more objects...
// //   ];

// //   const itemsPerPage = 10;
// //   const totalPages = Math.ceil(data.length / itemsPerPage);
// //   const startIndex = currentPage * itemsPerPage;
// //   const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

// //   // Function to handle page change
// //   const handlePageChange = ({ selected }) => {
// //     setCurrentPage(selected);
// //   };

// //   return (
// //     <div>
// //       {/* Display current page items */}
// //       <ul>
// //         {currentItems.map((item, index) => (
// //           <li key={index}>
// //             {item.name} - {item.age} - {item.gender}
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Pagination */}
// //       <ReactPaginate
// //       className='flex justify-center'
// //         pageCount={totalPages}
// //         onPageChange={handlePageChange}
// //       />
// //     </div>
// //   );
// // };

// // export default MyComponent;
// import ButtonPrimary from '@/components/reusableUi/ButtonPrimary';
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DatePickerComponent = ({
//     width
//                              }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState('');

//   const handleApply = () => {
//     // Handle applying the selected date range
//     if (startDate && endDate) {
//       setSelectedItem('Custom Date');
//     } else if (selectedItem === 'Custom Date') {
//     } else {
//       console.log('Selected Item:', selectedItem);
//     }
//     setIsOpen(false);
//   };

//   const handleCancel = () => {
//     // Handle canceling the selection
//     setStartDate(null);
//     setEndDate(null);
//     setIsOpen(false);
//     setSelectedItem('');
//   };

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//     setIsOpen(false);

//     switch (item) {
//       case 'Today':
//         setStartDate(new Date());
//         setEndDate(null);
//         break;
//       case 'Yesterday':
//         setStartDate(new Date(new Date().setDate(new Date().getDate() - 1)));
//         setEndDate(null);
//         break;
//       case 'This Month':
//         setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
//         setEndDate(null);
//         break;
//       case 'This Week':
//         const today = new Date();
//         const firstDayOfWeek = today.getDate() - today.getDay();
//         const lastDayOfWeek = firstDayOfWeek + 6;
//         const firstDay = new Date(today.setDate(firstDayOfWeek));
//         const lastDay = new Date(today.setDate(lastDayOfWeek));
//         setStartDate(firstDay);
//         setEndDate(lastDay);
//         break;
//       case 'This Quarter':
//         const currentMonth = new Date().getMonth();
//         const firstMonthOfQuarter = currentMonth - (currentMonth % 3);
//         const firstDayOfQuarter = new Date(new Date().getFullYear(), firstMonthOfQuarter, 1);
//         const lastDayOfQuarter = new Date(firstDayOfQuarter.getFullYear(), firstDayOfQuarter.getMonth() + 3, 0);
//         setStartDate(firstDayOfQuarter);
//         setEndDate(lastDayOfQuarter);
//         break;
//       case 'Last Quarter':
//         const previousMonth = new Date().getMonth() - 3;
//         const firstMonthOfLastQuarter = previousMonth - (previousMonth % 3);
//         const firstDayOfLastQuarter = new Date(new Date().getFullYear(), firstMonthOfLastQuarter, 1);
//         const lastDayOfLastQuarter = new Date(firstDayOfLastQuarter.getFullYear(), firstDayOfLastQuarter.getMonth() + 3, 0);
//         setStartDate(firstDayOfLastQuarter);
//         setEndDate(lastDayOfLastQuarter);
//         break;
//       case 'This Year':
//         const currentYear = new Date().getFullYear();
//         const firstDayOfYear = new Date(currentYear, 0, 1);
//         const lastDayOfYear = new Date(currentYear, 11, 31);
//         setStartDate(firstDayOfYear);
//         setEndDate(lastDayOfYear);
//         break;
//       case 'Last Year':
//         const previousYear = new Date().getFullYear() - 1;
//         const firstDayOfLastYear = new Date(previousYear, 0, 1);
//         const lastDayOfLastYear = new Date(previousYear, 11, 31);
//         setStartDate(firstDayOfLastYear);
//         setEndDate(lastDayOfLastYear);
//         break;
//       default:
//         setStartDate(null);
//         setEndDate(null);
//         break;
//     }
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       <div className="flex flex-row items-center justify-between">
//         <div className=" p-4">
//           <div className="relative inline-block text-left">
//             <div>
          
//               <button
//                 type="button"
//                 className="inline-flex justify-between w-full min-w-[280px] max-w-[280px] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 id="options-menu"
//                 aria-haspopup="true"
//                 aria-expanded="true"
//                 onClick={toggleDropdown}
//               >
//                 {selectedItem || 'Select'}
//                 <svg
//                   className="-mr-1 ml-2 h-5 w-5"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 12l-6-6v1.5l6 6 6-6V6l-6 6z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//             {isOpen && (
//               <div
//                 className=" mt-2 w-full flex rounded-md shadow-lg min-h-[420px] h-full bg-white ring-1 ring-black ring-opacity-5"
//                 role="menu"
//                 aria-orientation="vertical"
//                 aria-labelledby="options-menu"
//               >
//                 <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                   <button
//                     className={`${selectedItem === 'Today' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('Today')}
//                   >
//                     Today
//                   </button>
//                   <button
//                     className={`${selectedItem === 'Yesterday' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('Yesterday')}
//                   >
//                     Yesterday
//                   </button>
//                   <button
//                     className={`${selectedItem === 'This Month' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('This Month')}
//                   >
//                     This Month
//                   </button>
//                   <button
//                     className={`${selectedItem === 'This Week' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('This Week')}
//                   >
//                     This Week
//                   </button>
//                   <button
//                     className={`${selectedItem === 'This Quarter' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('This Quarter')}
//                   >
//                     This Quarter
//                   </button>
//                   <button
//                     className={`${selectedItem === 'Last Quarter' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('Last Quarter')}
//                   >
//                     Last Quarter
//                   </button>
//                   <button
//                     className={`${selectedItem === 'This Year' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('This Year')}
//                   >
//                     This Year
//                   </button>
//                   <button
//                     className={`${selectedItem === 'Last Year' ? 'bg-btnBackground text-white' : 'text-gray-700'
//                       } block px-4 py-2 text-sm`}
//                     role="menuitem"
//                     onClick={() => handleItemClick('Last Year')}
//                   >
//                     Last Year
//                   </button>
//                 </div>
//                 <div className=' flex justify-between flex-col'>
//                   <div className="w-3/4 bg-white p-4 flex gap-2">
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       selectsStart
//                       startDate={startDate}
//                       endDate={endDate}
//                       className="border rounded p-2 mb-2"
//                       value={startDate ? startDate : 'Start Date'}
//                       open={true}
//                     />
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       selectsEnd
//                       startDate={startDate}
//                       endDate={endDate}
//                       minDate={startDate}
//                       className="border rounded p-2"
//                       open={true}
//                       value={endDate ? endDate : 'End Date'}
//                     />
//                   </div>
//                   <div className="w-full flex justify-end   p-4">
//                     <ButtonPrimary
//                       btnSecondary={true}
//                       label='Cancel'
//                       handleClick={handleCancel}
//                     />
//                     <ButtonPrimary
//                       handleClick={handleApply}
//                       label='Apply'
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatePickerComponent;


import FileUploader from '@/components/uploadExcelFile/FileUploaderExcel'
import React from 'react'

const test = () => {
  return (
   <FileUploader/>
  )
}

export default test