import React, { useState } from 'react';

const DocumentsTab = ({ documents = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Document library</h2>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 py-3 pl-10 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-3.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 py-10 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-zinc-500 dark:text-zinc-400">No documents found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const DocumentCard = ({ document }) => {
  const getIconColor = (type) => {
    switch(type.toUpperCase()) {
      case 'PDF':
        return 'bg-red-100 text-red-600';
      case 'DOC':
      case 'DOCX':
        return 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300';
      case 'XLS':
      case 'XLSX':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="p-5">
        <div className="mb-4 flex items-center">
          <div className={`mr-4 flex-shrink-0 rounded-xl p-3 ${getIconColor(document.type)}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{document.title}</h3>
            <div className="mt-1 flex items-center">
              <span className="mr-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {document.type}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{document.size}</span>
            </div>
          </div>
        </div>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Added on {document.date}</p>
        <div className="flex justify-between">
          <button type="button" className="text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400">
            View
          </button>
          <button type="button" className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab; 