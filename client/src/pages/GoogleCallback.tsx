import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function GoogleCallback() {
  const [, setLocation] = useLocation();
  const { refreshUser } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const errorParam = urlParams.get('error');

      if (errorParam) {
        setStatus('error');
        setError('Отказано в доступе Google');
        return;
      }

      if (!code) {
        setStatus('error');
        setError('Код авторизации не получен');
        return;
      }

      try {
        // Parse state to get redirect URL
        let redirectTo = '/dashboard';
        if (state) {
          try {
            const stateData = JSON.parse(atob(state));
            redirectTo = stateData.redirect || '/dashboard';
          } catch (e) {
            console.warn('Failed to parse state:', e);
          }
        }

        // Send code to backend
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, redirectUri: window.location.origin + '/auth/callback' }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('userId', data.user.id.toString());
          await refreshUser();
          setStatus('success');
          setTimeout(() => {
            setLocation(redirectTo);
          }, 1500);
        } else {
          const errorData = await response.json();
          setStatus('error');
          setError(errorData.error || 'Ошибка авторизации');
        }
      } catch (err) {
        setStatus('error');
        setError('Ошибка подключения к серверу');
      }
    };

    handleGoogleCallback();
  }, [setLocation, refreshUser]);

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Успешный вход!</h2>
          <p className="text-slate-600">Перенаправляем...</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Ошибка входа</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => setLocation('/login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Вернуться к входу
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900">Вход через Google...</h2>
        <p className="text-slate-600 mt-2">Пожалуйста, подождите</p>
      </motion.div>
    </div>
  );
}
