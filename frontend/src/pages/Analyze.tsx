import { useState, useEffect } from 'react';
import FileDropArea from '../components/FileDropArea';
import CoverageTab from '../components/tabs/CoverageTab';
import OverviewTab from '../components/tabs/OverviewTab';
import AmountSharingTab from '../components/tabs/AmountSharingTab';
import WaitingPeriodTab from '../components/tabs/WaitingPeriodTab';
import RedFlagsTab from '../components/tabs/RedFlagsTab';
import LoopholesTab from '../components/tabs/LoopholesTab';
import PreAnalyzedGrid from '../components/PreAnalyzedGrid';

const Analyze = () => {
    const [analysisData, setAnalysisData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>('Overview');
    const [streamingSummary, setStreamingSummary] = useState<string>("");
    const [view, setView] = useState<'selection' | 'uploading' | 'results'>('selection');
    const [preAnalyzedPolicies, setPreAnalyzedPolicies] = useState<any[]>([]);
    const [isLoadingGrid, setIsLoadingGrid] = useState(true);

    useEffect(() => {
        const fetchPreAnalyzed = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/analyze/pre-analyzed`);
                if (response.ok) {
                    const data = await response.json();
                    setPreAnalyzedPolicies(data);
                }
            } catch (error) {
                console.error("Failed to fetch pre-analyzed policies:", error);
            } finally {
                setIsLoadingGrid(false);
            }
        };
        fetchPreAnalyzed();
    }, []);

    const handleSelectPreAnalyzed = async (id: string) => {
        setView('results');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/analyze/pre-analyzed/${id}`);
            if (response.ok) {
                const data = await response.json();
                setAnalysisData(data.analysis);
                setStreamingSummary(data.summary);
            }
        } catch (error) {
            console.error("Failed to fetch policy analysis:", error);
            setView('selection');
        }
    };

    if (view === 'selection') {
        return (
            <PreAnalyzedGrid
                policies={preAnalyzedPolicies}
                isLoading={isLoadingGrid}
                onSelect={handleSelectPreAnalyzed}
                onUploadClick={() => setView('uploading')}
            />
        );
    }

    if (view === 'uploading' && !analysisData) {
        return (
            <FileDropArea
                onStarted={() => {
                    setView('results');
                }}
                onSummaryChunk={(chunk) => setStreamingSummary(prev => prev + chunk)}
                onAnalysisComplete={(data: any) => setAnalysisData(data)}
            />
        )
    }

    const tabs = ['Overview', 'Coverage', 'Amount & Sharing', 'Waiting Period', 'Red Flags', 'Loopholes'];

    const renderTabContent = () => {
        if (!analysisData && activeTab !== 'Overview') {
            return (
                <div className="flex flex-col gap-8 p-8 animate-in fade-in duration-500">
                    {/* Skeleton Loader */}
                    <div className="space-y-8 max-w-4xl">
                        <div className="space-y-3">
                            <div className="h-8 bg-muted/40 animate-pulse rounded-xl w-1/3" />
                            <div className="h-4 bg-muted/30 animate-pulse rounded-lg w-full" />
                            <div className="h-4 bg-muted/30 animate-pulse rounded-lg w-5/6" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-48 bg-muted/20 animate-pulse rounded-3xl border border-border/50" />
                            <div className="h-48 bg-muted/20 animate-pulse rounded-3xl border border-border/50" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-6 bg-muted/40 animate-pulse rounded-lg w-1/4" />
                            <div className="space-y-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 bg-muted/10 animate-pulse rounded-2xl border border-border/30 w-full" />
                                ))}
                            </div>
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

                <div>
                    <div className='px-5'>
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            {/* Back to selection button if in results */}
            {/* <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => {
                        setView('selection');
                        setAnalysisData(null);
                        setStreamingSummary("");
                    }}
                    className="px-6 py-3 rounded-full bg-foreground text-background font-semibold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                    Analyze Another
                </button>
            </div> */}
        </div>
    )
}

// Small helper to ensure data integrity for edge cases
const data_wrapper = (data: any) => {
    if (!data) return { mention: false };
    return data;
}

export default Analyze