import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  Check,
  X,
  Search,
  MoreHorizontal,
  Filter,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { invoiceService } from "@/services/invoiceService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const QuotesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (!user?.id) return;
        const data = await invoiceService.getQuotes(user.id);
        setQuotes(data);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
        toast.error("Failed to fetch quotes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [user?.id]);

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      await invoiceService.deleteQuote(quoteId);
      setQuotes(quotes.filter((quote) => quote.id !== quoteId));
      toast.success("Quote deleted successfully");
    } catch (error) {
      console.error("Failed to delete quote:", error);
      toast.error("Failed to delete quote");
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      quote.quote_number.toLowerCase().includes(searchLower) ||
      quote.clients?.name.toLowerCase().includes(searchLower)
    );
  });

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    accepted: quotes.filter((q) => q.status === "accepted").length,
    rejected: quotes.filter(
      (q) => q.status === "rejected" || q.status === "expired"
    ).length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Quotes</h1>
        <Button asChild size="sm" className="h-9 px-3 gap-1.5">
          <Link to="/quotes/new">
            <span className="hidden sm:inline">New Quote</span>
            <span className="sm:hidden">New</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">
                Total Quotes
              </div>
              <FileText className="h-4 w-4 md:h-5 md:w-5 text-brand-primary" />
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.total}</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              All time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">
                Pending
              </div>
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              Awaiting response
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">
                Accepted
              </div>
              <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {stats.accepted}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              Ready to invoice
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <div className="text-xs md:text-sm font-medium text-gray-500">
                Rejected/Expired
              </div>
              <X className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {stats.rejected}
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              No longer active
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-semibold">Recent Quotes</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search quotes..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left">Quote ID</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Client</th>
                  <th className="px-3 sm:px-6 py-3 text-left hidden md:table-cell">
                    Date Created
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left hidden lg:table-cell">
                    Expiry Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left">Amount</th>
                  <th className="px-3 sm:px-6 py-3 text-left">Status</th>
                  <th className="px-3 sm:px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      Loading quotes...
                    </td>
                  </tr>
                ) : filteredQuotes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No quotes found
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium text-brand-primary">
                        {quote.quote_number}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm">
                        {quote.clients?.name}
                        <div className="text-xs text-gray-500 md:hidden">
                          {formatDate(quote.issue_date)}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm hidden md:table-cell">
                        {formatDate(quote.issue_date)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm hidden lg:table-cell">
                        {formatDate(quote.expiry_date)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium">
                        {formatCurrency(quote.total_amount, "USD")}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            quote.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : quote.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : quote.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {quote.status.charAt(0).toUpperCase() +
                            quote.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigate(`/quotes/${quote.id}`)}
                            >
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/quotes/${quote.id}/edit`)
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteQuote(quote.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotesPage;
