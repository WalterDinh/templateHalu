import I18n from 'react-native-i18n';
import en from './en';
import vn from './vn';
import { LANGUAGE_ENGLISH, LANGUAGE_VIETNAM } from '../Const';

I18n.fallbacks = true;
I18n.translations = { en, vn };
I18n.locale = LANGUAGE_ENGLISH;

export default I18n;
