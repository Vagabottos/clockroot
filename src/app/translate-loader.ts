import {
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core';

import { Observable, of } from 'rxjs';

import * as enUS from '../assets/i18n/en-US.json';
import * as frFR from '../assets/i18n/fr-FR.json';
import * as esES from '../assets/i18n/es-ES.json';
import * as deDE from '../assets/i18n/de-DE.json';
import * as jaJP from '../assets/i18n/ja-JP.json';
import * as koKR from '../assets/i18n/ko-KR.json';
import * as nlNL from '../assets/i18n/nl-NL.json';
import * as plPL from '../assets/i18n/pl-PL.json';
import * as ptBR from '../assets/i18n/pt-BR.json';
import * as ruRU from '../assets/i18n/ru-RU.json';
import * as zhCN from '../assets/i18n/zh-CN.json';

interface JsonModule {
  default?: unknown;
}
const getJsonContent = (module: any): Object => {
  const candidate = module as JsonModule;
  return candidate.default ?? module;
};

export const LANGUAGES: Record<string, Object> = {
  'en-US': getJsonContent(enUS),
  'fr-FR': getJsonContent(frFR),
  'es-ES': getJsonContent(esES),
  'de-DE': getJsonContent(deDE),
  'ja-JP': getJsonContent(jaJP),
  'ko-KR': getJsonContent(koKR),
  'nl-NL': getJsonContent(nlNL),
  'pl-PL': getJsonContent(plPL),
  'pt-BR': getJsonContent(ptBR),
  'ru-RU': getJsonContent(ruRU),
  'zh-CN': getJsonContent(zhCN),
};

export class JSONLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    return of((LANGUAGES[lang] || enUS) as TranslationObject);
  }
}
