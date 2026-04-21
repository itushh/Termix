import { useState } from 'react';
import FileDropArea from '../components/FileDropArea';
import CoverageTab from '../components/tabs/CoverageTab';
import OverviewTab from '../components/tabs/OverviewTab';
import AmountSharingTab from '../components/tabs/AmountSharingTab';
import WaitingPeriodTab from '../components/tabs/WaitingPeriodTab';
import RedFlagsTab from '../components/tabs/RedFlagsTab';
import LoopholesTab from '../components/tabs/LoopholesTab';

const Analyze = () => {
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>('Overview');

    if (!analysisData) {
        return (
            <FileDropArea onAnalysisComplete={(data: any) => setAnalysisData(data)} />
        )
    }

    const tabs = ['Overview', 'Coverage', 'Amount & Sharing', 'Waiting Period', 'Red Flags', 'Loopholes'];

    return (
        <div className="p-8 flex flex-col gap-8 text-left max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-6">
                {/* <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-heading font-semibold text-text-h m-0 text-center md:text-left">Analysis Results</h1>
                    <p className="text-text max-w-2xl text-center md:text-left">AI-powered deep dive into your policy. Switch between tabs to explore different aspects of the coverage and potential risks.</p>
                </div> */}

                <div className="flex border-b border-border gap-2 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-4 font-medium transition-all duration-300 relative whitespace-nowrap ${activeTab === tab ? 'text-accent' : 'text-text hover:text-text-h'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-4 min-h-125">
                    {activeTab === 'Overview' && (
                        <OverviewTab data={analysisData.overview} />
                    )}
                    {activeTab === 'Coverage' && (
                        <CoverageTab data={analysisData.coverage} />
                    )}
                    {activeTab === 'Amount & Sharing' && (
                        <AmountSharingTab data={analysisData.amount_sharing} />
                    )}
                    {activeTab === 'Waiting Period' && (
                        <WaitingPeriodTab data={data_wrapper(analysisData.waiting_period)} />
                    )}
                    {activeTab === 'Red Flags' && (
                        <RedFlagsTab data={analysisData.red_flags} />
                    )}
                    {activeTab === 'Loopholes' && (
                        <LoopholesTab data={analysisData.loopholes} />
                    )}
                </div>
            </div>
        </div>
    )
}

// Small helper to ensure data integrity for edge cases
const data_wrapper = (data: any) => {
    if (!data) return { mention: false };
    return data;
}

export default Analyze