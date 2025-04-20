
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Tag, AlertCircle } from "lucide-react";

const ProductsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Total Products</div>
              <Package className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="text-2xl font-bold">124</div>
            <div className="text-sm text-gray-500 mt-1">In your catalog</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Bestselling</div>
              <ShoppingCart className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">Product X</div>
            <div className="text-sm text-gray-500 mt-1">254 units sold</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">On Sale</div>
              <Tag className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-sm text-gray-500 mt-1">Products discounted</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium text-gray-500">Low Stock</div>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-gray-500 mt-1">Need reordering</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold">Product Catalog</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">SKU</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Inventory</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md"></div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">Product {i + 1}</div>
                          <div className="text-xs text-gray-500">Category {(i % 3) + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">PRD-{10000 + i}</td>
                    <td className="px-6 py-4 text-sm font-medium">${(49.99 + i * 10).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">{20 + i * 5}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        i % 3 === 0 
                          ? 'bg-green-100 text-green-800' 
                          : i % 3 === 1
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
