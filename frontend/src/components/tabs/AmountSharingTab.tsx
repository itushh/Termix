interface AmountSharingTabProps {
    data: {
        sum_insured: {
            mention: boolean;
            base_amount: string;
            is_floater: { bool: boolean; wording: string };
        };
        maximum_limits: {
            mention: boolean;
            overall_annual_limit: string;
            lifetime_maximum: { exists: boolean; amount: string };
        };
        scoped_limits: {
            has_sublimits: boolean;
            scope: Array<{ category: string; limit_type: string; limit_value: string; wording: string }>;
        };
        cost_sharing: {
            copayment: { exists: boolean; percentage: string; condition: string };
            deductible: { exists: boolean; amount: string; type: string };
        };
    }
}

const AmountSharingTab = ({ data }: AmountSharingTabProps) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Primary Amounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-positive-bg border border-positive/20 p-8 rounded-3xl flex flex-col gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-positive">Total Sum Insured</h3>
                    <div className="text-4xl font-bold text-text-h">{data.sum_insured.base_amount}</div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${data.sum_insured.is_floater.bool ? 'bg-accent text-white' : 'bg-white/10 text-text'}`}>
                            {data.sum_insured.is_floater.bool ? 'Floater' : 'Individual'}
                        </span>
                        <span className="text-xs text-text italic">{data.sum_insured.is_floater.wording}</span>
                    </div>
                </div>
                <div className="bg-white/5 border border-border p-8 rounded-3xl flex flex-col justify-center gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-text">Annual Limit</span>
                        <span className="text-text-h font-semibold">{data.maximum_limits.overall_annual_limit}</span>
                    </div>
                    {data.maximum_limits.lifetime_maximum.exists && (
                        <div className="flex justify-between items-center pt-4 border-t border-border">
                            <span className="text-text">Lifetime Max</span>
                            <span className="text-text-h font-semibold">{data.maximum_limits.lifetime_maximum.amount}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Cost Sharing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-2xl border ${data.cost_sharing.copayment.exists ? 'bg-negative-bg border-negative/20' : 'bg-white/5 border-border'}`}>
                    <h4 className="font-semibold text-text-h mb-2">Co-payment</h4>
                    {data.cost_sharing.copayment.exists ? (
                        <div className="flex flex-col gap-1">
                            <div className="text-2xl font-bold text-negative">{data.cost_sharing.copayment.percentage}</div>
                            <div className="text-sm text-text italic">{data.cost_sharing.copayment.condition}</div>
                        </div>
                    ) : (
                        <div className="text-text text-sm">No co-payment required.</div>
                    )}
                </div>
                <div className={`p-6 rounded-2xl border ${data.cost_sharing.deductible.exists ? 'bg-negative-bg border-negative/20' : 'bg-white/5 border-border'}`}>
                    <h4 className="font-semibold text-text-h mb-2">Deductible</h4>
                    {data.cost_sharing.deductible.exists ? (
                        <div className="flex flex-col gap-1">
                            <div className="text-2xl font-bold text-negative">{data.cost_sharing.deductible.amount}</div>
                            <div className="text-sm text-text bg-white/5 p-1 rounded px-2 self-start">{data.cost_sharing.deductible.type}</div>
                        </div>
                    ) : (
                        <div className="text-text text-sm">No deductible mentioned.</div>
                    )}
                </div>
            </div>

            {/* Sub-limits */}
            <section className="bg-white/5 border border-border rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-text-h mb-6">Specific Limits & Sub-limits</h3>
                {!data.scoped_limits.has_sublimits ? (
                    <p className="text-text italic">No specific sub-limits detected in the policy wording.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {data.scoped_limits.scope.map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 border border-border rounded-xl gap-4">
                                <div className="flex flex-col">
                                    <span className="text-text-h font-medium">{item.category}</span>
                                    <span className="text-xs text-text italic">"{item.wording}"</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs uppercase bg-accent-bg text-accent px-2 py-1 rounded font-bold">{item.limit_type}</span>
                                    <span className="text-lg font-bold text-text-h">{item.limit_value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default AmountSharingTab;
