import type { Property } from "../types/type"

interface LandProps {
    land: Property[],
    setLand: React.Dispatch<React.SetStateAction<Property[]>>
}
export const LandComponet: React.FC<LandProps> = ({ land, setLand }) => {
    const add = () => {
        setLand([...land, { sn: land.length + 1, nameOfLand: '', registrationNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
    };
    const update = (index: number, field: keyof Property, value: string) => {
        const update = [...land];
        (update[index] as any)[field] = value;
        setLand(update);
    };
    const remove = (index: number) => {
        setLand(land.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Land Properties</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of Land</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {land.map((prop, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{prop.sn}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={prop.nameOfProperty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'nameOfProperty', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={prop.registrationNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'registrationNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={prop.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="text" value={prop.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <input type="number" value={prop.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => remove(index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={() => add} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Add House Property
            </button>
        </div>
    )
}