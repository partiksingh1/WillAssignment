import type { BankAccount } from "../types/type"

interface BankAccountProps {
    bankAccounts: BankAccount[],
    setBankAccounts: React.Dispatch<React.SetStateAction<BankAccount[]>>
}
export const BankAccountComponent: React.FC<BankAccountProps> = ({ bankAccounts, setBankAccounts }) => {
    const addBank = () => {
        setBankAccounts([...bankAccounts, { sn: bankAccounts.length + 1, bankName: '', accountNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
    };
    const updateBank = (index: number, field: keyof BankAccount, value: string) => {
        const updateBank = [...bankAccounts];
        (updateBank[index] as any)[field] = value;
        setBankAccounts(updateBank);
    };
    const removeBank = (index: number) => {
        setBankAccounts(bankAccounts.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Bank Accounts</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bankAccounts.map((account, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{account.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={account.bankName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBank(index, 'bankName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={account.accountNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBank(index, 'accountNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={account.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBank(index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={account.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBank(index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="number" value={account.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBank(index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => removeBank(index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => addBank()} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Bank Account
            </button>
        </div>
    )
}