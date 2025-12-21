
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button.tsx';

interface LegalViewProps {
  content: { title: string; content: string };
  onBack: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ content, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-8 pl-0 hover:bg-transparent hover:text-forest-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
        </Button>
        
        <h1 className="text-4xl md:text-5xl font-serif text-forest-950 mb-12">{content.title}</h1>
        
        <div 
          className="prose prose-forest prose-lg max-w-none text-forest-900/80 font-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </div>
  );
};
