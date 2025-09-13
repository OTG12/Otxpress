import React, { useState, useEffect } from 'react';
import { Camera, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadFile } from '../../services/service';
import { submitKYC } from '../../services/kyc_service';
import { getUserFromToken } from '../../services/auth';
import {toast}  from 'react-hot-toast';

const KYCComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: '',
    documentType: '',
    documentId: '',
    frontPicture: null,
    backPicture: null,
    driverLicenseId: '',
    driverLicenseFront: null,
    driverLicenseBack: null,
  });

  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState({});

  const DOC_TYPES = [
    { value: "nin", label: "NIN" },
    { value: "passport", label: "Passport" },
    { value: "voter_id", label: "Voter's ID" },
    { value: "driver_license", label: "Driver’s License" },
  ];

  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setCurrentUser(user); // keep full user object
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Please upload a valid image file (JPEG, JPG, or PNG)',
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 5MB',
        }));
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImages(prev => ({
          ...prev,
          [fieldName]: ev.target.result,
        }));
      };
      reader.readAsDataURL(file);

      try {
        setUploading(prev => ({ ...prev, [fieldName]: true }));
        const fileId = await uploadFile(file);

        if (fileId?.error) {
          setErrors(prev => ({
            ...prev,
            [fieldName]: 'Upload failed, please try again.',
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [fieldName]: fileId,
          }));
        }
      } catch (err) {
        console.error("Upload error:", err);
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Upload failed, please try again.',
        }));
      } finally {
        setUploading(prev => ({ ...prev, [fieldName]: false }));
      }

      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: '',
        }));
      }
    }
  };

  const removeImage = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null,
    }));
    setPreviewImages(prev => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentUser?.user_id) {
      newErrors.user = 'User authentication failed. Please log in again.';
    }

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    }

    if (!formData.documentType) {
      newErrors.documentType = 'Document type is required';
    }

    if (!formData.documentId.trim()) {
      newErrors.documentId = 'Document ID is required';
    }

    if (!formData.frontPicture) {
      newErrors.frontPicture = 'Front picture of document is required';
    }

    if (!formData.backPicture) {
      newErrors.backPicture = 'Back picture of document is required';
    }

    // Optional: Only require driver license if type = "driver_license"
    if (formData.documentType === "driver_license") {
      if (!formData.driverLicenseId.trim()) {
        newErrors.driverLicenseId = 'Driver License ID is required';
      }
      if (!formData.driverLicenseFront) {
        newErrors.driverLicenseFront = 'Front picture of driver license is required';
      }
      if (!formData.driverLicenseBack) {
        newErrors.driverLicenseBack = 'Back picture of driver license is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const kycData = {
        user: currentUser.user_id,
        fullname: formData.fullname,
        doc_type: formData.documentType,
        document_id: formData.documentId,
        document: [formData.frontPicture, formData.backPicture].filter(Boolean),
        licence_id: formData.driverLicenseId,
        license_document: [formData.driverLicenseFront, formData.driverLicenseBack].filter(Boolean),
      };

      await submitKYC(kycData);

      toast.success("KYC submitted successfully!");

      // Reset form
      setFormData({
        fullname: '',
        documentType: '',
        documentId: '',
        frontPicture: null,
        backPicture: null,
        driverLicenseId: '',
        driverLicenseFront: null,
        driverLicenseBack: null,
      });
      setPreviewImages({});
    } catch (error) {
      console.error('Error submitting KYC:', error);
      toast.error("Failed to submit KYC, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ImageUploadField = ({ label, fieldName, required = true }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!previewImages[fieldName] ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, fieldName)}
            className="hidden"
            id={fieldName}
          />
          <label htmlFor={fieldName} className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewImages[fieldName]}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {uploading[fieldName] && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <button
            type="button"
            onClick={() => removeImage(fieldName)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errors[fieldName] && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[fieldName]}
        </p>
      )}
    </div>
  );

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access KYC verification</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Verification</h1>
        <p className="text-gray-600">Please provide your identification documents for verification</p>
      </div>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentUser.user_id || 'Loading...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Automatically detected from your session</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullname}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Primary Document Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Primary Document
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Type <span className="text-red-500">*</span>
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select document type</option>
                {DOC_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.documentType && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.documentType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="documentId"
                value={formData.documentId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter document ID number"
              />
              {errors.documentId && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.documentId}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Document Front Picture"
              fieldName="frontPicture"
            />
            <ImageUploadField
              label="Document Back Picture"
              fieldName="backPicture"
            />
          </div>
        </div>

        {/* Driver License Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Driver License (Optional unless selected above)
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver License ID
            </label>
            <input
              type="text"
              name="driverLicenseId"
              value={formData.driverLicenseId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter driver license ID"
            />
            {errors.driverLicenseId && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.driverLicenseId}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Driver License Front Picture"
              fieldName="driverLicenseFront"
              required={formData.documentType === "driver_license"}
            />
            <ImageUploadField
              label="Driver License Back Picture"
              fieldName="driverLicenseBack"
              required={formData.documentType === "driver_license"}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              'Submit KYC Information'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCComponent;
