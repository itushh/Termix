interface LoopholesTabProps {
    data: {
        user_rejection_triggers: Array<{ activity: string; wording: string; is_discretionary: boolean }>;
        exploitable_ambiguities: Array<{ term: string; potential_exploitation: string; vague_wording: string }>;
        silent_exclusions: { mention: boolean; list: string[] };
        technical_traps: {
            notice_period_trap: { exists: boolean; wording: string };
            geographic_limitations: { exists: boolean; restricted_areas: string[]; wording: string };
        };
    }
}

const LoopholesTab = ({ data }: LoopholesTabProps) => {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Rejection Triggers */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-text-h flex items-center gap-2">
                    <span className="text-2xl">⚠️</span> Rejection Triggers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.user_rejection_triggers.map((trigger, i) => (
                        <div key={i} className="bg-negative-bg border border-negative/20 p-6 rounded-3xl flex flex-col gap-3 relative overflow-hidden group">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-text-h">{trigger.activity}</span>
                                {trigger.is_discretionary && (
                                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-[10px] uppercase font-bold rounded ring-1 ring-accent/30">Discretionary</span>
                                )}
                            </div>
                            <p className="text-sm text-text italic">"{trigger.wording}"</p>
                            <div className="absolute top-0 right-0 p-2 opacity-5">
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Exploitable Ambiguities */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-text-h flex items-center gap-2">
                    <span className="text-2xl">🔍</span> Exploitable Ambiguities
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {data.exploitable_ambiguities.map((amb, i) => (
                        <div key={i} className="bg-white/5 border border-border p-6 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                                <div className="text-xs font-bold text-accent uppercase">Ambiguous Term</div>
                                <div className="text-2xl font-bold text-text-h underline decoration-accent/30 decoration-2 underline-offset-4">{amb.term}</div>
                                <p className="text-sm text-text bg-white/5 p-3 rounded-xl italic">"{amb.vague_wording}"</p>
                            </div>
                            <div className="bg-accent-bg border border-accent-border p-5 rounded-2xl">
                                <span className="text-xs font-bold text-accent uppercase block mb-2">How it's exploited:</span>
                                <p className="text-sm text-text-h leading-relaxed">{amb.potential_exploitation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Silent Exclusions & Technical Traps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-border p-8 rounded-3xl">
                    <h4 className="font-semibold text-text-h mb-4 flex items-center gap-2">
                        <div className="w-1 h-4 bg-negative rounded" />
                        Silent Exclusions
                    </h4>
                    <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                        {data.silent_exclusions.list.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 p-3 bg-negative-bg/5 rounded-xl border border-negative/5 text-sm text-text">
                                <div className="w-2 h-2 rounded-full bg-negative" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-white/5 border border-border p-6 rounded-2xl">
                        <h4 className="font-semibold mb-2 text-sm uppercase text-text/40 tracking-widest">Notice Period Trap</h4>
                        {data.technical_traps.notice_period_trap.exists ? (
                            <p className="text-sm text-negative leading-tight italic">"{data.technical_traps.notice_period_trap.wording}"</p>
                        ) : (
                            <span className="text-sm text-text/40">No notice trap detected.</span>
                        )}
                    </div>

                    <div className="bg-white/5 border border-border p-6 rounded-2xl flex-1">
                        <h4 className="font-semibold mb-2 text-sm uppercase text-text/40 tracking-widest">Geographic Limitations</h4>
                        {data.technical_traps.geographic_limitations.exists ? (
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-negative leading-tight italic">"{data.technical_traps.geographic_limitations.wording}"</p>
                                <div className="flex flex-wrap gap-2">
                                    {data.technical_traps.geographic_limitations.restricted_areas.map((area, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-negative-bg text-negative border border-negative/10 rounded text-[10px] uppercase font-bold">{area}</span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <span className="text-sm text-text/40">No geographic restrictions found.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoopholesTab;
