# 🔗 Инструкция по встраиванию EthoLife в модальное окно

## Что сделано

Заголовок `X-Frame-Options: DENY` заменён на `Content-Security-Policy: frame-ancestors 'self' https://foxampy.vercel.app` — это позволяет открывать приложение в iframe на любых HTTPS-сайтах.

## Как встроить на свой сайт

### 1. HTML код для модального окна

```html
<!-- Кнопка открытия -->
<button onclick="openEthoLifeModal()">Открыть EthoLife</button>

<!-- Модальное окно с iframe -->
<div id="etholife-modal" style="
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  z-index: 10000;
">
  <div style="
    position: relative;
    width: 90%;
    height: 90%;
    max-width: 1200px;
    margin: 2% auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
  ">
    <!-- Кнопка закрытия -->
    <button onclick="closeEthoLifeModal()" style="
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10001;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 18px;
    ">×</button>
    
    <!-- Iframe с EthoLife -->
    <iframe 
      id="etholife-iframe"
      src="https://your-etholife-domain.vercel.app"
      style="width: 100%; height: 100%; border: none;"
      allow="fullscreen"
    ></iframe>
  </div>
</div>

<script>
  function openEthoLifeModal() {
    document.getElementById('etholife-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
  }
  
  function closeEthoLifeModal() {
    document.getElementById('etholife-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    
    // Опционально: перезагружаем iframe при закрытии
    const iframe = document.getElementById('etholife-iframe');
    iframe.src = iframe.src;
  }
  
  // Закрытие по клику на фон
  document.getElementById('etholife-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeEthoLifeModal();
    }
  });
  
  // Закрытие по Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeEthoLifeModal();
    }
  });
</script>
```

### 2. React компонент

```jsx
import { useState, useEffect } from 'react';

export function EthoLifeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[90vh] bg-white rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-red-500 text-white 
                     rounded-full hover:bg-red-600 transition-colors"
        >
          ×
        </button>
        
        <iframe
          src="https://your-etholife-domain.vercel.app"
          className="w-full h-full border-0"
          allow="fullscreen"
          title="EthoLife"
        />
      </div>
    </div>
  );
}
```

### 3. Ограничить только определённые домены (опционально)

Если нужно разрешить только конкретный домен (например, только ваш профильный сайт), измените в `vercel.json`:

```json
{
  "key": "Content-Security-Policy",
  "value": "frame-ancestors 'self' https://your-profile-site.com"
}
```

Или несколько доменов:

```json
{
  "key": "Content-Security-Policy",
  "value": "frame-ancestors 'self' https://site1.com https://site2.com"
}
```

## Деплой

После изменений в `vercel.json`:

```bash
git add vercel.json
git commit -m "feat: allow iframe embedding"
git push
```

Vercel автоматически применит новые заголовки после деплоя.

## Проверка

1. Откройте ваш профильный сайт
2. Нажмите кнопку открытия модалки
3. EthoLife должен загрузиться в iframe

Если не работает — проверьте в DevTools → Network → заголовки ответа должны содержать:
```
Content-Security-Policy: frame-ancestors 'self' https:
```

И не должно быть `X-Frame-Options: DENY`
