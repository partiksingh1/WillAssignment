import type { Executors } from "../types/type"

interface ExecutorProp {
    executors: Executors,
    setExecutors: React.Dispatch<React.SetStateAction<Executors>>
}
export const ExecutorsComponent: React.FC<ExecutorProp> = ({ executors, setExecutors }) => {
    const handleExecutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExecutors({ ...executors, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black my-4">Executors & Guardianship</h2>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Executors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="primaryName" className="block text-sm font-medium text-gray-700">Primary Executor Name</label>
                        <input
                            type="text"
                            name="primaryName"
                            id="primaryName"
                            value={executors.primaryName}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="primarySonOf" className="block text-sm font-medium text-gray-700">Primary Executor Son/Daughter of</label>
                        <input
                            type="text"
                            name="primarySonOf"
                            id="primarySonOf"
                            value={executors.primarySonOf}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="primaryResidentOf" className="block text-sm font-medium text-gray-700">Primary Executor Resident of</label>
                        <input
                            type="text"
                            name="primaryResidentOf"
                            id="primaryResidentOf"
                            value={executors.primaryResidentOf}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
                    <div>
                        <label htmlFor="alternateName" className="block text-sm font-medium text-gray-700">Alternate Executor Name</label>
                        <input
                            type="text"
                            name="alternateName"
                            id="alternateName"
                            value={executors.alternateName}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="alternateDaughterOf" className="block text-sm font-medium text-gray-700">Alternate Executor Son/Daughter of</label>
                        <input
                            type="text"
                            name="alternateDaughterOf"
                            id="alternateDaughterOf"
                            value={executors.alternateDaughterOf}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="alternateResidentOf" className="block text-sm font-medium text-gray-700">Alternate Executor Resident of</label>
                        <input
                            type="text"
                            name="alternateResidentOf"
                            id="alternateResidentOf"
                            value={executors.alternateResidentOf}
                            onChange={handleExecutorChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}