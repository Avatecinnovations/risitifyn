import React from "react";

interface QuotePageProps {
  params: {
    id: string;
  };
}

export default function QuotePage({ params }: QuotePageProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quote Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">Quote ID: {params.id}</p>
        {/* Add your quote details here */}
      </div>
    </div>
  );
}
