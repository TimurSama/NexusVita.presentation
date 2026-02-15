// Telegram Web App utilities

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
          };
          auth_date: number;
          hash: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        openInvoice: (url: string, callback?: (status: string) => void) => void;
        showPopup: (params: { title?: string; message: string; buttons?: Array<{ id?: string; type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text: string }> }, callback?: (id: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        showScanQrPopup: (params: { text?: string }, callback?: (data: string) => void) => void;
        closeScanQrPopup: () => void;
        readTextFromClipboard: (callback?: (text: string) => void) => void;
        requestWriteAccess: (callback?: (granted: boolean) => void) => void;
        requestContact: (callback?: (granted: boolean) => void) => void;
        ready: () => void;
      };
    };
  }
}

export function isTelegramWebApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if Telegram Web App is available
  const hasTelegram = !!window.Telegram;
  const hasWebApp = !!window.Telegram?.WebApp;
  
  // Also check for Telegram-specific query parameters
  const hasTelegramParams = window.location.search.includes('tgWebApp') || 
                            window.location.hash.includes('tgWebApp');
  
  return hasTelegram && hasWebApp;
}

export function getTelegramUser() {
  if (!isTelegramWebApp()) return null;
  
  try {
    const user = window.Telegram!.WebApp.initDataUnsafe?.user;
    if (user && user.id) {
      return user;
    }
  } catch (error) {
    console.error('Error getting Telegram user:', error);
  }
  
  return null;
}

export function getTelegramInitData() {
  if (!isTelegramWebApp()) return null;
  return window.Telegram!.WebApp.initData;
}

export function initializeTelegramWebApp() {
  if (!isTelegramWebApp()) return;
  
  const tg = window.Telegram!.WebApp;
  
  // Initialize Web App
  tg.ready();
  
  // Expand to full height
  tg.expand();
  
  // Set theme colors
  if (tg.themeParams.bg_color) {
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color);
  }
  if (tg.themeParams.text_color) {
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color);
  }
  
  return tg;
}

export async function authenticateWithTelegram() {
  if (!isTelegramWebApp()) {
    return { success: false, error: 'Not in Telegram Web App' };
  }

  const user = getTelegramUser();
  const initData = getTelegramInitData();

  if (!user || !initData) {
    return { success: false, error: 'No user data available' };
  }

  try {
    const response = await fetch('/api/auth/telegram-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telegram_id: user.id,
        telegram_username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        init_data: initData,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Telegram auth error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

export function getInviteLink(userId: number): string {
  // Generate invite link for user
  const baseUrl = window.location.origin;
  return `${baseUrl}/?ref=${userId}`;
}

export function shareInviteLink(userId: number) {
  if (!isTelegramWebApp()) {
    // Fallback for non-Telegram environment
    const link = getInviteLink(userId);
    if (navigator.share) {
      navigator.share({
        title: 'Присоединяйтесь к EthosLife',
        text: 'Присоединяйтесь к платформе здоровья EthosLife',
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
      alert('Ссылка скопирована в буфер обмена!');
    }
    return;
  }

  const tg = window.Telegram!.WebApp;
  const link = getInviteLink(userId);
  
  tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Присоединяйтесь к EthosLife - платформе здоровья!')}`);
}
