import React, { useState, useRef } from 'react';
import { IntakeData, AppStep, Language } from './types';
import { analyzeContract } from './services/geminiService';
import { IntakeForm } from './components/IntakeForm';
import { ContractInput } from './components/ContractInput';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ShieldCheck, Loader2, RefreshCcw, BookOpen, AlertTriangle, Printer } from 'lucide-react';
import { TRANSLATIONS } from './constants';

const INITIAL_INTAKE: IntakeData = {
  purpose: '',
  representation: '',
  jurisdiction: '',
  contractType: '',
  stage: '',
  counterparty: '',
  riskTolerance: '',
  priorities: '',
  timeHorizon: '',
  dueDiligence: false,
  additionalInfo: ''
};

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [intakeData, setIntakeData] = useState<IntakeData>(INITIAL_INTAKE);
  const [contractText, setContractText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const reportRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language].app;

  const handleIntakeChange = (field: keyof IntakeData, value: string | boolean) => {
    setIntakeData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = async () => {
    setStep(AppStep.ANALYZING);
    setError(null);
    try {
      const result = await analyzeContract(intakeData, contractText, language);
      setAnalysisResult(result);
      setStep(AppStep.RESULTS);
    } catch (err) {
      setError("An error occurred during analysis. Please check your API key and try again.");
      setStep(AppStep.CONTRACT_INPUT);
    }
  };

  const handleRestart = () => {
    if (window.confirm(language === 'en' ? "This will clear your current analysis. Are you sure?" : "Isso apagará sua análise atual. Tem certeza?")) {
        setStep(AppStep.WELCOME);
        setIntakeData(INITIAL_INTAKE);
        setContractText('');
        setAnalysisResult('');
    }
  };

  const handlePrint = () => {
    if (!reportRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = reportRef.current.innerHTML;
      printWindow.document.write(`
        <html>
          <head>
            <title>${t.reportTitle} - LexGuard AI</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Inter', sans-serif; padding: 40px; -webkit-print-color-adjust: exact; }
            </style>
          </head>
          <body>
            <div class="max-w-4xl mx-auto">
              <div class="mb-8 border-b pb-4">
                <div class="flex justify-between items-end">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 leading-none">LexGuard AI</h1>
                        <p class="text-xs text-slate-500 font-medium mt-1">by Luciano Stringheti Silva de Almeida</p>
                    </div>
                    <div class="text-right">
                        <p class="text-slate-500 font-semibold">${t.reportTitle}</p>
                        <p class="text-xs text-slate-400">${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
              </div>
              <div class="space-y-4">
                ${content}
              </div>
            </div>
            <script>
              setTimeout(() => {
                window.print();
              }, 1000);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const renderContent = () => {
    switch (step) {
      case AppStep.WELCOME:
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8 animate-fade-in py-10">
            <div className="bg-blue-100 p-6 rounded-full">
              <ShieldCheck size={64} className="text-blue-700" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {t.title} <br/><span className="text-blue-600">{t.subtitle}</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{__html: t.description.replace('**', '<b>').replace('**', '</b>')}}></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left mt-8">
               <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <AlertTriangle className="text-amber-500 mb-2" size={24} />
                  <h3 className="font-bold text-slate-800">{t.riskCard}</h3>
                  <p className="text-sm text-slate-500">{t.riskDesc}</p>
               </div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <BookOpen className="text-emerald-500 mb-2" size={24} />
                  <h3 className="font-bold text-slate-800">{t.gapCard}</h3>
                  <p className="text-sm text-slate-500">{t.gapDesc}</p>
               </div>
               <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <ShieldCheck className="text-blue-500 mb-2" size={24} />
                  <h3 className="font-bold text-slate-800">{t.planCard}</h3>
                  <p className="text-sm text-slate-500">{t.planDesc}</p>
               </div>
            </div>
            <button 
              onClick={() => setStep(AppStep.INTAKE)}
              className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
            >
              {t.startBtn}
            </button>
          </div>
        );

      case AppStep.INTAKE:
        return (
          <IntakeForm 
            data={intakeData} 
            onChange={handleIntakeChange} 
            onNext={() => setStep(AppStep.CONTRACT_INPUT)} 
            lang={language}
          />
        );

      case AppStep.CONTRACT_INPUT:
        return (
          <div className="space-y-4">
             {error && (
                <div className="w-full max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    {error}
                </div>
            )}
            <ContractInput 
                value={contractText} 
                onChange={setContractText} 
                onAnalyze={handleAnalyze}
                onBack={() => setStep(AppStep.INTAKE)}
                lang={language}
            />
          </div>
        );

      case AppStep.ANALYZING:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Loader2 size={64} className="text-blue-600 animate-spin relative z-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{t.analyzingTitle}</h2>
            <p className="text-slate-500 max-w-md">
              {t.analyzingDesc}
            </p>
          </div>
        );

      case AppStep.RESULTS:
        return (
          <div className="w-full max-w-4xl mx-auto bg-white min-h-screen shadow-2xl rounded-2xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center sticky top-0 z-50">
              <div>
                 <h2 className="text-xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-emerald-400" />
                    {t.reportTitle}
                 </h2>
                 <p className="text-xs text-slate-400 mt-1">
                    {intakeData.representation} • {intakeData.contractType}
                 </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm transition-colors border border-blue-600"
                >
                  <Printer size={14} />
                  {t.printBtn}
                </button>
                <button 
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700"
                >
                  <RefreshCcw size={14} />
                  {t.newAnalysisBtn}
                </button>
              </div>
            </div>
            <div className="p-8 md:p-12 overflow-y-auto" ref={reportRef}>
               <MarkdownRenderer content={analysisResult} />
               <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
                  <p>{t.disclaimer}</p>
                  <p className="mt-2 font-medium opacity-75">Created by Luciano Stringheti Silva de Almeida</p>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => step !== AppStep.ANALYZING && setStep(AppStep.WELCOME)}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm shrink-0">
                L
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">LexGuard <span className="text-blue-600">AI</span></span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">by Luciano Stringheti Silva de Almeida</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {step !== AppStep.WELCOME && step !== AppStep.ANALYZING && (
                <div className="hidden md:flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className={step === AppStep.INTAKE ? "text-blue-600" : ""}>{t.navContext}</span>
                    <span>/</span>
                    <span className={step === AppStep.CONTRACT_INPUT ? "text-blue-600" : ""}>{t.navContract}</span>
                    <span>/</span>
                    <span className={step === AppStep.RESULTS ? "text-blue-600" : ""}>{t.navReport}</span>
                </div>
            )}
            
            {/* Language Toggle */}
            <div className="flex space-x-2 bg-slate-100 rounded-lg p-1">
              <button 
                onClick={() => setLanguage('en')}
                className={`p-1.5 rounded-md transition-all ${language === 'en' ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-50 hover:opacity-100'}`}
                title="English (US)"
              >
                <span className="text-xl leading-none">🇺🇸</span>
              </button>
              <button 
                onClick={() => setLanguage('pt')}
                className={`p-1.5 rounded-md transition-all ${language === 'pt' ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-50 hover:opacity-100'}`}
                title="Português (Brasil)"
              >
                 <span className="text-xl leading-none">🇧🇷</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        {renderContent()}
      </main>

      <footer className="py-6 text-center text-slate-400 text-xs border-t border-slate-200 bg-slate-50">
        <p>© {new Date().getFullYear()} LexGuard AI. Created by <span className="font-semibold text-slate-500">Luciano Stringheti Silva de Almeida</span>.</p>
      </footer>
    </div>
  );
}