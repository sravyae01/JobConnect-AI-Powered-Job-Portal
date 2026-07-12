import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const ResumeUpload = ({ onUploadSuccess, existingResume }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setFile(file);
    setUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('resume', file);

      // If you have a direct upload endpoint
      // const response = await applicationAPI.uploadResume(formData);
      // onUploadSuccess(response.data.resume_url);
      
      // For now, just pass the file to parent
      onUploadSuccess(file);
      toast.success('Resume uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  if (existingResume) {
    return (
      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <DocumentIcon className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-green-800">Resume uploaded</p>
            <p className="text-xs text-green-600">{existingResume.split('/').pop()}</p>
          </div>
        </div>
        <button
          onClick={() => onUploadSuccess(null)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        ${uploading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="flex items-center justify-center">
          <DocumentIcon className="h-12 w-12 text-blue-500" />
          <div className="ml-4 text-left">
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      ) : (
        <>
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive ? 'Drop your resume here...' : 'Drag & drop your resume here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
        </>
      )}
      {uploading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-sm text-gray-600 mt-2">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;