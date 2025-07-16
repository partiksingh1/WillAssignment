import type { InsurancePolicy } from "../types/type"

interface BankAccountProps {
    policy: InsurancePolicy[],
    setPolicies: React.Dispatch<React.SetStateAction<InsurancePolicy[]>>
}
export const PolicyComponent: React.FC<BankAccountProps> = ({ policy, setPolicies }) => {
    const addPolicy = () => {
        setPolicies([...policy, { sn: policy.length + 1, nameOfPolicy: '', policyNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
    };
    const updatePolicy = (index: number, field: keyof InsurancePolicy, value: string) => {
        const updateBank = [...policy];
        (updateBank[index] as any)[field] = value;
        setPolicies(updateBank);
    };
    const removePolicy = (index: number) => {
        setPolicies(policy.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black my-4">Insurance Policy</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of Policy</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {policy.map((pol, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pol.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={pol.nameOfPolicy} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePolicy(index, 'nameOfPolicy', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={pol.policyNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePolicy(index, 'policyNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={pol.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePolicy(index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={pol.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePolicy(index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="number" value={pol.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePolicy(index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => removePolicy(index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => addPolicy()} className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add Bank Account
            </button>
        </div>
    )
}