import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Quote {
  id: string;
  clientName: string;
  amount: number;
  status: "draft" | "sent" | "accepted" | "rejected";
  createdAt: string;
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quotes</h1>
        <Button>Create New Quote</Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="search">Search Quotes</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        {quotes.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No quotes found</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{quote.clientName}</td>
                  <td>${quote.amount}</td>
                  <td>{quote.status}</td>
                  <td>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
