
import React, { useState, useRef } from 'react';
import { DUMMY_TRANSCRIPT } from './constants';
import type { FunctionalAbilitiesFormData } from './types';
import { extractFunctionalAbilitiesData } from './services/geminiService';
import TranscriptInput from './components/TranscriptInput';
import PatientForm from './components/PatientForm';
import Header from './components/Header';
import { ErrorIcon, InfoIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [transcript, setTranscript] = useState<string>(DUMMY_TRANSCRIPT);
  const [formData, setFormData] = useState<FunctionalAbilitiesFormData | null>(null);
  const [loadingState, setLoadingState] = useState<{ active: boolean; message: string }>({ active: false, message: '' });
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    setLoadingState({ active: true, message: 'Analyzing transcript with Gemini AI...' });
    setError(null);
    setFormData(null);

    try {
      const data = await extractFunctionalAbilitiesData(transcript);
      setFormData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoadingState({ active: false, message: '' });
    }
  };

  const handleDownloadPdf = () => {
    if (!formRef.current || !formData) return;

    // @ts-ignore
    const { jsPDF } = window.jspdf;
    // @ts-ignore
    const html2canvas = window.html2canvas;

    const formElement = formRef.current;
    
    html2canvas(formElement, {
        useCORS: true,
        scale: 2, // Higher scale for better quality
        windowWidth: formElement.scrollWidth,
        windowHeight: formElement.scrollHeight,
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'px',
          // Use a standard paper size ratio, but scaled to the element's width
          format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        const lastName = formData?.sectionA?.workerLastName || 'patient';
        pdf.save(`functional-abilities-form-${lastName}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="bg-brand-50 border border-brand-200 text-brand-800 rounded-lg p-4 mb-8 flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>
            This demo uses the Google Gemini API to extract data from doctor's notes. Paste a transcript, or use the example, and click "Analyze & Fill Form". The AI will populate the form with the extracted information.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TranscriptInput
            transcript={transcript}
            setTranscript={setTranscript}
            onAnalyze={handleAnalyze}
            isLoading={loadingState.active}
          />
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 relative min-h-[600px] flex flex-col">
            {loadingState.active && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10 text-center p-4">
                <svg className="animate-spin h-10 w-10 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg font-medium text-brand-800">{loadingState.message}</p>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 bg-red-50/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10 p-6 text-center">
                <ErrorIcon className="h-10 w-10 text-red-500" />
                <p className="mt-4 text-lg font-medium text-red-800">Analysis Failed</p>
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-2">{error}</p>
              </div>
            )}
            <PatientForm 
              ref={formRef} 
              formData={formData} 
              onDownloadPdf={handleDownloadPdf} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;