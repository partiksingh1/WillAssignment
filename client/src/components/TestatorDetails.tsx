import type { TestatorDetails as TestatorDetailsType } from "../types/type";
interface TestatorDetailsProps {
    testatorDetails: TestatorDetailsType;
    setTestatorDetails: React.Dispatch<React.SetStateAction<TestatorDetailsType>>;
}
export const TestatorDetailsComponent: React.FC<TestatorDetailsProps> = ({ testatorDetails, setTestatorDetails }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTestatorDetails({ ...testatorDetails, [e.target.name]: e.target.value });
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black my-4">Testator Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={testatorDetails.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="sonOf" className="block text-sm font-medium text-gray-700">Son/Daughter of</label>
                    <input
                        type="text"
                        name="sonOf"
                        id="sonOf"
                        value={testatorDetails.sonOf}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="residingAt" className="block text-sm font-medium text-gray-700">Residing At</label>
                    <input
                        type="text"
                        name="residingAt"
                        id="residingAt"
                        value={testatorDetails.residingAt}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="willDate" className="block text-sm font-medium text-gray-700">Will Date</label>
                    <input
                        type="date"
                        name="willDate"
                        id="willDate"
                        value={testatorDetails.willDate}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
        </div>
    )
}