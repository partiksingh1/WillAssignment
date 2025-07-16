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

  // Beneficiary CRUD

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

  // Asset CRUD

  const addAssetRow = (assetType: string) => {
    switch (assetType) {
      case 'bankAccounts':
        setBankAccounts([...bankAccounts, { sn: bankAccounts.length + 1, bankName: '', accountNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'insurancePolicies':
        setInsurancePolicies([...insurancePolicies, { sn: insurancePolicies.length + 1, nameOfPolicy: '', policyNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'stocks':
        setStocks([...stocks, { sn: stocks.length + 1, brokerageFirm: '', accountNo: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'mutualFunds':
        setMutualFunds([...mutualFunds, { sn: mutualFunds.length + 1, mfDistributor: '', accountNo: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'jewellery':
        setJewellery([...jewellery, { sn: jewellery.length + 1, typeOfJewellery: '', invoiceNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'house':
        setHouse([...house, { sn: house.length + 1, nameOfProperty: '', registrationNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      case 'land':
        setLand([...land, { sn: land.length + 1, nameOfLand: '', registrationNumber: '', typeRemark: '', beneficiaryName: '', share: '' }]);
        break;
      default:
        break;
    }
  }

  const updateAssetRow = (
    assetType: string,
    index: number,
    field: string,
    value: string
  ) => {
    const updateFn = (prevAssets: any[]) => {
      const updatedAssets = [...prevAssets];
      (updatedAssets[index] as any)[field] = value;
      return updatedAssets;
    }
    switch (assetType) {
      case 'bankAccounts':
        setBankAccounts(updateFn as (prev: BankAccount[]) => BankAccount[]);
        break;
      case 'insurancePolicies':
        setInsurancePolicies(updateFn as (prev: InsurancePolicy[]) => InsurancePolicy[]);
        break;
      case 'stocks':
        setStocks(updateFn as (prev: Stock[]) => Stock[]);
        break;
      case 'mutualFunds':
        setMutualFunds(updateFn as (prev: MutualFund[]) => MutualFund[]);
        break;
      case 'jewellery':
        setJewellery(updateFn as (prev: Jewellery[]) => Jewellery[]);
        break;
      case 'house':
        setHouse(updateFn as (prev: Property[]) => Property[]);
        break;
      case 'land':
        setLand(updateFn as (prev: Property[]) => Property[]);
        break;
      default:
        break;
    }
  }

  const removeAssetRow = (assetType: string, index: number) => {
    const removeFn = (prevAssets: any[]) => prevAssets.filter((_, i) => i !== index);
    switch (assetType) {
      case 'bankAccounts':
        setBankAccounts(removeFn as (prev: BankAccount[]) => BankAccount[]);
        break;
      case 'insurancePolicies':
        setInsurancePolicies(removeFn as (prev: InsurancePolicy[]) => InsurancePolicy[]);
        break;
      case 'stocks':
        setStocks(removeFn as (prev: Stock[]) => Stock[]);
        break;
      case 'mutualFunds':
        setMutualFunds(removeFn as (prev: MutualFund[]) => MutualFund[]);
        break;
      case 'jewellery':
        setJewellery(removeFn as (prev: Jewellery[]) => Jewellery[]);
        break;
      case 'house':
        setHouse(removeFn as (prev: Property[]) => Property[]);
        break;
      case 'land':
        setLand(removeFn as (prev: Property[]) => Property[]);
        break;
      default:
        break;
    }
  }

  const handleExecutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExecutors({ ...executors, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.min(prev - 1, steps.length - 1));
  };

  const [currentStep, setCurrentStep] = useState<number>(0);

  const generateWillHTML = async () => {
    console.log("calles");

    console.log("=== Testator Details ===");
    console.log("Name:", testatorDetails.name);
    console.log("Son/Daughter of:", testatorDetails.sonOf);
    console.log("Residing at:", testatorDetails.residingAt);
    console.log("Will Date:", testatorDetails.willDate);

    console.log("\n=== Beneficiaries ===");
    beneficiaries.forEach((b, i) => {
      console.log(`${i + 1}. ${b.name} (${b.relationship}), PAN/Aadhar: ${b.panAadhar}, Residence: ${b.residence}, Age: ${b.age}`);
    });

    console.log("\n=== Bank Accounts ===");
    bankAccounts.forEach((ba, i) => {
      console.log(`${i + 1}. Bank: ${ba.bankName}, Account: ${ba.accountNumber}, Remark: ${ba.typeRemark}, Beneficiary: ${ba.beneficiaryName}, Share: ${ba.share}%`);
    });

    console.log("\n=== Insurance Policies ===");
    insurancePolicies.forEach((ip, i) => {
      console.log(`${i + 1}. Policy Name: ${ip.nameOfPolicy}, Policy No: ${ip.policyNumber}, Remark: ${ip.typeRemark}, Beneficiary: ${ip.beneficiaryName}, Share: ${ip.share}%`);
    });

    console.log("\n=== Stocks ===");
    stocks.forEach((s, i) => {
      console.log(`${i + 1}. Brokerage: ${s.brokerageFirm}, Account: ${s.accountNo}, Remark: ${s.typeRemark}, Beneficiary: ${s.beneficiaryName}, Share: ${s.share}%`);
    });

    console.log("\n=== Mutual Funds ===");
    mutualFunds.forEach((mf, i) => {
      console.log(`${i + 1}. Distributor: ${mf.mfDistributor}, Account: ${mf.accountNo}, Remark: ${mf.typeRemark}, Beneficiary: ${mf.beneficiaryName}, Share: ${mf.share}%`);
    });

    console.log("\n=== Jewellery ===");
    jewellery.forEach((j, i) => {
      console.log(`${i + 1}. Type: ${j.typeOfJewellery}, Invoice: ${j.invoiceNumber}, Remark: ${j.typeRemark}, Beneficiary: ${j.beneficiaryName}, Share: ${j.share}%`);
    });

    console.log("\n=== House Properties ===");
    house.forEach((h, i) => {
      console.log(`${i + 1}. Property: ${h.nameOfProperty}, Registration: ${h.registrationNumber}, Remark: ${h.typeRemark}, Beneficiary: ${h.beneficiaryName}, Share: ${h.share}%`);
    });

    console.log("\n=== Land Properties ===");
    land.forEach((l, i) => {
      console.log(`${i + 1}. Land: ${l.nameOfLand}, Registration: ${l.registrationNumber}, Remark: ${l.typeRemark}, Beneficiary: ${l.beneficiaryName}, Share: ${l.share}%`);
    });

    console.log("\n=== Residue Assets ===");
    console.log("Any assets left out or purchased after this will is made should be transferred to my Wife, Reena Saxena, Completely.");

    console.log("\n=== Guardian Clause ===");
    console.log("If my wife Reema Saxena predeceases me, I appoint my elder brother Mr. Arpit Saxena as the guardian for my children Natasha and Sameer till they turn age 21.");
    console.log("He shall be responsible for taking care of assets till age 21 and handing over the assets.");

    console.log("\n=== Discharge of Liabilities ===");
    console.log("On my death, the beneficiaries shall equally bear the administration expenses of Will Execution.");
    console.log("And shall discharge my debts / liabilities from respective assets attached to the liabilities if any.");

    console.log("\n=== Executors ===");
    console.log("Primary Executor:", `${executors.primaryName}, son of ${executors.primarySonOf}, resident of ${executors.primaryResidentOf}.`);
    console.log("Alternate Executor:", `${executors.alternateName}, daughter of ${executors.alternateDaughterOf}, resident of ${executors.alternateResidentOf}.`);

    console.log("\n=== Witness Placeholders ===");
    console.log("Witness 1 (Sign)\nName:\nAddress:\nDate:");
    console.log("Witness 2 (Sign)\nName:\nAddress:\nDate:");
    console.log("Testator (Sign)\nName:\nAddress:\nDate:");

  }

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
      {/* Bank Accounts */}
      {currentStep === 2 && (
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
                      <input type="text" value={account.bankName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('bankAccounts', index, 'bankName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={account.accountNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('bankAccounts', index, 'accountNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={account.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('bankAccounts', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={account.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('bankAccounts', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={account.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('bankAccounts', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('bankAccounts', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('bankAccounts')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Bank Account
          </button>
        </div>
      )}
      {/* Insurance Policies */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Insurance Policies</h2>
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
                {insurancePolicies.map((policy, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{policy.sn}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={policy.nameOfPolicy} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('insurancePolicies', index, 'nameOfPolicy', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={policy.policyNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('insurancePolicies', index, 'policyNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={policy.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('insurancePolicies', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={policy.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('insurancePolicies', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={policy.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('insurancePolicies', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('insurancePolicies', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('insurancePolicies')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Insurance Policy
          </button>
        </div>
      )}
      {/* Stocks */}
      {currentStep === 4 && (
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
                      <input type="text" value={stock.brokerageFirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('stocks', index, 'brokerageFirm', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={stock.accountNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('stocks', index, 'accountNo', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={stock.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('stocks', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={stock.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('stocks', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={stock.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('stocks', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('stocks', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('stocks')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Stock
          </button>
        </div>
      )}
      {/* Mutual Funds */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Mutual Funds</h2>
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
                      <input type="text" value={mf.mfDistributor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('mutualFunds', index, 'mfDistributor', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={mf.accountNo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('mutualFunds', index, 'accountNo', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={mf.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('mutualFunds', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={mf.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('mutualFunds', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={mf.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('mutualFunds', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('mutualFunds', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('mutualFunds')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Mutual Fund
          </button>
        </div>
      )}
      {/* Jewellery */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Jewellery</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Jewellery</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jewellery.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.sn}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={item.typeOfJewellery} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('jewellery', index, 'typeOfJewellery', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={item.invoiceNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('jewellery', index, 'invoiceNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={item.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('jewellery', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={item.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('jewellery', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={item.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('jewellery', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('jewellery', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('jewellery')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Jewellery
          </button>
        </div>
      )}

      {/* House Properties */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">House Properties</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name of Property</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Remark</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary's Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Share</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {house.map((prop, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{prop.sn}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.nameOfProperty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('house', index, 'nameOfProperty', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.registrationNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('house', index, 'registrationNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('house', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('house', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={prop.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('house', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('house', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('house')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add House Property
          </button>
        </div>
      )}

      {/* Land Properties */}
      {currentStep === 8 && (
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
                      <input type="text" value={prop.nameOfLand} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('land', index, 'nameOfLand', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.registrationNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('land', index, 'registrationNumber', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.typeRemark} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('land', index, 'typeRemark', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="text" value={prop.beneficiaryName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('land', index, 'beneficiaryName', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input type="number" value={prop.share} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssetRow('land', index, 'share', e.target.value)} className="w-full border border-gray-300 rounded-md p-1 text-sm" />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => removeAssetRow('land', index)} className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => addAssetRow('land')} className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Land Property
          </button>

        </div>
      )}
      {/* Executors & Guardianship */}
      {currentStep === 9 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Executors & Guardianship</h2>
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

            <h3 className="text-xl font-semibold text-gray-800 mt-8">Guardianship Details</h3>
            <p className="text-gray-600">
              This section assumes the guardianship clause from the provided template: "If my wife Reema Saxena predeceases me, I appoint my elder brother Mr. Arpit Saxena as the guardian for my children Natasha and Sameer till they turn age 21. He shall be responsible for taking care of assets till age 21 and handing over the assets."
              For a fully dynamic version, these fields would also be input fields.
            </p>
          </div>
        </div>
      )}
      {/* Review & Generate Will */}
      {currentStep === 10 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Review & Generate Will</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4 text-gray-700">
            <h3 className="text-xl font-semibold text-gray-800">Testator Details</h3>
            <p><strong>Name:</strong> {testatorDetails.name}</p>
            <p><strong>Son/Daughter of:</strong> {testatorDetails.sonOf}</p>
            <p><strong>Residing At:</strong> {testatorDetails.residingAt}</p>
            <p><strong>Will Date:</strong> {testatorDetails.willDate}</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Beneficiaries</h3>
            {beneficiaries.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {beneficiaries.map((b, i) => (
                  <li key={i}>
                    {b.name} ({b.relationship}), PAN/Aadhar: {b.panAadhar}, Residence: {b.residence}, Age: {b.age}
                  </li>
                ))}
              </ul>
            ) : <p>No beneficiaries added.</p>}

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Movable Assets (Financial)</h3>
            {bankAccounts.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">Bank Accounts:</h4>
                <ul className="list-disc list-inside ml-4">
                  {bankAccounts.map((ba, i) => (
                    <li key={i}>{ba.bankName}, Acc: {ba.accountNumber}, Remark: {ba.typeRemark}, Beneficiary: {ba.beneficiaryName}, Share: {ba.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {insurancePolicies.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">Insurance Policies:</h4>
                <ul className="list-disc list-inside ml-4">
                  {insurancePolicies.map((ip, i) => (
                    <li key={i}>{ip.nameOfPolicy}, Policy No: {ip.policyNumber}, Remark: {ip.typeRemark}, Beneficiary: {ip.beneficiaryName}, Share: {ip.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {stocks.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">Stocks:</h4>
                <ul className="list-disc list-inside ml-4">
                  {stocks.map((s, i) => (
                    <li key={i}>{s.brokerageFirm}, Acc: {s.accountNo}, Remark: {s.typeRemark}, Beneficiary: {s.beneficiaryName}, Share: {s.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {mutualFunds.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">Mutual Funds:</h4>
                <ul className="list-disc list-inside ml-4">
                  {mutualFunds.map((mf, i) => (
                    <li key={i}>{mf.mfDistributor}, Acc: {mf.accountNo}, Remark: {mf.typeRemark}, Beneficiary: {mf.beneficiaryName}, Share: {mf.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {(bankAccounts.length === 0 && insurancePolicies.length === 0 && stocks.length === 0 && mutualFunds.length === 0) && <p>No financial assets added.</p>}


            <h3 className="text-xl font-semibold text-gray-800 mt-6">Movable Assets (Physical)</h3>
            {jewellery.length > 0 ? (
              <>
                <h4 className="font-medium text-gray-700">Jewellery:</h4>
                <ul className="list-disc list-inside ml-4">
                  {jewellery.map((j, i) => (
                    <li key={i}>{j.typeOfJewellery}, Invoice: {j.invoiceNumber}, Remark: {j.typeRemark}, Beneficiary: {j.beneficiaryName}, Share: {j.share}%</li>
                  ))}
                </ul>
              </>
            ) : <p>No physical assets added.</p>}

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Immovable Assets</h3>
            {house.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">House Properties:</h4>
                <ul className="list-disc list-inside ml-4">
                  {house.map((h, i) => (
                    <li key={i}>{h.nameOfProperty}, Reg No: {h.registrationNumber}, Remark: {h.typeRemark}, Beneficiary: {h.beneficiaryName}, Share: {h.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {land.length > 0 && (
              <>
                <h4 className="font-medium text-gray-700">Land Properties:</h4>
                <ul className="list-disc list-inside ml-4">
                  {land.map((l, i) => (
                    <li key={i}>{l.nameOfLand}, Reg No: {l.registrationNumber}, Remark: {l.typeRemark}, Beneficiary: {l.beneficiaryName}, Share: {l.share}%</li>
                  ))}
                </ul>
              </>
            )}
            {(house.length === 0 && land.length === 0) && <p>No immovable assets added.</p>}

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Executors</h3>
            <p><strong>Primary Executor:</strong> {executors.primaryName}, son of {executors.primarySonOf}, resident of {executors.primaryResidentOf}.</p>
            <p><strong>Alternate Executor:</strong> {executors.alternateName}, daughter of {executors.alternateDaughterOf}, resident of {executors.alternateResidentOf}.</p>

            <p className="mt-6 text-sm text-gray-500">
              *Note: Residue Assets, Guardianship, and Discharge of Liabilities clauses will be included as per the template's standard wording in the generated will.
            </p>
          </div>
          <button
            onClick={generateWillHTML}
            className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Generate Will HTML
          </button>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default App
