import type { MutualFund } from "../types/type"

interface MutualFundProps {
    mutualFunds: MutualFund[],
    setMutualFunds: React.Dispatch<React.SetStateAction<MutualFund[]>>
}
export const MfComponent: React.FC<MutualFundProps> = ({ mutualFunds, setMutualFunds }) => {
    const add = () => {
        setMutualFunds([...mutualFunds, { sn: mutualFunds.length + 1, mfDistributor: '', accountNo: '', typeRemark: '', beneficiaryName: '', share: '' }]);
    };
    const update = (index: number, field: keyof MutualFund, value: string) => {
        const update = [...mutualFunds];
        (update[index] as any)[field] = value;
        setMutualFunds(update);
    };
    const remove = (index: number) => {
        setMutualFunds(mutualFunds.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black my-4">Mutual Funds</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MF Distributor</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account No</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mutualFunds.map((mf, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{mf.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={mf.mfDistributor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'mfDistributor', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={mf.accountNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'accountNo', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={mf.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={mf.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="number" value={mf.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => remove(index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => add()} className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Mutal Fund
            </button>
        </div>
    )
}