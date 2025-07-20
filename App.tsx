
import React, { useState, useCallback } from 'react';
import { generateGreeting } from './services/geminiService';
import Card from './components/Card';
import Input from './components/Input';
import Button from './components/Button';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setGreeting('');

    try {
      const result = await generateGreeting(name);
      setGreeting(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate greeting. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [name, isLoading]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-md mx-auto">
        <Card>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-sky-400 mb-2">AI Greeting Generator</h1>
            <p className="text-slate-400 mb-6">Enter a name and let our AI craft a unique welcome!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Ada Lovelace"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !name.trim()}>
              {isLoading ? <Loader /> : 'Generate Greeting'}
            </Button>
          </form>

          <div className="mt-6 min-h-[100px] bg-slate-800/50 rounded-lg p-4 flex items-center justify-center">
            {isLoading && (
              <p className="text-slate-400">Generating a creative greeting...</p>
            )}
            {error && (
              <p className="text-red-400 text-center">{error}</p>
            )}
            {greeting && (
              <p className="text-sky-300 text-center text-lg animate-fade-in">{greeting}</p>
            )}
            {!isLoading && !error && !greeting && (
               <p className="text-slate-500 text-center">Your personalized greeting will appear here.</p>
            )}
          </div>
        </Card>
      </main>
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        Powered by React, Tailwind CSS, and Google Gemini
      </footer>
    </div>
  );
};

export default App;
