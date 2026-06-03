import React from 'react';
import { Saber } from '../types';
import { Search, ArrowRight } from 'lucide-react';

interface SearchResultsProps {
  saberes: Saber[];
  query: string;
  onSelectSaber: (id: string) => void;
  onClear: () => void;
}

export default function SearchResults({ saberes, query, onSelectSaber, onClear }: SearchResultsProps) {
  const q = query.trim().toLowerCase();

  const matches = saberes.filter(s => {
    const fields = [
      s.title || '',
      s.summary || '',
      s.saberCentralText || '',
      s.community?.name || ''
    ];
    // also search relations' content and author names
    if (s.relations && s.relations.length) {
      fields.push(...s.relations.map(r => `${r.author} ${r.content}`));
    }
    return fields.join(' ').toLowerCase().includes(q);
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-mineral-gray/70" />
          <h3 className="font-serif text-2xl font-bold">Resultados da busca</h3>
          <span className="font-mono text-sm text-mineral-gray/70">{matches.length} resultado{matches.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClear} className="text-sm text-on-surface-variant hover:underline">Limpar</button>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="p-8 bg-surface-container-low border border-mineral-gray/20 rounded-2xl text-center">
          <p className="font-sans text-sm text-mineral-gray/70">Nenhum resultado encontrado para "{query}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map(s => (
            <article key={s.id} className="bg-surface-container p-5 rounded-2xl border border-outline/20 hover:shadow-md transition-all cursor-pointer" onClick={() => onSelectSaber(s.id)}>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-on-surface mb-1">{s.title}</h4>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-3">{s.summary}</p>
                  <div className="text-xs font-mono text-mineral-gray/70">Comunidade: {s.community?.name || '—'}</div>
                </div>
                <div className="flex items-center text-mineral-gray/60">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
