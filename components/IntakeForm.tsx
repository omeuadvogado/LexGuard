import React from 'react';
import { IntakeData, Language } from '../types';
import { TRANSLATIONS, getQuestions } from '../constants';
import { ArrowRight } from 'lucide-react';

interface IntakeFormProps {
  data: IntakeData;
  onChange: (field: keyof IntakeData, value: string | boolean) => void;
  onNext: () => void;
  lang: Language;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ data, onChange, onNext, lang }) => {
  const isFormValid = data.purpose && data.representation && data.contractType;
  const t = TRANSLATIONS[lang].app;
  const questions = getQuestions(lang);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-blue-900 p-6 text-white">
        <h2 className="text-2xl font-bold">{t.contextTitle}</h2>
        <p className="text-blue-200 mt-2 text-sm">
          {t.contextDesc}
        </p>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((q) => (
            <div key={q.id} className="col-span-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {q.label}
              </label>
              <textarea
                value={(data as any)[q.id]}
                onChange={(e) => onChange(q.id as keyof IntakeData, e.target.value)}
                placeholder={q.placeholder}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm resize-none h-24"
              />
              <p className="text-xs text-slate-400 mt-1">{q.help}</p>
            </div>
          ))}

          {/* Special case for checkbox */}
          <div className="col-span-1 md:col-span-2 bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <label className="text-sm font-bold text-slate-800">
                {t.ddLabel}
              </label>
              <p className="text-xs text-slate-500">
                {t.ddDesc}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={data.dueDiligence} 
                onChange={(e) => onChange('dueDiligence', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-200'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{t.continueBtn}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};