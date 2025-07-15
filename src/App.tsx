import { useState } from 'react'
import './App.css'
import type { BankAccount, Beneficiary, Executors, InsurancePolicy, Jewellery, MutualFund, Property, Stock, TestatorDetails } from './types/type';
import { steps } from './types/steps';

function App() {
  const [testatorDetails, setTestatorDetails] = useState<TestatorDetails>({
    name: "",
    sonOf: "",
    residingAt: "",
    willDate: ""
  });
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [jewellery, setJewellery] = useState<Jewellery[]>([]);
  const [house, setHouse] = useState<Property[]>([]);
  const [land, setLand] = useState<Property[]>([]);
  const [executors, setExecutors] = useState<Executors>({
    primaryName: '',
    primarySonOf: '',
    primaryResidentOf: '',
    alternateName: '',
    alternateDaughterOf: '',
    alternateResidentOf: '',
  });
  const handleTestatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestatorDetails({ ...testatorDetails, [e.target.name]: e.target.value });
  };

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, {
      sn: beneficiaries.length + 1,
      name: '',
      relationship: '',
      panAadhar: '',
      residence: '',
      age: '',
    }])
  }
  const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string) => {
    const updatedBeneficiaries = [...beneficiaries];
    (updatedBeneficiaries[index] as any)[field] = value;
    setBeneficiaries(updatedBeneficiaries);
  }

  const removeBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  }
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6 font-sans'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-8'>
          WILL GENERATOR
        </h1>
        <div className='mb-8'>
          <div className='flex justify-between mb-4'>
            {steps.map((step: string, index: number) => (
              <div
                key={index}
                className={`flex-1 text-center py-2 rounded-full cursor-pointer transition-all duration-300
                  ${index === currentStep
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                  ${index < currentStep ? 'bg-indigo-400 text-white' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <span className="hidden sm:inline">{step}</span>
                <span className="sm:hidden">{index + 1}</span>
              </div>
            ))}
          </div>
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Testator Details */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Testator Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={testatorDetails.name}
                onChange={handleTestatorChange}
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
                onChange={handleTestatorChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="residingAt" className="block text-sm font-medium text-gray-700">Residing At</label>
              <input
                type="text"
                name="residingAt"
                id="residingAt"
                value={testatorDetails.residingAt}
                onChange={handleTestatorChange}
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
                onChange={handleTestatorChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
      {/* Beneficiaries */}
      {currentStep === 1 && (
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
                {beneficiaries.map((beneficiary, index) => (
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
      )}
    </div>
  )
}

export default App
