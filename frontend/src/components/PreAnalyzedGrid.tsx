import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PreAnalyzedPolicy {
    _id: string;
    title: string;
}

interface PreAnalyzedGridProps {
    policies: PreAnalyzedPolicy[];
    onSelect: (id: string) => void;
    onUploadClick: () => void;
    isLoading: boolean;
}

const PreAnalyzedGrid: React.FC<PreAnalyzedGridProps> = ({ policies, onSelect, onUploadClick, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full py-12 px-6">
                <div className="flex flex-col gap-4 text-center mb-4">
                    <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mx-auto" />
                    <div className="h-5 w-96 bg-muted animate-pulse rounded-md mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-40 rounded-3xl bg-muted/20 border border-border/50 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full py-12 px-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Select a Policy to Analyze
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Choose from our library of pre-analyzed policies or upload your own to get started with a deep legal and insurance dive.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Upload Your Own Card */}
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onUploadClick}
                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                        <span className="text-xl font-bold text-primary">Upload Your Own</span>
                        <span className="text-sm text-primary/60">Analyze any PDF policy doc</span>
                    </div>
                </motion.button>

                {/* Pre-analyzed Policies */}
                {policies.map((policy) => (
                    <motion.button
                        key={policy._id}
                        whileHover={{ scale: 1.02, translateY: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(policy._id)}
                        className="flex flex-col items-start gap-4 p-8 rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all group text-left shadow-lg shadow-black/5"
                    >
                        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <FileText size={24} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                {policy.title}
                            </span>
                            <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 uppercase tracking-wider">
                                <CheckCircle2 size={14} />
                                Pre-Analyzed
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default PreAnalyzedGrid;
