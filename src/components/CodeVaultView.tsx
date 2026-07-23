import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FileText, Smartphone, Server, Database, BookOpen } from 'lucide-react';
import { ANDROID_FLASK_CODEBASE } from '../data/androidSourceCode';

export const CodeVaultView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(ANDROID_FLASK_CODEBASE[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'README', 'Android App', 'Flask Backend', 'Database Schema'];

  const filteredFiles = categoryFilter === 'All'
    ? ANDROID_FLASK_CODEBASE
    : ANDROID_FLASK_CODEBASE.filter(f => f.category === categoryFilter);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.path.split('/').pop() || 'code.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-secondary text-on-secondary shadow-sm">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark">
              Android Studio Java & Python Flask Source Vault
            </h1>
            <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
              Complete, production-grade Android Java MVVM codebase, Retrofit REST interfaces, Room DB, Python Flask API, and setup guide.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadFile}
          className="px-4 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs hover:bg-primary-dark transition-all flex items-center gap-2 shadow-xs w-fit"
        >
          <Download className="w-4 h-4" />
          <span>Download Current File</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark hover:bg-surface-variant-light/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Split Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Tree Sidebar */}
        <div className="rounded-3xl p-4 bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark space-y-2 max-h-96 overflow-y-auto">
          <span className="text-[10px] font-bold uppercase text-on-surface-variant-light px-2 block mb-1">
            Project Files ({filteredFiles.length})
          </span>

          <div className="space-y-1">
            {filteredFiles.map((file, idx) => {
              const isSelected = selectedFile.path === file.path;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                      : 'text-on-surface-light dark:text-on-surface-dark hover:bg-surface-variant-light/60 dark:hover:bg-surface-variant-dark/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    {file.category === 'Android App' && <Smartphone className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                    {file.category === 'Flask Backend' && <Server className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    {file.category === 'Database Schema' && <Database className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    {file.category === 'README' && <BookOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />}
                    <span className="truncate">{file.path}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Viewer Panel */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-outline-light dark:border-outline-dark bg-slate-900 text-slate-100 shadow-md flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs font-bold text-white">{selectedFile.path}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-700 text-[10px] font-semibold text-slate-300">
                {selectedFile.language.toUpperCase()}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Description banner */}
          <div className="px-4 py-2 bg-slate-800/50 text-[11px] text-slate-400 border-b border-slate-800">
            {selectedFile.description}
          </div>

          {/* Code Text Content */}
          <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-300 max-h-[480px]">
            <pre>{selectedFile.content}</pre>
          </div>

        </div>

      </div>

    </div>
  );
};
