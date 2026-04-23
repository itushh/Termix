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
    const [streamingSummary, setStreamingSummary] = useState<string>("");
    const [isStarted, setIsStarted] = useState(false);

    if (!isStarted && !analysisData) {
        return (
            <FileDropArea
                onStarted={() => setIsStarted(true)}
                onSummaryChunk={(chunk) => setStreamingSummary(prev => prev + chunk)}
                onAnalysisComplete={(data: any) => setAnalysisData(data)}
            />
        )
    }

    const tabs = ['Overview', 'Coverage', 'Amount & Sharing', 'Waiting Period', 'Red Flags', 'Loopholes'];

    const renderTabContent = () => {
        if (!analysisData && activeTab !== 'Overview') {
            return (
                <div className="flex flex-col gap-6 p-8 animate-in fade-in duration-500">
                    <div className="h-96 bg-muted/10 rounded-4xl border border-dashed border-border flex flex-col items-center justify-center gap-6 p-12 text-center">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-foreground">Extracting Details...</h3>
                            <p className="text-muted-foreground max-w-sm">We're performing a deep dive into the specific clauses of your policy. This will only take a moment.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                            <div className="h-4 bg-muted animate-pulse rounded-full" />
                            <div className="h-4 bg-muted animate-pulse rounded-full" />
                            <div className="h-4 bg-muted animate-pulse rounded-full w-2/3" />
                            <div className="h-4 bg-muted animate-pulse rounded-full w-4/5" />
                        </div>
                    </div>
                </div>
            )
        }

        switch (activeTab) {
            case 'Overview':
                return <OverviewTab data={analysisData?.overview} streamingSummary={streamingSummary} />;
            case 'Coverage':
                return <CoverageTab data={analysisData.coverage} />;
            case 'Amount & Sharing':
                return <AmountSharingTab data={analysisData.amount_sharing} />;
            case 'Waiting Period':
                return <WaitingPeriodTab data={data_wrapper(analysisData.waiting_period)} />;
            case 'Red Flags':
                return <RedFlagsTab data={analysisData.red_flags} />;
            case 'Loopholes':
                return <LoopholesTab data={analysisData.loopholes} />;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col gap-8 text-left max-w-7xl mx-auto w-full flex-1">
            <div className="flex flex-col gap-8">
                {/* <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-3xl font-bold tracking-tight text-foreground truncate">
                            {analysisData?.overview?.policy_title.value || (isStarted ? "Analyzing Document..." : "Analysis Results")}
                        </h1>
                    </div>
                </div> */}

                
                <div className="sticky top-18.25 z-40 bg-background/95 backdrop-blur-sm px-5 mt-10">
                    <div className="flex border-b border-border gap-1 md:gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden scroll-smooth">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-4 text-sm font-semibold transition-all duration-300 relative whitespace-nowrap 
                                    ${activeTab === tab
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-lg'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary rounded-full z-10" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* <div className="mt-2"> */}
                <div>
                    {/* <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden min-h-125"> */}
                    <div className='px-5'>
                        {renderTabContent()}
                    </div>
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