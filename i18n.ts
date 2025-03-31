import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './i18n/request';

export default getRequestConfig(async ({locale = defaultLocale}) => ({
  locale,
  messages: (await import(`./messages/${locale}.json`)).default
}));