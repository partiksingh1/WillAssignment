import type { Stock } from "../types/type"

interface StockProps {
    stocks: Stock[],
    setStocks: React.Dispatch<React.SetStateAction<Stock[]>>
}
export const StockComponent: React.FC<StockProps> = ({ stocks, setStocks }) => {
    const addStock = () => {
        setStocks([...stocks, { sn: stocks.length + 1, brokerageFirm: '', accountNo: '', typeRemark: '', beneficiaryName: '', share: '' }]);
    };
    const updateStocks = (index: number, field: keyof Stock, value: string) => {
        const updateStock = [...stocks];
        (updateStock[index] as any)[field] = value;
        setStocks(updateStock);
    };
    const removeStocks = (index: number) => {
        setStocks(stocks.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Stocks</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brokerage Firm</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stocks.map((stock, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{stock.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={stock.brokerageFirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStocks(index, 'brokerageFirm', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={stock.accountNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStocks(index, 'accountNo', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={stock.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStocks(index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={stock.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStocks(index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="number" value={stock.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateStocks(index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => removeStocks(index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => addStock()} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Stock
            </button>
        </div>
    )
}