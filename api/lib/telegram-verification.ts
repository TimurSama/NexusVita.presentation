import crypto from 'crypto';

/**
 * Верифицирует init_data от Telegram Web App
 * @param initData - строка init_data от Telegram
 * @param botToken - токен бота
 * @returns true если подпись валидна, false иначе
 */
export function verifyTelegramWebAppData(initData: string, botToken: string): boolean {
  try {
    // Парсим init_data
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return false;
    }

    // Удаляем hash из параметров для проверки
    urlParams.delete('hash');

    // Сортируем параметры по ключу
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Создаем секретный ключ
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Вычисляем подпись
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Сравниваем подписи
    return calculatedHash === hash;
  } catch (error) {
    console.error('Error verifying Telegram Web App data:', error);
    return false;
  }
}

/**
 * Проверяет, не истекло ли время auth_date (не старше 24 часов)
 * @param initData - строка init_data от Telegram
 * @returns true если время валидно, false иначе
 */
export function isAuthDateValid(initData: string): boolean {
  try {
    const urlParams = new URLSearchParams(initData);
    const authDate = urlParams.get('auth_date');
    
    if (!authDate) {
      return false;
    }

    const authTimestamp = parseInt(authDate, 10);
    const now = Math.floor(Date.now() / 1000);
    const maxAge = 24 * 60 * 60; // 24 часа в секундах

    return (now - authTimestamp) < maxAge;
  } catch (error) {
    console.error('Error checking auth_date:', error);
    return false;
  }
}

/**
 * Полная верификация init_data от Telegram Web App
 * @param initData - строка init_data от Telegram
 * @param botToken - токен бота
 * @returns объект с результатом верификации
 */
export function verifyTelegramInitData(initData: string, botToken: string): {
  valid: boolean;
  error?: string;
  user?: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  };
} {
  if (!initData) {
    return { valid: false, error: 'init_data is required' };
  }

  if (!botToken) {
    return { valid: false, error: 'botToken is required' };
  }

  // Проверяем подпись
  if (!verifyTelegramWebAppData(initData, botToken)) {
    return { valid: false, error: 'Invalid signature' };
  }

  // Проверяем время
  if (!isAuthDateValid(initData)) {
    return { valid: false, error: 'Auth date expired' };
  }

  // Извлекаем данные пользователя
  try {
    const urlParams = new URLSearchParams(initData);
    const userStr = urlParams.get('user');
    
    if (!userStr) {
      return { valid: false, error: 'User data not found' };
    }

    const user = JSON.parse(userStr);
    
    return {
      valid: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      },
    };
  } catch (error) {
    return { valid: false, error: 'Failed to parse user data' };
  }
}
