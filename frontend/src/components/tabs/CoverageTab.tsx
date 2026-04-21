interface CoverageTabProps {
    data: {
        desease: {
            mention: boolean;
            cover_all: {
                bool: boolean;
                wording: string;
                condition: string;
            };
            includes_most: boolean;
            exclusion: string[];
            inclusion: string[];
        };
        hospital: {
            mention: boolean;
            cover_all: {
                bool: boolean;
                wording: string;
                condition: string;
            };
            includes_most: boolean;
            includes: string[];
            excludes: string[];
        };
    };
}

const CoverageTab = ({ data }: CoverageTabProps) => {
    const { desease, hospital } = data;

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Disease Section */}
            <section className="bg-white/5 border border-border rounded-3xl p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-bg rounded-xl flex items-center justify-center text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.18.08l-2.02-.844a2 2 0 01-1.046-1.106l-.53-1.482a2 2 0 00-.817-1.034l-2.29-1.302a2 2 0 00-1.258-.295l-2.417.302" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-text-h m-0">Disease Coverage</h3>
                </div>

                {!desease.mention ? (
                    <div className="text-text italic">No specific mention of disease coverage in the providing wording.</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Cover All Check */}
                        <div className={`p-5 rounded-2xl border ${desease.cover_all.bool ? 'bg-positive-bg border-positive/20' : 'bg-negative-bg border-negative/10'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-2 h-2 rounded-full ${desease.cover_all.bool ? 'bg-positive' : 'bg-negative'}`} />
                                <span className={`font-medium ${desease.cover_all.bool ? 'text-positive' : 'text-negative'}`}>
                                    {desease.cover_all.bool ? 'Comprehensive Coverage' : 'Conditional Coverage'}
                                </span>
                            </div>
                            <div className="text-text text-sm">
                                {desease.cover_all.bool ? (
                                    <>
                                        <div className="font-semibold text-text-h mb-1">Supporting Wording:</div>
                                        <div className="italic border-l-2 border-accent-border pl-4 my-2">"{desease.cover_all.wording}"</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold text-text-h mb-1">Restrictive Condition:</div>
                                        <div className="italic border-l-2 border-negative/30 pl-4 my-2">"{desease.cover_all.condition}"</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Partial Coverage Details */}
                        {!desease.cover_all.bool && (
                            <div>
                                {desease.includes_most && desease.exclusion.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <div className="text-sm font-semibold uppercase tracking-wider text-text/60">Exclusions</div>
                                        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {desease.exclusion.map((item, i) => (
                                                <li key={i} className="px-4 py-4 border-border bg-black/5 rounded-lg text-sm border">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {!desease.includes_most && desease.inclusion.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <div className="text-sm font-semibold uppercase tracking-wider text-text/60">Covered Diseases</div>
                                        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {desease.inclusion.map((item, i) => (
                                                <li key={i} className="px-4 py-4 border-border bg-black/5 rounded-lg text-sm border">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Hospital Section */}
            <section className="bg-white/5 border border-border rounded-3xl p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-bg rounded-xl flex items-center justify-center text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-text-h m-0">Hospital Network</h3>
                </div>

                {!hospital.mention ? (
                    <div className="text-text italic">No specific hospitals mentioned in the wording.</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className={`p-5 rounded-2xl border ${hospital.cover_all.bool ? 'bg-positive-bg border-positive/20' : 'bg-accent-bg border-accent-border'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-2 h-2 rounded-full ${hospital.cover_all.bool ? 'bg-positive' : 'bg-accent'}`} />
                                <span className={`font-medium ${hospital.cover_all.bool ? 'text-positive' : 'text-accent'}`}>
                                    {hospital.cover_all.bool ? 'Global Network' : 'Specific Network Hospitals'}
                                </span>
                            </div>
                            <div className="text-text text-sm">
                                {hospital.cover_all.bool ? (
                                    <>
                                        <div className="font-semibold text-text-h mb-1">Scope:</div>
                                        <div className="italic border-l-2 border-positive/30 pl-4 my-2">"{hospital.cover_all.wording}"</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold text-text-h mb-1">Limitations:</div>
                                        <div className="italic border-l-2 border-accent-border pl-4 my-2">"{hospital.cover_all.condition}"</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {!hospital.cover_all.bool && (
                            <div>
                                {hospital.includes_most && hospital.excludes.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <div className="text-sm font-semibold uppercase tracking-wider text-text/60">Excluded Networks</div>
                                        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {hospital.excludes.map((item, i) => (
                                                <li key={i} className="px-4 py-4 border-border bg-black/5 rounded-lg text-sm border">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {!hospital.includes_most && hospital.includes.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <div className="text-sm font-semibold uppercase tracking-wider text-text/60">Included Networks</div>
                                        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {hospital.includes.map((item, i) => (
                                                <li key={i} className="px-4 py-4 border-border bg-black/5 rounded-lg text-sm border">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default CoverageTab;
