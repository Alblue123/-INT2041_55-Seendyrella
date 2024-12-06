"use client";
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary(''); 
    try {
      const response = await fetch('https://059d-35-233-205-201.ngrok-free.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          ratio: 0.2, // chỉnh tỉ lệ tóm tắt
        }),
      });
      const data = await response.json();
      
      console.log('Summary:', data.summary);
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing:', error);
      setSummary('Error summarizing text. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
    <h1 className="text-xl font-bold">BERT Extractive Summarizer</h1>
    <textarea
      className="w-full border p-2 mt-4"
      rows={10}
      placeholder="Enter text to summarize..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    ></textarea>
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={handleSummarize}
      disabled={loading}
    >
      {loading ? 'Summarizing...' : 'Summarize'}
    </button>
    {/* Hiển thị kết quả tóm tắt trong một textarea */}
    {summary && (
        <div className="mt-4">
          <h2 className="font-semibold">Summary:</h2>
          <textarea
            className="w-full border p-2 mt-2"
            rows={8}
            value={summary} // Hiển thị nội dung tóm tắt
            readOnly // Chỉ đọc, không cho phép sửa
          ></textarea>
        </div>
      )}
  </div>
  );
}