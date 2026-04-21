interface RedFlagsTabProps {
    data: {
        nondisclosure_clause: { mention: boolean; wording: string; look_back_period: string };
        material_facts: { defined: boolean; list: string[]; omission_consequence: string };
        fraud_definitions: { mention: boolean; actions_labeled_as_fraud: string[]; forfeiture_wording: string };
    }
}

const RedFlagsTab = ({ data }: RedFlagsTabProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Non-disclosure */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-negative/10 flex items-center justify-center text-negative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-h">Non-Disclosure</h3>
                </div>
                <div className="bg-negative-bg border border-negative/20 p-6 rounded-3xl flex flex-col gap-4 flex-1">
                    <div>
                        <span className="text-xs font-bold text-negative uppercase block mb-2">Look-back Period</span>
                        <div className="text-2xl font-bold text-text-h">{data.nondisclosure_clause.look_back_period || "Not Specified"}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-text/40 uppercase block">Critical Wording</span>
                        <p className="text-sm text-text italic leading-relaxed">"{data.nondisclosure_clause.wording}"</p>
                    </div>
                </div>
            </div>

            {/* Material Facts */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-h">Material Facts</h3>
                </div>
                <div className="bg-white/5 border border-border p-6 rounded-3xl flex flex-col gap-6 flex-1">
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-text/40 uppercase block">What counts as "Material":</span>
                        <ul className="m-0 p-0 list-none flex flex-col gap-2">
                            {data.material_facts.list.map((fact, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-text">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border">
                        <span className="text-xs font-bold text-negative uppercase block mb-1">Consequence of Omission</span>
                        <p className="text-sm text-negative font-medium leading-tight">{data.material_facts.omission_consequence}</p>
                    </div>
                </div>
            </div>

            {/* Fraud Definition */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-negative/10 flex items-center justify-center text-negative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-h">Fraud Clauses</h3>
                </div>
                <div className="bg-white/5 border border-border p-6 rounded-3xl flex flex-col gap-6 flex-1">
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-xs font-bold text-text/40 uppercase block">Fraudulent Actions:</span>
                        <div className="flex flex-wrap gap-2">
                            {data.fraud_definitions.actions_labeled_as_fraud.map((action, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 rounded border border-border text-xs text-text">{action}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="p-4 bg-negative-bg border border-negative/10 rounded-2xl">
                            <span className="text-xs font-bold text-negative uppercase block mb-1">Forfeiture Wording</span>
                            <p className="text-xs text-text italic leading-relaxed">"{data.fraud_definitions.forfeiture_wording}"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RedFlagsTab;
