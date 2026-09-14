import { SupportedLanguage } from './types';

export interface TelemetryStrings {
  dew_point: string;
  atm_pressure: string;
  steady_trend: string;
  clear_horizon: string;
  synoptic_hubs: string;
  doppler_radar: string;
  hide_radar: string;
  photo_weather: string;
  drop_sky: string;
  analyze_photo: string;
  precip_rate: string;
  wind_gusts: string;
  atmospheric_moisture: string;
  operational_safety: string;
  ask_weathergpt: string;
  query_btn: string;
  diurnal_forecast: string;
  solar_uv: string;
}

const TELEMETRY_TRANSLATIONS: Record<SupportedLanguage, TelemetryStrings> = {
  en: {
    dew_point: "Dew Point",
    atm_pressure: "Barometer",
    steady_trend: "Steady Trend",
    clear_horizon: "Clear Horizon",
    synoptic_hubs: "Synoptic Hubs",
    doppler_radar: "Doppler Radar",
    hide_radar: "Hide Radar",
    photo_weather: "Photo Weather AI",
    drop_sky: "Drop Sky Snapshot Here",
    analyze_photo: "Analyze a Photo",
    precip_rate: "Precipitation Rate",
    wind_gusts: "Wind Gusts & Shear",
    atmospheric_moisture: "Atmospheric Moisture",
    operational_safety: "Operational Safety Index",
    ask_weathergpt: "Ask WeatherGPT",
    query_btn: "Query",
    diurnal_forecast: "Hourly Consensus Interpolation",
    solar_uv: "Solar UV"
  },
  hi: {
    dew_point: "ओस बिंदु",
    atm_pressure: "वायुदाब (बैरोमीटर)",
    steady_trend: "स्थिर रुझान",
    clear_horizon: "स्पष्ट क्षितिज",
    synoptic_hubs: "प्रमुख मौसम केंद्र",
    doppler_radar: "डॉप्लर रडार",
    hide_radar: "रडार छुपाएं",
    photo_weather: "फोटो मौसम AI",
    drop_sky: "यहाँ आकाश की तस्वीर डालें",
    analyze_photo: "तस्वीर का विश्लेषण करें",
    precip_rate: "वर्षा की दर",
    wind_gusts: "हवा के झोंके व दबाव",
    atmospheric_moisture: "वायुमंडलीय नमी",
    operational_safety: "संचालन सुरक्षा सूचकांक",
    ask_weathergpt: "WeatherGPT से पूछें",
    query_btn: "पूछें",
    diurnal_forecast: "प्रति घंटा मौसम अनुमान",
    solar_uv: "सौर यूवी"
  },
  mr: {
    dew_point: "दवबिंदू",
    atm_pressure: "वातावरणीय दाब",
    steady_trend: "स्थिर कल",
    clear_horizon: "स्पष्ट क्षितीज",
    synoptic_hubs: "प्रमुख हवामान केंद्रे",
    doppler_radar: "डॉप्लर रडार",
    hide_radar: "रडार लपवा",
    photo_weather: "फोटो हवामान AI",
    drop_sky: "येथे आकाशाचा फोटो टाका",
    analyze_photo: "फोटोचे विश्लेषण करा",
    precip_rate: "पावसाचे प्रमाण",
    wind_gusts: "वाऱ्याचा वेग व झोत",
    atmospheric_moisture: "वातावरणातील आर्द्रता",
    operational_safety: "कामकाज सुरक्षा निर्देशांक",
    ask_weathergpt: "WeatherGPT ला विचारा",
    query_btn: "विचारा",
    diurnal_forecast: "तासनिहाय हवामान अंदाज",
    solar_uv: "सौर अतिनील (UV)"
  },
  ta: {
    dew_point: "பனி நிலை",
    atm_pressure: "காற்றழுத்தமானி",
    steady_trend: "நிலையான போக்கு",
    clear_horizon: "தெளிவான எல்லை",
    synoptic_hubs: "வானிலை மையங்கள்",
    doppler_radar: "டாப்ளர் ரேடார்",
    hide_radar: "ரேடாரை மறை",
    photo_weather: "புகைப்பட வானிலை AI",
    drop_sky: "வானத்தின் புகைப்படத்தை இங்கே வைக்கவும்",
    analyze_photo: "புகைப்படத்தை ஆராய்க",
    precip_rate: "மழை வீதம்",
    wind_gusts: "காற்று வீச்சு & வேகம்",
    atmospheric_moisture: "வளிமண்டல ஈரப்பதம்",
    operational_safety: "பாதுகாப்பு குறியீடு",
    ask_weathergpt: "WeatherGPT-யிடம் கேட்கவும்",
    query_btn: "கேள்வி",
    diurnal_forecast: "மணிநேர வானிலை முன்னறிவிப்பு",
    solar_uv: "சூரிய புற ஊதா (UV)"
  },
  te: {
    dew_point: "మంచు బిందువు",
    atm_pressure: "వాయుపీడనం",
    steady_trend: "స్థిరమైన ధోరణి",
    clear_horizon: "స్పష్టమైన క్షితిజం",
    synoptic_hubs: "వాతావరణ కేంద్రాలు",
    doppler_radar: "డాప్లర్ రాడార్",
    hide_radar: "రాడార్ దాచు",
    photo_weather: "ఫోటో వాతావరణ AI",
    drop_sky: "ఆకాశం ఫోటో ఇక్కడ వేయండి",
    analyze_photo: "ఫోటో విశ్లేషించండి",
    precip_rate: "వర్షపాతం రేటు",
    wind_gusts: "గాలుల తీవ్రత & వేగం",
    atmospheric_moisture: "వాతావరణ తేమ",
    operational_safety: "కార్యాచరణ భద్రతా సూచిక",
    ask_weathergpt: "WeatherGPT ని అడగండి",
    query_btn: "అడగండి",
    diurnal_forecast: "గంటల వారీ వాతావరణ అంచనా",
    solar_uv: "సౌర యూవీ"
  },
  bn: {
    dew_point: "শিশিরাঙ্ক",
    atm_pressure: "বায়ুচাপ",
    steady_trend: "স্থিতিশীল প্রবণতা",
    clear_horizon: "পরিষ্কার দিগন্ত",
    synoptic_hubs: "আবহাওয়া কেন্দ্রসমূহ",
    doppler_radar: "ডপলার রাডার",
    hide_radar: "রাডার লুকান",
    photo_weather: "ফটো আবহাওয়া AI",
    drop_sky: "এখানে আকাশের ছবি ড্রপ করুন",
    analyze_photo: "ছবি বিশ্লেষণ করুন",
    precip_rate: "বৃষ্টির হার",
    wind_gusts: "বাতাসের ঝাপটা ও গতি",
    atmospheric_moisture: "বায়ুমণ্ডলীয় আর্দ্রতা",
    operational_safety: "কর্মক্ষম নিরাপত্তা সূচক",
    ask_weathergpt: "WeatherGPT কে জিজ্ঞাসা করুন",
    query_btn: "জানুন",
    diurnal_forecast: "ঘণ্টাভিত্তিক আবহাওয়া পূর্বাভাস",
    solar_uv: "সৌর অতিবেগুনী"
  },
  gu: {
    dew_point: "ઝાકળ બિંદુ",
    atm_pressure: "વાયુમંડળ દબાણ",
    steady_trend: "સ્થિર વલણ",
    clear_horizon: "સ્પષ્ટ ક્ષિતિજ",
    synoptic_hubs: "હવામાન કેન્દ્રો",
    doppler_radar: "ડોપ્લર રડાર",
    hide_radar: "રડાર છુપાવો",
    photo_weather: "ફોટો હવામાન AI",
    drop_sky: "અહીં આકાશનો ફોટો મૂકો",
    analyze_photo: "ફોટો વિશ્લેષણ કરો",
    precip_rate: "વરસાદનો દર",
    wind_gusts: "ઝડપી પવનના ઝાપટાં",
    atmospheric_moisture: "વાતાવરણની ભેજ",
    operational_safety: "કાર્યકારી સુરક્ષા સૂચકાંક",
    ask_weathergpt: "WeatherGPT ને પૂછો",
    query_btn: "પૂછો",
    diurnal_forecast: "કલાક મુજબ હવામાન અનુમાન",
    solar_uv: "સૌર યુવી"
  },
  kn: {
    dew_point: "ಇಬ್ಬನಿ ಬಿಂದು",
    atm_pressure: "ವಾಯುಭಾರ",
    steady_trend: "ಸ್ಥಿರ ಪ್ರವೃತ್ತಿ",
    clear_horizon: "ಸ್ಪಷ್ಟ ದಿಗಂತ",
    synoptic_hubs: "ಹವಾಮಾನ ಕೇಂದ್ರಗಳು",
    doppler_radar: "ಡಾಪ್ಲರ್ ರೇಡಾರ್",
    hide_radar: "ರೇಡಾರ್ ಮರೆಮಾಡಿ",
    photo_weather: "ಫೋಟೋ ಹವಾಮಾನ AI",
    drop_sky: "ಇಲ್ಲಿ ಆಕಾಶದ ಫೋಟೋ ಹಾಕಿ",
    analyze_photo: "ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಿ",
    precip_rate: "ಮಳೆಯ ದರ",
    wind_gusts: "ಗಾಳಿಯ ವೇಗ ಮತ್ತು ಬೀಸುವಿಕೆ",
    atmospheric_moisture: "ವಾತಾವರಣದ ತೇವಾಂಶ",
    operational_safety: "ಕಾರ್ಯಾಚರಣೆ ಸುರಕ್ಷತಾ ಸೂಚ್ಯಂಕ",
    ask_weathergpt: "WeatherGPT ಯನ್ನು ಕೇಳಿ",
    query_btn: "ಕೇಳಿ",
    diurnal_forecast: "ಗಂಟೆವಾರು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    solar_uv: "ಸೌರ ಯುವಿ"
  },
  ml: {
    dew_point: "തുഷാര ബിന്ദു",
    atm_pressure: "വായുമർദ്ദം",
    steady_trend: "സ്ഥിരമായ പ്രവണത",
    clear_horizon: "വ്യക്തമായ ചക്രവാളം",
    synoptic_hubs: "കാലാവസ്ഥാ കേന്ദ്രങ്ങൾ",
    doppler_radar: "ഡോപ്ലർ റഡാർ",
    hide_radar: "റഡാർ മറയ്ക്കുക",
    photo_weather: "ഫോട്ടോ കാലാവസ്ഥ AI",
    drop_sky: "ഇവിടെ ആകാശ ഫോട്ടോ നൽകുക",
    analyze_photo: "ഫോട്ടോ വിശകലനം ചെയ്യുക",
    precip_rate: "മഴ നിരക്ക്",
    wind_gusts: "ശക്തമായ കാറ്റും വീശലും",
    atmospheric_moisture: "വായുമണ്ഡല ഈർപ്പം",
    operational_safety: "സുരക്ഷാ സൂചിക",
    ask_weathergpt: "WeatherGPT യോട് ചോദിക്കുക",
    query_btn: "ചോദിക്കുക",
    diurnal_forecast: "മണിക്കൂർ തിരിച്ചുള്ള പ്രവചനം",
    solar_uv: "സൗര അൾട്രാവയലറ്റ്"
  },
  pa: {
    dew_point: "ਤਰੇਲ ਬਿੰਦੂ",
    atm_pressure: "ਵਾਯੂਮੰਡਲ ਦਬਾਅ",
    steady_trend: "ਸਥਿਰ ਰੁਝਾਨ",
    clear_horizon: "ਸਾਫ਼ ਦਿਸਹੱਦਾ",
    synoptic_hubs: "ਮੌਸਮ ਕੇਂਦਰ",
    doppler_radar: "ਡੌਪਲਰ ਰਡਾਰ",
    hide_radar: "ਰਡਾਰ ਲੁਕਾਓ",
    photo_weather: "ਫੋਟੋ ਮੌਸਮ AI",
    drop_sky: "ਇੱਥੇ ਅਸਮਾਨ ਦੀ ਫੋਟੋ ਪਾਓ",
    analyze_photo: "ਫੋਟੋ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    precip_rate: "ਮੀਂਹ ਦੀ ਦਰ",
    wind_gusts: "ਤੇਜ਼ ਹਵਾ ਦੇ ਝੱਖੜ",
    atmospheric_moisture: "ਵਾਯੂਮੰਡਲ ਨਮੀ",
    operational_safety: "ਸੰਚਾਲਨ ਸੁਰੱਖਿਆ ਸੂਚਕਾਂਕ",
    ask_weathergpt: "WeatherGPT ਨੂੰ ਪੁੱਛੋ",
    query_btn: "ਪੁੱਛੋ",
    diurnal_forecast: "ਘੰਟੇਵਾਰ ਮੌਸਮ ਅਨੁਮਾਨ",
    solar_uv: "ਸੂਰਜੀ ਯੂਵੀ"
  }
};

export function getTelemetryStrings(lang: SupportedLanguage): { telemetry: TelemetryStrings } {
  return { telemetry: TELEMETRY_TRANSLATIONS[lang] || TELEMETRY_TRANSLATIONS.en };
}
