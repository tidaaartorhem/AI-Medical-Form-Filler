
import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface TranscriptInputProps {
  transcript: string;
  setTranscript: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const TranscriptInput: React.FC<TranscriptInputProps> = ({ transcript, setTranscript, onAnalyze, isLoading }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor's Transcript</h2>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste doctor's notes here..."
        className="w-full flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 transition duration-150 ease-in-out text-sm font-mono bg-gray-50 min-h-[400px]"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:bg-brand-300 disabled:cursor-not-allowed transition-colors"
      >
        <SparklesIcon className="w-5 h-5 mr-2 -ml-1"/>
        {isLoading ? 'Analyzing...' : 'Analyze & Fill Form'}
      </button>
    </div>
  );
};

export default TranscriptInput;
