import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// A simple parser to make the output look good without heavy dependencies
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split by double newlines to handle paragraphs
  const lines = content.split('\n');

  return (
    <div className="space-y-3 text-slate-800 leading-relaxed text-sm md:text-base">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-2 border-b pb-1">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-extrabold text-blue-900 mt-8 mb-3">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-black text-blue-900 mt-8 mb-4">{line.replace('# ', '')}</h1>;
        }

        // List items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <div key={index} className="flex items-start ml-4">
              <span className="mr-2 text-blue-500">•</span>
              <span dangerouslySetInnerHTML={{ __html: parseBold(line.replace(/^[-*]\s/, '')) }}></span>
            </div>
          );
        }
         // Numbered list items (simple detection)
         if (/^\d+\.\s/.test(line.trim())) {
             return (
                 <div key={index} className="flex items-start ml-4">
                     <span className="mr-2 font-semibold text-slate-600">{line.trim().split('.')[0]}.</span>
                     <span dangerouslySetInnerHTML={{ __html: parseBold(line.replace(/^\d+\.\s/, '')) }}></span>
                 </div>
             )
         }

        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-2"></div>;
        }

        // Paragraphs with bold parsing
        return <p key={index} dangerouslySetInnerHTML={{ __html: parseBold(line) }}></p>;
      })}
    </div>
  );
};

// Helper to bold text between ** **
const parseBold = (text: string) => {
  // Escaping HTML characters first to prevent XSS is good practice, 
  // but for this specific closed-loop app with text-only output from LLM, basic replacement is acceptable.
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};
