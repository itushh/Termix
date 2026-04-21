interface WaitingPeriodTabProps {
    data: {
        mention: boolean;
        max_duration: string;
        unscoped: Array<{ benifit_exclusion: string; has_list: boolean; list: string[] }>;
        scoped: boolean;
        scope: Array<{ benifit_exclusion: string; has_list: boolean; list: string[]; duration: string }>;
    }
}

const WaitingPeriodTab = ({ data }: WaitingPeriodTabProps) => {
    if (!data.mention) {
        return (
            <div className="p-8 bg-white/5 border border-border rounded-3xl text-center">
                <p className="text-text italic">No waiting period information found in this policy.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Max Duration Banner */}
            <div className="bg-accent-bg border border-accent-border p-8 rounded-3xl flex flex-col items-center justify-center gap-2 text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">Standard Waiting Period</span>
                <div className="text-5xl font-bold text-text-h">{data.max_duration}</div>
                <p className="text-text text-sm max-w-sm mt-2">This is the general waiting period before most benefits become active.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Unscoped (General Exclusions) */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-text-h flex items-center gap-2">
                        <div className="w-2 h-6 bg-accent rounded-full" />
                        Universal Exclusions during {data.max_duration}
                    </h3>
                    <div className="flex flex-col gap-3">
                        {data.unscoped.map((item, i) => (
                            <div key={i} className="bg-white/5 border border-border p-5 rounded-2xl">
                                <div className="text-text-h font-medium mb-3">{item.benifit_exclusion}</div>
                                {item.has_list && item.list.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {item.list.map((li, j) => (
                                            <span key={j} className="px-2 py-1 bg-negative-bg text-negative border border-negative/10 rounded text-xs">
                                                {li}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Scoped (Special Waiting Periods) */}
                <section className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-text-h flex items-center gap-2">
                        <div className="w-2 h-6 bg-positive rounded-full" />
                        Special Waiting Periods
                    </h3>
                    {!data.scoped ? (
                        <div className="bg-white/5 border border-border p-8 rounded-2xl text-center italic text-text">
                            No special waiting periods for specific conditions.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {data.scope.map((item, i) => (
                                <div key={i} className="bg-white/5 border border-border p-5 rounded-2xl flex flex-col gap-3">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="text-text-h font-medium">{item.benifit_exclusion}</div>
                                        <div className="px-3 py-1 bg-positive-bg text-positive border border-positive/20 rounded-lg text-sm font-bold whitespace-nowrap">
                                            {item.duration}
                                        </div>
                                    </div>
                                    {item.has_list && item.list.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.list.map((li, j) => (
                                                <span key={j} className="px-2 py-1 bg-white/10 text-text-h border border-border rounded text-xs">
                                                    {li}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default WaitingPeriodTab;
