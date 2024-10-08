import React from 'react';

const SchoolDetail = ({ school }) => {
  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-4">School Details</h3>
      <p><strong>School Name:</strong> {school.schoolName}</p>
      <p><strong>School Email:</strong> {school.schoolEmail}</p>
      <p><strong>School Phone:</strong> {school.schoolPhone}</p>
      <p><strong>School Address:</strong> {school.schoolAddress}</p>
      <p><strong>School Website:</strong> {school.schoolWebsite}</p>
      <p><strong>School Motto:</strong> {school.schoolMotto}</p>
      <p><strong>State:</strong> {school.state}</p>
      <p><strong>City:</strong> {school.city}</p>
      <p><strong>Country:</strong> {school.country}</p>
      <p><strong>Postal Code:</strong> {school.postalCode}</p>
      <p><strong>School Code:</strong> {school.schoolCode}</p>
    </div>
  );
};

export default SchoolDetail;
