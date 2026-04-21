import { useState, useRef } from 'react';
import Breadcrumb from "./Breadcrumb"

interface FileDropAreaProps {
    onAnalysisComplete: (data: any) => void;
}

const FileDropArea = ({ onAnalysisComplete }: FileDropAreaProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        if (file.type !== 'application/pdf') {
            setError("Please upload a PDF file.");
            return;
        }

        setError(null);
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
            const response = await fetch(`${baseUrl}/api/analyze`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to analyze document.");
            }

            const data = await response.json();
            onAnalysisComplete(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-8 flex-1 flex flex-col gap-8 max-w-4xl mx-auto w-full text-left">
            <Breadcrumb />

            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-heading font-semibold text-text-h m-0">Upload Policy</h1>
                <p className="text-text">Upload your insurance policy in PDF format. Our AI will extract key terms and identify hidden clauses.</p>
            </div>

            <div
                className={`
                    flex-1 min-h-[400px] border-2 border-dashed rounded-3xl flex flex-col justify-center items-center gap-6 transition-all duration-300
                    ${isDragging ? 'border-accent bg-accent-bg scale-[1.02]' : 'border-border bg-white/5'}
                    ${isUploading ? 'opacity-50 pointer-events-none' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />

                <div className="w-20 h-20 bg-accent-bg rounded-2xl flex items-center justify-center text-accent">
                    {isUploading ? (
                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="text-xl font-medium text-text-h">
                        {isUploading ? 'Analyzing your policy...' : 'Click or drag PDF here'}
                    </div>
                    <div className="text-text text-sm">PDF files only (max 10MB)</div>
                </div>

                {error && (
                    <div className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm border border-red-500/20">
                        {error}
                    </div>
                )}
            </div>

            <div className="text-sm text-text/60 italic flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your data is secure and processed using advanced encryption.
            </div>
        </div>
    )
}

export default FileDropArea