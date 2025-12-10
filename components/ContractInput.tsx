import React, { useState } from 'react';
import { ArrowRight, FileText, ChevronLeft, Upload, Loader2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { extractTextFromPDF } from '../services/pdfService';

interface ContractInputProps {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  onBack: () => void;
  lang: Language;
}

export const ContractInput: React.FC<ContractInputProps> = ({ value, onChange, onAnalyze, onBack, lang }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const t = TRANSLATIONS[lang].app;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    setLoadingFile(true);
    try {
      let text = '';
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        text = await extractTextFromPDF(file);
      } else if (file.type === "text/plain" || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        alert(lang === 'en' ? "Please upload a .pdf, .txt, or .md file." : "Por favor envie um arquivo .pdf, .txt ou .md.");
        setLoadingFile(false);
        return;
      }
      
      if (text.trim().length > 0) {
        onChange(text);
      } else {
         alert(lang === 'en' ? "Could not extract text from this file. It might be empty or a scanned image." : "Não foi possível extrair texto deste arquivo. Pode estar vazio ou ser uma imagem digitalizada.");
      }
    } catch (error) {
      console.error(error);
      alert(lang === 'en' ? "Error reading file." : "Erro ao ler o arquivo.");
    } finally {
      setLoadingFile(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          await processFile(e.target.files[0]);
      }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-[80vh]">
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center shrink-0">
        <div>
            <h2 className="text-2xl font-bold">{t.uploadTitle}</h2>
            <p className="text-slate-300 mt-1 text-sm">
            {t.uploadDesc}
            </p>
        </div>
        <FileText className="text-slate-400 opacity-20" size={40} />
      </div>

      <div className="flex-1 p-6 flex flex-col min-h-0">
        <div 
            className={`relative flex-1 rounded-xl border-2 transition-all flex flex-col ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t.uploadDesc}
                disabled={loadingFile}
                className="w-full h-full p-6 bg-transparent border-none outline-none resize-none font-mono text-sm text-slate-700 disabled:opacity-50"
            />
            
            {value.length === 0 && !loadingFile && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
                    <Upload size={48} className="mb-4 text-slate-400"/>
                    <p className="text-lg font-medium text-slate-500">{t.dragDrop}</p>
                    <p className="text-sm text-slate-400">{t.orPaste}</p>
                </div>
            )}

            {loadingFile && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
                  <Loader2 size={48} className="mb-4 text-blue-600 animate-spin"/>
                  <p className="text-blue-600 font-medium">Processing file...</p>
               </div>
            )}
        </div>

        <div className="mt-4 flex items-center justify-between shrink-0">
            <input 
                type="file" 
                accept=".txt,.md,.pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                w-auto
              "
            />
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
                {t.supportedFiles}
            </span>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 flex justify-between shrink-0 bg-white">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={18} />
          <span>{t.backBtn}</span>
        </button>
        
        <button
          onClick={onAnalyze}
          disabled={value.length < 50 || loadingFile}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all ${
            value.length >= 50 && !loadingFile
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>{t.analyzeBtn}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};