interface OverviewTabProps {
    data: {
        policy_title: { mention: boolean; value: string };
        policy_type: { mention: boolean; value: string };
        parties_involved: { mention: boolean; insurer: string; policyholder: string; beneficiaries_defined: boolean };
        period_of_contract: {
            mention: boolean;
            start_date: string;
            end_date: string;
            tenure: string;
            renewable: { bool: boolean; wording: string; condition: string };
        };
        installments: {
            mention: boolean;
            frequency: string;
            grace_period: string;
            consequence_of_lapse: string;
        };
        ways_to_claim: {
            mention: boolean;
            methods: string[];
            claim_notification_timeline: string;
            documentation_required: string[];
        };
        brief_overview: string;
    }
}

const OverviewTab = ({ data }: OverviewTabProps) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-accent-bg border border-accent-border p-6 rounded-2xl">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">Policy Intent</h3>
                    <p className="text-text-h leading-relaxed">{data.brief_overview}</p>
                </div>
                <div className="bg-white/5 border border-border p-6 rounded-2xl flex flex-col gap-4">
                    <div>
                        <div className="text-sm text-text/60">Policy Title</div>
                        <div className="text-lg font-semibold text-text-h">{data.policy_title.value || "N/A"}</div>
                    </div>
                    <div>
                        <div className="text-sm text-text/60">Policy Type</div>
                        <div className="text-lg font-semibold text-text-h">{data.policy_type.value || "N/A"}</div>
                    </div>
                </div>
            </div>

            {/* Parties & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-border p-6 rounded-2xl">
                    <h4 className="font-semibold text-text-h mb-3">Parties</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text">Insurer</span>
                            <span className="text-text-h font-medium">{data.parties_involved.insurer}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text">Policyholder</span>
                            <span className="text-text-h font-medium">{data.parties_involved.policyholder}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text font-semibold">Beneficiaries Defined</span>
                            <span className={data.parties_involved.beneficiaries_defined ? "text-positive" : "text-negative"}>
                                {data.parties_involved.beneficiaries_defined ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-border p-6 rounded-2xl">
                    <h4 className="font-semibold text-text-h mb-3">Period</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-text">
                            <span>Start</span>
                            <span className="text-text-h">{data.period_of_contract.start_date}</span>
                        </div>
                        <div className="flex justify-between text-text">
                            <span>End</span>
                            <span className="text-text-h">{data.period_of_contract.end_date}</span>
                        </div>
                        <div className="flex justify-between text-text">
                            <span>Tenure</span>
                            <span className="text-text-h">{data.period_of_contract.tenure}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-border">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${data.period_of_contract.renewable.bool ? 'bg-positive' : 'bg-negative'}`} />
                                <span className={data.period_of_contract.renewable.bool ? "text-positive" : "text-negative"}>
                                    {data.period_of_contract.renewable.bool ? "Renewable" : "Non-renewable"}
                                </span>
                            </div>
                            <p className="text-[12px] text-text mt-1 italic">
                                {data.period_of_contract.renewable.bool ? data.period_of_contract.renewable.wording : data.period_of_contract.renewable.condition}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-border p-6 rounded-2xl">
                    <h4 className="font-semibold text-text-h mb-3">Installments</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-text">
                            <span>Frequency</span>
                            <span className="text-text-h">{data.installments.frequency}</span>
                        </div>
                        <div className="flex justify-between text-text">
                            <span>Grace Period</span>
                            <span className="text-text-h">{data.installments.grace_period}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-text block mb-1">Lapse Consequence:</span>
                            <span className="text-negative text-[12px] leading-tight block">{data.installments.consequence_of_lapse}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Claims Process */}
            <div className="bg-white/5 border border-border p-8 rounded-3xl">
                <h3 className="text-xl font-semibold text-text-h mb-6">Claims & Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="text-sm text-text/60 mb-2">Notification Timeline</div>
                            <div className="p-3 bg-accent-bg border border-accent-border rounded-xl text-text-h font-medium">
                                {data.ways_to_claim.claim_notification_timeline}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-text/60 mb-2">Methods</div>
                            <div className="flex flex-wrap gap-2">
                                {data.ways_to_claim.methods.map((m, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-text-h border border-border">{m}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-text/60 mb-2">Documentation Required</div>
                        <ul className="grid grid-cols-1 gap-2 m-0 p-0 list-none">
                            {data.ways_to_claim.documentation_required.map((doc, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text">
                                    <svg className="w-4 h-4 text-positive shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab;
