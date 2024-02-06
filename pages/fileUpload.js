import React from 'react';
import FileUploader from '@/components/uploadExcelFile/FileUploaderExcel';

const App = () => {
  return (
    <div>
      <h1 className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>File Uploader</h1>
      <FileUploader />
    </div>
  );
};

export default App;
