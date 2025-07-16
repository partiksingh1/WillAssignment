import type { Beneficiary } from "../types/type"

interface BeneficiaryProps {
    beneficiaries: Beneficiary[],
    setBeneficiaries: React.Dispatch<React.SetStateAction<Beneficiary[]>>
}
export const BeneficiariesComponent: React.FC<BeneficiaryProps> = ({ beneficiaries, setBeneficiaries }) => {
    const addBeneficiary = () => {
        setBeneficiaries([...beneficiaries, { sn: beneficiaries.length + 1, name: '', relationship: '', panAadhar: '', residence: '', age: '' }]);
    };
    const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string) => {
        const updatedBeneficiaries = [...beneficiaries];
        (updatedBeneficiaries[index] as any)[field] = value;
        setBeneficiaries(updatedBeneficiaries);
    };
    const removeBeneficiary = (index: number) => {
        setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Beneficiaries</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN/Aadhar</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Residence</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {beneficiaries.map((beneficiary: Beneficiary, index: number) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{beneficiary.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={beneficiary.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBeneficiary(index, 'name', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-1 text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={beneficiary.relationship}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBeneficiary(index, 'relationship', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-1 text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={beneficiary.panAadhar}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBeneficiary(index, 'panAadhar', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-1 text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={beneficiary.residence}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBeneficiary(index, 'residence', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-1 text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input
                                        type="number"
                                        value={beneficiary.age}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBeneficiary(index, 'age', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-1 text-sm"
                                    />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => removeBeneficiary(index)}
                                        className="text-red-600 hover:text-red-900 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={addBeneficiary}
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Add Beneficiary
            </button>
        </div>
    )
}