// WeatherGPT Dedicated Modal Localization & Fallback Engine
// Guarantees 100% visible, non-empty labels across all 10 languages for all modal dialogs.

import { SupportedLanguage } from './types';

export interface ModalStrings {
  // Disaster Simulation Modal
  sim_modal_title: string;
  badge_advanced_ai: string;
  sim_modal_sub: string;
  sim_tab_preset: string;
  sim_tab_whatif: string;
  sim_select_scenario: string;
  sim_scenario_rain: string;
  sim_scenario_flood: string;
  sim_scenario_heatwave: string;
  sim_scenario_cyclone: string;
  sim_scenario_thunder: string;
  sim_affected_zones: string;
  sim_ai_rec: string;
  sim_rain_increase: string;
  sim_temp_shift: string;
  sim_wind_surge: string;
  sim_hypo_risk: string;
  sim_hypo_desc: string;
  close_btn: string;

  // Emergency Center Modal
  em_modal_title: string;
  badge_safety_dir: string;
  em_modal_sub: string;
  em_tab_shelters: string;
  em_tab_checklist: string;
  em_tab_contacts: string;
  em_col_capacity: string;
  em_checklist_before: string;
  em_checklist_during: string;
  em_call_now: string;

  // Report Generator Modal
  report_modal_title: string;
  badge_exec_report: string;
  report_modal_sub: string;
  report_type_label: string;
  report_type_daily: string;
  report_type_weekly: string;
  report_type_disaster: string;
  report_generating: string;
  report_generate_btn: string;
  report_summary: string;
  report_recommendations: string;
  report_export_as: string;

  // Climate Insights Modal
  climate_modal_title: string;
  badge_climate_analytics: string;
  climate_modal_sub: string;
  climate_avg_temp: string;
  climate_avg_rain: string;
  climate_anomaly_title: string;
  climate_monthly_avg: string;

  // Auth Modal
  auth_persona_general: string;
  auth_persona_farmer: string;
  auth_persona_traveller: string;
  auth_persona_disaster: string;
  auth_persona_school: string;
  auth_select_persona: string;
  auth_email_label: string;
  auth_email_placeholder: string;
  auth_password_label: string;
  auth_name_label: string;
  auth_name_placeholder: string;
  auth_role_label: string;
  auth_btn_login: string;
  auth_btn_register: string;
}

export const EN_STRINGS: ModalStrings = {
  sim_modal_title: "Disaster Scenario Simulator",
  badge_advanced_ai: "Advanced AI",
  sim_modal_sub: "Real-Time Multi-Hazard Impact Engine",
  sim_tab_preset: "Preset Hazards",
  sim_tab_whatif: "What-If Parameters",
  sim_select_scenario: "Select Hazard Simulation Scenario",
  sim_scenario_rain: "Heavy Rain",
  sim_scenario_flood: "Flash Flood",
  sim_scenario_heatwave: "Heatwave",
  sim_scenario_cyclone: "Cyclone",
  sim_scenario_thunder: "Thunderstorm",
  sim_affected_zones: "Projected Vulnerability Zones",
  sim_ai_rec: "Tactical AI Recommendation",
  sim_rain_increase: "Precipitation Surge",
  sim_temp_shift: "Temperature Delta",
  sim_wind_surge: "Wind Velocity Surge",
  sim_hypo_risk: "Hypothetical Hazard Risk Score",
  sim_hypo_desc: "Dynamic multi-hazard risk modeled on real-time soil saturation, elevation, drainage infrastructure, and wind shear.",
  close_btn: "Close",

  em_modal_title: "Disaster Emergency Hub & Verified Shelters",
  badge_safety_dir: "Safety Directory",
  em_modal_sub: "Local relief infrastructure, verified helplines & protocols",
  em_tab_shelters: "Relief Shelters",
  em_tab_checklist: "Safety Checklist",
  em_tab_contacts: "Emergency Helplines",
  em_col_capacity: "Capacity",
  em_checklist_before: "Before Hazard Strikes (Preparedness)",
  em_checklist_during: "During Hazard Active Phase",
  em_call_now: "Call Now",

  report_modal_title: "Meteorological Intelligence Dossier",
  badge_exec_report: "Executive Report",
  report_modal_sub: "Automated analytical briefing & operational advisories",
  report_type_label: "Select Report Scope",
  report_type_daily: "Daily Briefing",
  report_type_weekly: "7-Day Outlook",
  report_type_disaster: "Disaster Assessment",
  report_generating: "Synthesizing Meteorological Dossier...",
  report_generate_btn: "Generate Comprehensive Dossier",
  report_summary: "Executive Summary",
  report_recommendations: "Operational Recommendations",
  report_export_as: "Export Dossier As",

  climate_modal_title: "Decadal Climate Trend & Insights",
  badge_climate_analytics: "Climate Analytics",
  climate_modal_sub: "Historical meteorological benchmarks & decadal shift",
  climate_avg_temp: "Historical Avg Temp",
  climate_avg_rain: "Annual Rainfall",
  climate_anomaly_title: "Decadal Climate Anomaly",
  climate_monthly_avg: "Monthly Climatology Normals",

  auth_persona_general: "General Public",
  auth_persona_farmer: "🌾 Kisan / Agri",
  auth_persona_traveller: "🚗 Route Safety",
  auth_persona_disaster: "🚨 Disaster Ops",
  auth_persona_school: "🏫 Campus Safety",
  auth_select_persona: "Select Operational Role",
  auth_email_label: "Email Address",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "Password",
  auth_name_label: "Full Name",
  auth_name_placeholder: "E.g. Vikram Sharma",
  auth_role_label: "Operational Role Mode",
  auth_btn_login: "Sign In",
  auth_btn_register: "Create Account"
};

export const HI_STRINGS: ModalStrings = {
  sim_modal_title: "आपदा परिदृश्य सिमुलेटर",
  badge_advanced_ai: "उन्नत एआई",
  sim_modal_sub: "रीयल-टाइम बहु-जोखिम प्रभाव इंजन",
  sim_tab_preset: "पूर्वनिर्धारित जोखिम",
  sim_tab_whatif: "क्या-अगर पैरामीटर",
  sim_select_scenario: "सिमुलेशन हेतु आपदा चुनें",
  sim_scenario_rain: "भारी वर्षा",
  sim_scenario_flood: "फ्लैश फ्लड",
  sim_scenario_heatwave: "हीटवेव / लू",
  sim_scenario_cyclone: "चक्रवात",
  sim_scenario_thunder: "गरज के साथ तूफान",
  sim_affected_zones: "अनुमानित संवेदनशील क्षेत्र",
  sim_ai_rec: "रणनीतिक एआई सलाह",
  sim_rain_increase: "वर्षा में वृद्धि",
  sim_temp_shift: "तापमान परिवर्तन",
  sim_wind_surge: "हवा की गति में वृद्धि",
  sim_hypo_risk: "काल्पनिक आपदा जोखिम स्कोर",
  sim_hypo_desc: "मृदा संतृप्ति, इलाके की ऊंचाई, जल निकासी और हवा की गति पर आधारित रीयल-टाइम मॉडल।",
  close_btn: "बंद करें",

  em_modal_title: "आपदा राहत केंद्र व आश्रय स्थल",
  badge_safety_dir: "सुरक्षा निर्देशिका",
  em_modal_sub: "स्थानीय राहत बुनियादी ढांचा, सत्यापित हेल्पलाइन व सुरक्षा प्रोटोकॉल",
  em_tab_shelters: "राहत आश्रय स्थल",
  em_tab_checklist: "सुरक्षा चेकलिस्ट",
  em_tab_contacts: "आपातकालीन हेल्पलाइन",
  em_col_capacity: "क्षमता",
  em_checklist_before: "आपदा से पहले (तैयारी)",
  em_checklist_during: "आपदा के दौरान (सुरक्षा कदम)",
  em_call_now: "कॉल करें",

  report_modal_title: "मौसम विज्ञान आसूचना रिपोर्ट",
  badge_exec_report: "कार्यकारी रिपोर्ट",
  report_modal_sub: "स्वचालित विश्लेषणात्मक विवरण व परिचालन संबंधी सलाह",
  report_type_label: "रिपोर्ट का प्रकार चुनें",
  report_type_daily: "दैनिक ब्रीफिंग",
  report_type_weekly: "7-दिवसीय दृष्टिकोण",
  report_type_disaster: "आपदा मूल्यांकन",
  report_generating: "रिपोर्ट तैयार हो रही है...",
  report_generate_btn: "विस्तृत रिपोर्ट बनाएं",
  report_summary: "कार्यकारी सारांश",
  report_recommendations: "कार्रवाई योग्य सिफारिशें",
  report_export_as: "रिपोर्ट डाउनलोड करें",

  climate_modal_title: "दशकीय जलवायु रुझान एवं विश्लेषण",
  badge_climate_analytics: "जलवायु विश्लेषण",
  climate_modal_sub: "ऐतिहासिक मौसम संबंधी मानक एवं दशकीय परिवर्तन",
  climate_avg_temp: "ऐतिहासिक औसत तापमान",
  climate_avg_rain: "वार्षिक वर्षा",
  climate_anomaly_title: "दशकीय जलवायु विसंगति",
  climate_monthly_avg: "मासिक सामान्य जलवायु",

  auth_persona_general: "सामान्य नागरिक",
  auth_persona_farmer: "🌾 किसान / कृषि",
  auth_persona_traveller: "🚗 यात्री / हाइवे",
  auth_persona_disaster: "🚨 आपदा प्रबंधन",
  auth_persona_school: "🏫 स्कूल / संस्थान",
  auth_select_persona: "परिचालन भूमिका चुनें",
  auth_email_label: "ईमेल पता",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "पासवर्ड",
  auth_name_label: "पूरा नाम",
  auth_name_placeholder: "जैसे: विक्रम शर्मा",
  auth_role_label: "परिचालन भूमिका",
  auth_btn_login: "साइन इन करें",
  auth_btn_register: "खाता बनाएं"
};

export const MR_STRINGS: ModalStrings = {
  sim_modal_title: "आपत्ती परिस्थिती सिम्युलेटर",
  badge_advanced_ai: "प्रगत एआय",
  sim_modal_sub: "रिअल-टाइम बहु-आपत्ती प्रभाव इंजिन",
  sim_tab_preset: "पूर्वनिर्धारित आपत्ती",
  sim_tab_whatif: "काय-जर घटक",
  sim_select_scenario: "सिम्युलेशनसाठी आपत्ती निवडा",
  sim_scenario_rain: "मुसळधार पाऊस",
  sim_scenario_flood: "अचानक पूर",
  sim_scenario_heatwave: "उष्णतेची लाट",
  sim_scenario_cyclone: "चक्रीवादळ",
  sim_scenario_thunder: "वादळी पाऊस",
  sim_affected_zones: "अंदाजित संवेदनशील क्षेत्र",
  sim_ai_rec: "रणनीतीपर एआय सल्ला",
  sim_rain_increase: "पावसात वाढ",
  sim_temp_shift: "तापमान बदल",
  sim_wind_surge: "वाऱ्याचा वेग वाढ",
  sim_hypo_risk: "काल्पनिक आपत्ती जोखीम गुण",
  sim_hypo_desc: "मातीची आर्द्रता, उंची, सांडपाणी व्यवस्था व वाऱ्याच्या वेगावर आधारित आपत्ती मॉडेल.",
  close_btn: "बंद करा",

  em_modal_title: "आपत्ती मदत केंद्र व निवारा कक्ष",
  badge_safety_dir: "सुरक्षा निर्देशिका",
  em_modal_sub: "स्थानिक मदत यंत्रणा, अधिकृत संपर्क क्रमांक व सुरक्षा नियमावली",
  em_tab_shelters: "मदत निवारा",
  em_tab_checklist: "सुरक्षा चेकलिस्ट",
  em_tab_contacts: "तातडीचे संपर्क क्रमांक",
  em_col_capacity: "क्षमता",
  em_checklist_before: "आपत्तीपूर्वी घ्यावयाची काळजी",
  em_checklist_during: "आपत्ती दरम्यान करायच्या उपाययोजना",
  em_call_now: "कॉल करा",

  report_modal_title: "हवामान गुप्तवार्ता अहवाल",
  badge_exec_report: "कार्यकारी अहवाल",
  report_modal_sub: "स्वयंचलित विश्लेषणात्मक सारांश व कृतीयोग्य मार्गदर्शक सूचना",
  report_type_label: "अहवालाचा प्रकार निवडा",
  report_type_daily: "दैनिक आढावा",
  report_type_weekly: "७-दिवसीय अंदाज",
  report_type_disaster: "आपत्ती मूल्यांकन",
  report_generating: "अहवाल तयार होत आहे...",
  report_generate_btn: "सविस्तर अहवाल तयार करा",
  report_summary: "कार्यकारी सारांश",
  report_recommendations: "कृतीयोग्य शिफारसी",
  report_export_as: "अहवाल डाउनलोड करा",

  climate_modal_title: "दशकीय हवामान कल व विश्लेषण",
  badge_climate_analytics: "हवामान विश्लेषण",
  climate_modal_sub: "ऐतिहासिक हवामान मानके व दशकीय बदल",
  climate_avg_temp: "ऐतिहासिक सरासरी तापमान",
  climate_avg_rain: "वार्षिक पर्जन्यमान",
  climate_anomaly_title: "दशकीय हवामान विसंगति",
  climate_monthly_avg: "मासिक सरासरी हवामान",

  auth_persona_general: "सर्वसामान्य नागरिक",
  auth_persona_farmer: "🌾 शेतकरी / कृषी",
  auth_persona_traveller: "🚗 प्रवासी / महामार्ग",
  auth_persona_disaster: "🚨 आपत्ती प्रतिसाद",
  auth_persona_school: "🏫 शाळा / शैक्षणिक",
  auth_select_persona: "भूमिका निवडा",
  auth_email_label: "ईमेल पत्ता",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "पासवर्ड",
  auth_name_label: "पूर्ण नाव",
  auth_name_placeholder: "उदा. विक्रम शर्मा",
  auth_role_label: "भूमिका निवडा",
  auth_btn_login: "साइन इन करा",
  auth_btn_register: "नवीन खाते तयार करा"
};

export const TA_STRINGS: ModalStrings = {
  sim_modal_title: "பேரிடர் உருவகப்படுத்துதல் சிமுலேட்டர்",
  badge_advanced_ai: "மேம்பட்ட AI",
  sim_modal_sub: "நிகழ்நேர பல-அபாய தாக்க கணக்கீட்டு இயந்திரம்",
  sim_tab_preset: "முன்னமைக்கப்பட்ட அபாயங்கள்",
  sim_tab_whatif: "என்ன-இருந்தால் அளவுருக்கள்",
  sim_select_scenario: "அபாய உருவகப்படுத்துதலைத் தேர்ந்தெடுக்கவும்",
  sim_scenario_rain: "கனமழை",
  sim_scenario_flood: "திடீர் வெள்ளம்",
  sim_scenario_heatwave: "வெப்ப அலை",
  sim_scenario_cyclone: "புயல்",
  sim_scenario_thunder: "இடி மின்னல் புயல்",
  sim_affected_zones: "பாதிக்கப்படக்கூடிய மண்டலங்கள்",
  sim_ai_rec: "தந்திரோபாய AI பரிந்துரை",
  sim_rain_increase: "மழைப்பொழிவு அதிகரிப்பு",
  sim_temp_shift: "வெப்பநிலை மாற்றம்",
  sim_wind_surge: "காற்று வேக உயர்வு",
  sim_hypo_risk: "கற்பனையான ஆபத்து மதிப்பீடு",
  sim_hypo_desc: "மண்ணின் ஈரப்பதம், உயரம், வடிகால் மற்றும் காற்றின் வேகம் அடிப்படையிலான மாதிரி.",
  close_btn: "மூடு",

  em_modal_title: "பேரிடர் அவசர உதவி மையம் & முகாம்கள்",
  badge_safety_dir: "பாதுகாப்பு கையேடு",
  em_modal_sub: "உள்ளூர் நிவாரண உள்கட்டமைப்பு, சரிபார்க்கப்பட்ட உதவி எண்கள் & நெறிமுறைகள்",
  em_tab_shelters: "நிவாரண முகாம்கள்",
  em_tab_checklist: "பாதுகாப்பு சரிபார்ப்பு பட்டியல்",
  em_tab_contacts: "அவசர உதவி எண்கள்",
  em_col_capacity: "கொள்ளளவு",
  em_checklist_before: "பேரிடருக்கு முன் (தயார்ப்பு)",
  em_checklist_during: "பேரிடரின் போது (பாதுகாப்பு)",
  em_call_now: "இப்போது அழைக்கவும்",

  report_modal_title: "வானிலை நுண்ணறிவு அறிக்கை",
  badge_exec_report: "நிர்வாக அறிக்கை",
  report_modal_sub: "தானியங்கி பகுப்பாய்வு சுருக்கம் & செயல்பாட்டு வழிகாட்டுதல்கள்",
  report_type_label: "அறிக்கையின் வகையைத் தேர்ந்தெடுக்கவும்",
  report_type_daily: "தினசரி சுருக்கம்",
  report_type_weekly: "7-நாள் கண்ணோட்டம்",
  report_type_disaster: "பேரிடர் மதிப்பீடு",
  report_generating: "அறிக்கை உருவாக்கப்படுகிறது...",
  report_generate_btn: "முழுமையான அறிக்கையை உருவாக்கு",
  report_summary: "நிர்வாக சுருக்கம்",
  report_recommendations: "செயல்படுத்தக்கூடிய பரிந்துரைகள்",
  report_export_as: "அறிக்கையைப் பதிவிறக்கவும்",

  climate_modal_title: "பத்தாண்டுகளின் காலநிலை போக்கு & பகுப்பாய்வு",
  badge_climate_analytics: "காலநிலை பகுப்பாய்வு",
  climate_modal_sub: "வரலாற்று வானிலை அளவுகோல்கள் & பத்தாண்டு மாற்றங்கள்",
  climate_avg_temp: "வரலாற்று சராசரி வெப்பநிலை",
  climate_avg_rain: "ஆண்டு மழைப்பொழிவு",
  climate_anomaly_title: "காலநிலை முரண்பாடு",
  climate_monthly_avg: "மாதாந்திர காலநிலை இயல்புகள்",

  auth_persona_general: "பொது மக்கள்",
  auth_persona_farmer: "🌾 உழவர் / விவசாயம்",
  auth_persona_traveller: "🚗 பயணி / நெடுஞ்சாலை",
  auth_persona_disaster: "🚨 பேரிடர் மேலாண்மை",
  auth_persona_school: "🏫 பள்ளி / கல்வி",
  auth_select_persona: "செயல்பாட்டு பங்கைத் தேர்ந்தெடுக்கவும்",
  auth_email_label: "மின்னஞ்சல் முகவரி",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "கடவுச்சொல்",
  auth_name_label: "முழு பெயர்",
  auth_name_placeholder: "எ.கா. விக்ரம் சர்மா",
  auth_role_label: "செயல்பாட்டு பங்கு",
  auth_btn_login: "உள்நுழைக",
  auth_btn_register: "கணக்கை உருவாக்கு"
};

export const TE_STRINGS: ModalStrings = {
  sim_modal_title: "విపత్తు దృశ్య సిమ్యులేటర్",
  badge_advanced_ai: "అధునాతన AI",
  sim_modal_sub: "రియల్-టైమ్ బహుళ-ప్రమాద ప్రభావ ఇంజిన్",
  sim_tab_preset: "ముందుగా అమర్చిన ప్రమాదాలు",
  sim_tab_whatif: "ఏమి-అయితే పారామితులు",
  sim_select_scenario: "సిమ్యులేషన్ ప్రమాదాన్ని ఎంచుకోండి",
  sim_scenario_rain: "భారీ వర్షం",
  sim_scenario_flood: "ఆకస్మిక వరద",
  sim_scenario_heatwave: "వడగాల్పులు",
  sim_scenario_cyclone: "తుఫాను",
  sim_scenario_thunder: "ఉరుములతో కూడిన తుఫాను",
  sim_affected_zones: "ప్రభావిత ప్రాంతాలు",
  sim_ai_rec: "వ్యూహాత్మక AI సిఫార్సు",
  sim_rain_increase: "వర్షపాతం పెరుగుదల",
  sim_temp_shift: "ఉష్ణోగ్రత మార్పు",
  sim_wind_surge: "గాలి వేగం పెరుగుదల",
  sim_hypo_risk: "ఊహాజనిత ప్రమాద స్కోరు",
  sim_hypo_desc: "నేల తేమ, ఎత్తు, నీటి పారుదల మరియు గాలి వేగం ఆధారంగా మోడల్ చేయబడింది.",
  close_btn: "మూసివేయి",

  em_modal_title: "విపత్తు అత్యవసర కేంద్రం & ఆశ్రయాలు",
  badge_safety_dir: "భద్రతా డైరెక్టరీ",
  em_modal_sub: "స్థానిక సహాయ మౌలిక సదుపాయాలు, హెల్ప్‌లైన్లు & నిబంధనలు",
  em_tab_shelters: "పునరావాస ఆశ్రయాలు",
  em_tab_checklist: "భద్రతా చెక్‌లిస్ట్",
  em_tab_contacts: "అత్యవసర హెల్ప్‌లైన్లు",
  em_col_capacity: "సామర్థ్యం",
  em_checklist_before: "విపత్తుకు ముందు (సన్నద్ధత)",
  em_checklist_during: "విపత్తు సమయంలో (భద్రతా చర్యలు)",
  em_call_now: "ఇప్పుడే కాల్ చేయండి",

  report_modal_title: "వాతావరణ సమాచార నివేదిక",
  badge_exec_report: "ఎగ్జిక్యూటివ్ రిపోర్ట్",
  report_modal_sub: "స్వయంచాలక విశ్లేషణాత్మక నివేదిక & కార్యాచరణ సలహాలు",
  report_type_label: "నివేదిక రకాన్ని ఎంచుకోండి",
  report_type_daily: "రోజువారీ బ్రీఫింగ్",
  report_type_weekly: "7-రోజుల అంచనా",
  report_type_disaster: "విపత్తు అంచనా",
  report_generating: "నివేదిక సిద్ధమవుతోంది...",
  report_generate_btn: "సమగ్ర నివేదికను రూపొందించండి",
  report_summary: "ఎగ్జిక్యూటివ్ సారాంశం",
  report_recommendations: "ఆచరణాత్మక సిఫార్సులు",
  report_export_as: "నివేదికను డౌన్‌లోడ్ చేయండి",

  climate_modal_title: "దశాబ్దాల వాతావరణ ధోరణి & విశ్లేషణ",
  badge_climate_analytics: "వాతావరణ విశ్లేషణ",
  climate_modal_sub: "చారిత్రక వాతావరణ ప్రమాణాలు & మార్పులు",
  climate_avg_temp: "చారిత్రక సగటు ఉష్ణోగ్రత",
  climate_avg_rain: "వార్షిక వర్షపాతం",
  climate_anomaly_title: "వాతావరణ క్రమరాహిత్యం",
  climate_monthly_avg: "నెలవారీ సాధారణ వాతావరణం",

  auth_persona_general: "సాధారణ ప్రజలు",
  auth_persona_farmer: "🌾 రైతు / వ్యవసాయం",
  auth_persona_traveller: "🚗 ప్రయాణికుడు / రహదారి",
  auth_persona_disaster: "🚨 విపత్తు స్పందన",
  auth_persona_school: "🏫 పాఠశాల / విద్య",
  auth_select_persona: "కార్యాచరణ పాత్రను ఎంచుకోండి",
  auth_email_label: "ఈమెయిల్ చిరునామా",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "పాస్‌వర్డ్",
  auth_name_label: "పూర్తి పేరు",
  auth_name_placeholder: "ఉదా: విక్రమ్ శర్మ",
  auth_role_label: "కార్యాచరణ పాత్ర",
  auth_btn_login: "సైన్ ఇన్ చేయండి",
  auth_btn_register: "ఖాతా సృష్టించండి"
};

export const BN_STRINGS: ModalStrings = {
  sim_modal_title: "দুর্যোগ দৃশ্যপট সিমুলেটর",
  badge_advanced_ai: "উন্নত এআই",
  sim_modal_sub: "রিয়েল-টাইম বহু-বিপদ প্রভাব ইঞ্জিন",
  sim_tab_preset: "পূর্বনির্ধারিত বিপদ",
  sim_tab_whatif: "কী-যদি প্যারামিটার",
  sim_select_scenario: "সিমুলেশনের জন্য বিপদ নির্বাচন করুন",
  sim_scenario_rain: "ভারী বৃষ্টিপাত",
  sim_scenario_flood: "হঠাৎ বন্যা",
  sim_scenario_heatwave: "তাপপ্রবাহ",
  sim_scenario_cyclone: "ঘূর্ণিঝড়",
  sim_scenario_thunder: "বজ্রঝড়",
  sim_affected_zones: "ঝুঁকিপূর্ণ অঞ্চলসমূহ",
  sim_ai_rec: "কৌশলগত এআই পরামর্শ",
  sim_rain_increase: "বৃষ্টিপাত বৃদ্ধি",
  sim_temp_shift: "তাপমাত্রার পরিবর্তন",
  sim_wind_surge: "বাতাসের গতি বৃদ্ধি",
  sim_hypo_risk: "কাল্পনিক ঝুঁকি স্কোর",
  sim_hypo_desc: "মাটির আর্দ্রতা, ভূ-উচ্চতা, নিষ্কাশন ও বাতাসের গতির ওপর ভিত্তি করে তৈরি মডেল।",
  close_btn: "বন্ধ করুন",

  em_modal_title: "দুর্যোগ জরুরি কেন্দ্র ও আশ্রয়কেন্দ্র",
  badge_safety_dir: "নিরাপত্তা ডিরেক্টরি",
  em_modal_sub: "স্থানীয় ত্রাণ পরিকাঠামো, যাচাইকৃত হেল্পলাইন ও নিয়মাবলী",
  em_tab_shelters: "ত্রাণ আশ্রয়কেন্দ্র",
  em_tab_checklist: "নিরাপত্তা চেকলিস্ট",
  em_tab_contacts: "জরুরি হেল্পলাইন",
  em_col_capacity: "ধারণক্ষমতা",
  em_checklist_before: "দুর্যোগের আগে (প্রস্তুতি)",
  em_checklist_during: "দুর্যোগ চলাকালীন (পদক্ষেপ)",
  em_call_now: "এখন কল করুন",

  report_modal_title: "আবহাওয়া গোয়েন্দা প্রতিবেদন",
  badge_exec_report: "কার্যনির্বাহী প্রতিবেদন",
  report_modal_sub: "স্বয়ংক্রিয় বিশ্লেষণাত্মক সারসংক্ষেপ ও পরামর্শ",
  report_type_label: "প্রতিবেদনের ধরন নির্বাচন করুন",
  report_type_daily: "দৈনিক ব্রিফিং",
  report_type_weekly: "৭-দিনের পূর্বাভাস",
  report_type_disaster: "দুর্যোগ মূল্যায়ন",
  report_generating: "প্রতিবেদন তৈরি হচ্ছে...",
  report_generate_btn: "সম্পূর্ণ প্রতিবেদন তৈরি করুন",
  report_summary: "কার্যনির্বাহী সারসংক্ষেপ",
  report_recommendations: "বাস্তবায়নযোগ্য সুপারিশ",
  report_export_as: "প্রতিবেদন ডাউনলোড করুন",

  climate_modal_title: "দশকীয় জলবায়ু ধারা ও অন্তর্দৃষ্টি",
  badge_climate_analytics: "জলবায়ু বিশ্লেষণ",
  climate_modal_sub: "ঐতিহাসিক আবহাওয়া মানদণ্ড ও পরিবর্তন",
  climate_avg_temp: "ঐতিহাসিক গড় তাপমাত্রা",
  climate_avg_rain: "বার্ষিক বৃষ্টিপাত",
  climate_anomaly_title: "জলবায়ু অসঙ্গতি",
  climate_monthly_avg: "মাসিক সাধারণ জলবায়ু",

  auth_persona_general: "সাধারণ নাগরিক",
  auth_persona_farmer: "🌾 কৃষক / কৃষি",
  auth_persona_traveller: "🚗 যাত্রী / মহাসড়ক",
  auth_persona_disaster: "🚨 দুর্যোগ প্রতিক্রিয়া",
  auth_persona_school: "🏫 বিদ্যালয় / শিক্ষাপ্রতিষ্ঠান",
  auth_select_persona: "ভূমিকা নির্বাচন করুন",
  auth_email_label: "ইমেল ঠিকানা",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "পাসওয়ার্ড",
  auth_name_label: "সম্পূর্ণ নাম",
  auth_name_placeholder: "যেমন: বিক্রম শর্মা",
  auth_role_label: "পরিচালন ভূমিকা",
  auth_btn_login: "সাইন ইন করুন",
  auth_btn_register: "অ্যাকাউন্ট তৈরি করুন"
};

export const GU_STRINGS: ModalStrings = {
  sim_modal_title: "આપત્તિ સિમ્યુલેટર",
  badge_advanced_ai: "અદ્યતન AI",
  sim_modal_sub: "રિયલ-ટાઇમ મલ્ટિ-હેઝાર્ડ ઇમ્પેક્ટ એન્જિન",
  sim_tab_preset: "પૂર્વનિર્ધારિત જોખમો",
  sim_tab_whatif: "વોટ-ઇફ પરિમાણો",
  sim_select_scenario: "સિમ્યુલેશન માટે જોખમ પસંદ કરો",
  sim_scenario_rain: "ભારે વરસાદ",
  sim_scenario_flood: "અચાનક પૂર",
  sim_scenario_heatwave: "હીટવેવ / લૂ",
  sim_scenario_cyclone: "વાવાઝોડું",
  sim_scenario_thunder: "ગાજવીજ સાથે વાવાઝોડું",
  sim_affected_zones: "અસરગ્રસ્ત વિસ્તારો",
  sim_ai_rec: "AI વ્યૂહાત્મક સલાહ",
  sim_rain_increase: "વરસાદમાં વધારો",
  sim_temp_shift: "તાપમાન બદલાવ",
  sim_wind_surge: "પવનની ગતિમાં વધારો",
  sim_hypo_risk: "કાલ્પનિક આપત્તિ જોખમ સ્કોર",
  sim_hypo_desc: "જમીનની ભેજ, ઊંચાઈ અને પવનની ગતિ પર આધારિત રિયલ-ટાઇમ મોડલ.",
  close_btn: "બંધ કરો",

  em_modal_title: "આપત્તિ રાહત કેન્દ્ર અને આશ્રયસ્થાનો",
  badge_safety_dir: "સુરક્ષા ડિરેક્ટરી",
  em_modal_sub: "સ્થાનિક રાહત માળખું, હેલ્પલાઇન અને પ્રોટોકોલ",
  em_tab_shelters: "રાહત આશ્રયસ્થાનો",
  em_tab_checklist: "સુરક્ષા ચેકલિસ્ટ",
  em_tab_contacts: "ઇમરજન્સી હેલ્પલાઇન",
  em_col_capacity: "ક્ષમતા",
  em_checklist_before: "આપત્તિ પહેલાં (તૈયારી)",
  em_checklist_during: "આપત્તિ દરમિયાન (સાવચેતી)",
  em_call_now: "હમણાં કૉલ કરો",

  report_modal_title: "હવામાન માહિતી અહેવાલ",
  badge_exec_report: "એક્ઝિક્યુટિવ રિપોર્ટ",
  report_modal_sub: "સ્વયંસંચાલિત વિશ્લેષણાત્મક સારાંશ અને માર્ગદર્શિકા",
  report_type_label: "અહેવાલનો પ્રકાર પસંદ કરો",
  report_type_daily: "દૈનિક બ્રીફિંગ",
  report_type_weekly: "7-દિવસીય અંદાજ",
  report_type_disaster: "આપત્તિ મૂલ્યાંકન",
  report_generating: "અહેવાલ તૈયાર થઈ રહ્યો છે...",
  report_generate_btn: "સંપૂર્ણ અહેવાલ બનાવો",
  report_summary: "મુખ્ય સારાંશ",
  report_recommendations: "અમલ કરવા યોગ્ય ભલામણો",
  report_export_as: "અહેવાલ ડાઉનલોડ કરો",

  climate_modal_title: "દાયકાના આબોહવા વલણો અને વિશ્લેષણ",
  badge_climate_analytics: "આબોહવા વિશ્લેષણ",
  climate_modal_sub: "ઐતિહાસિક હવામાન ધોરણો અને પરિવર્તન",
  climate_avg_temp: "ઐતિહાસિક સરેરાશ તાપમાન",
  climate_avg_rain: "વાર્ષિક વરસાદ",
  climate_anomaly_title: "આબોહવા વિસંગતતા",
  climate_monthly_avg: "માસિક સામાન્ય આબોહવા",

  auth_persona_general: "સામાન્ય નાગરિક",
  auth_persona_farmer: "🌾 ખેડૂત / કૃષિ",
  auth_persona_traveller: "🚗 મુસાફર / હાઇવે",
  auth_persona_disaster: "🚨 આપત્તિ વ્યવસ્થાપન",
  auth_persona_school: "🏫 શાળા / સંસ્થા",
  auth_select_persona: "ભૂમિકા પસંદ કરો",
  auth_email_label: "ઇમેઇલ સરનામું",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "પાસવર્ડ",
  auth_name_label: "પૂરું નામ",
  auth_name_placeholder: "દા.ત. વિક્રમ શર્મા",
  auth_role_label: "ભૂમિકા",
  auth_btn_login: "સાઇન ઇન કરો",
  auth_btn_register: "ખાતું બનાવો"
};

export const KN_STRINGS: ModalStrings = {
  sim_modal_title: "ವಿಪತ್ತು ಸನ್ನಿವೇಶ ಸಿಮ್ಯುಲೇಟರ್",
  badge_advanced_ai: "ಸುಧಾರಿತ AI",
  sim_modal_sub: "ನೈಜ-ಸಮಯದ ಬಹು-ಅಪಾಯ ಪ್ರಭಾವ ಎಂಜಿನ್",
  sim_tab_preset: "ಪೂರ್ವನಿಗದಿ ಅಪಾಯಗಳು",
  sim_tab_whatif: "ಏನು-ಆದರೆ ನಿಯತಾಂಕಗಳು",
  sim_select_scenario: "ಸಿಮ್ಯುಲೇಶನ್‌ಗಾಗಿ ಅಪಾಯವನ್ನು ಆರಿಸಿ",
  sim_scenario_rain: "ಭಾರೀ ಮಳೆ",
  sim_scenario_flood: "ಧಿಡೀರ್ ಪ್ರವಾಹ",
  sim_scenario_heatwave: "ಶಾಖದ ಅಲೆ",
  sim_scenario_cyclone: "ಚಂಡಮಾರುತ",
  sim_scenario_thunder: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
  sim_affected_zones: "ಬಾಧಿತ ವಲಯಗಳು",
  sim_ai_rec: "AI ತಂತ್ರಗಾರಿಕೆ ಸಲಹೆ",
  sim_rain_increase: "ಮಳೆ ಹೆಚ್ಚಳ",
  sim_temp_shift: "ತಾಪಮಾನ ಬದಲಾವಣೆ",
  sim_wind_surge: "ಗಾಳಿಯ ವೇಗ ಹೆಚ್ಚಳ",
  sim_hypo_risk: "ಕಾಲ್ಪನಿಕ ಅಪಾಯದ ಸ್ಕೋರ್",
  sim_hypo_desc: "ಮಣ್ಣಿನ ತೇವಾಂಶ, ಎತ್ತರ, ಒಳಚರಂಡಿ ಮತ್ತು ಗಾಳಿಯ ವೇಗ ಆಧರಿತ ಮಾದರಿ.",
  close_btn: "ಮುಚ್ಚಿ",

  em_modal_title: "ವಿಪತ್ತು ತುರ್ತು ಕೇಂದ್ರ ಮತ್ತು ಆಶ್ರಯಗಳು",
  badge_safety_dir: "ಸುರಕ್ಷತಾ ಡೈರೆಕ್ಟರಿ",
  em_modal_sub: "ಸ್ಥಳೀಯ ಪರಿಹಾರ ಮೂಲಸೌಕರ್ಯ, ಸಹಾಯವಾಣಿಗಳು ಮತ್ತು ನಿಯಮಗಳು",
  em_tab_shelters: "ಪರಿಹಾರ ಆಶ್ರಯಗಳು",
  em_tab_checklist: "ಸುರಕ್ಷತಾ ಪರಿಶೀಲನಾಪಟ್ಟಿ",
  em_tab_contacts: "ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು",
  em_col_capacity: "ಸಾಮರ್ಥ್ಯ",
  em_checklist_before: "ವಿಪತ್ತಿನ ಮೊದಲು (ಸಿದ್ಧತೆ)",
  em_checklist_during: "ವಿಪತ್ತಿನ ಸಮಯದಲ್ಲಿ (ಕ್ರಮಗಳು)",
  em_call_now: "ಈಗಲೇ ಕರೆ ಮಾಡಿ",

  report_modal_title: "ಹವಾಮಾನ ಗುಪ್ತಚರ ವರದಿ",
  badge_exec_report: "ಕಾರ್ಯನಿರ್ವಾಹಕ ವರದಿ",
  report_modal_sub: "ಸ್ವಯಂಚಾಲಿತ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಸಾರಾಂಶ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
  report_type_label: "ವರದಿಯ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ",
  report_type_daily: "ದೈನಂದಿನ ವಿವರಣೆ",
  report_type_weekly: "7-ದಿನಗಳ ಮುನ್ನೋಟ",
  report_type_disaster: "ವಿಪತ್ತು ಮೌಲ್ಯಮಾಪನ",
  report_generating: "ವರದಿ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...",
  report_generate_btn: "ಸಮಗ್ರ ವರದಿ ತಯಾರಿಸಿ",
  report_summary: "ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಾರಾಂಶ",
  report_recommendations: "ಕಾರ್ಯಸಾಧ್ಯ ಶಿಫಾರಸುಗಳು",
  report_export_as: "ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",

  climate_modal_title: "ದಶಕದ ಹವಾಮಾನ ಪ್ರವೃತ್ತಿ ಮತ್ತು ಒಳನೋಟಗಳು",
  badge_climate_analytics: "ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ",
  climate_modal_sub: "ಐತಿಹಾಸಿಕ ಮಾನದಂಡಗಳು ಮತ್ತು ಬದಲಾವಣೆಗಳು",
  climate_avg_temp: "ಐತಿಹಾಸಿಕ ಸರಾಸರಿ ತಾಪಮಾನ",
  climate_avg_rain: "ವಾರ್ಷಿಕ ಮಳೆ",
  climate_anomaly_title: "ಹವಾಮಾನ ವೈಪರೀತ್ಯ",
  climate_monthly_avg: "ಮಾಸಿಕ ಸಾಮಾನ್ಯ ಹವಾಮಾನ",

  auth_persona_general: "ಸಾಮಾನ್ಯ ನಾಗರಿಕ",
  auth_persona_farmer: "🌾 ರೈತ / ಕೃಷಿ",
  auth_persona_traveller: "🚗 ಪ್ರಯಾಣಿಕ / ಹೆದ್ದಾರಿ",
  auth_persona_disaster: "🚨 ವಿಪತ್ತು ನಿರ್ವಹಣೆ",
  auth_persona_school: "🏫 ಶಾಲೆ / ಸಂಸ್ಥೆ",
  auth_select_persona: "ಕಾರ್ಯಾಚರಣೆಯ ಪಾತ್ರ ಆರಿಸಿ",
  auth_email_label: "ಇಮೇಲ್ ವಿಳಾಸ",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "ಪಾಸ್‌ವರ್ಡ್",
  auth_name_label: "ಪೂರ್ಣ ಹೆಸರು",
  auth_name_placeholder: "ಉದಾ: ವಿಕ್ರಮ್ ಶರ್ಮಾ",
  auth_role_label: "ಕಾರ್ಯಾಚರಣೆಯ ಪಾತ್ರ",
  auth_btn_login: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
  auth_btn_register: "ಖಾತೆ ರಚಿಸಿ"
};

export const ML_STRINGS: ModalStrings = {
  sim_modal_title: "ദുരന്ത സാഹചര്യ സിമുലേറ്റർ",
  badge_advanced_ai: "വിപുലമായ AI",
  sim_modal_sub: "തത്സമയ ദുരന്ത ആഘാത എൻജിൻ",
  sim_tab_preset: "മുൻകൂട്ടി നിശ്ചയിച്ച ദുരന്തങ്ങൾ",
  sim_tab_whatif: "എന്തുകൊണ്ട് പരാമീറ്ററുകൾ",
  sim_select_scenario: "സിമുലേഷനായി ദുരന്തം തിരഞ്ഞെടുക്കുക",
  sim_scenario_rain: "കനത്ത മഴ",
  sim_scenario_flood: "പെട്ടെന്നുള്ള വെള്ളപ്പൊക്കം",
  sim_scenario_heatwave: "ഉഷ്ണതരംഗം",
  sim_scenario_cyclone: "ചുഴലിക്കാറ്റ്",
  sim_scenario_thunder: "ഇടിമിന്നലോടുകൂടിയ കാറ്റ്",
  sim_affected_zones: "ബാധിത മേഖലകൾ",
  sim_ai_rec: "തന്ത്രപരമായ AI നിർദ്ദേശം",
  sim_rain_increase: "മഴയുടെ വർദ്ധനവ്",
  sim_temp_shift: "താപനില മാറ്റം",
  sim_wind_surge: "കാറ്റിന്റെ വേഗത വർദ്ധനവ്",
  sim_hypo_risk: "സാങ്കൽപ്പിക അപായ സ്കോർ",
  sim_hypo_desc: "മണ്ണിന്റെ ഈർപ്പം, ഉയരം, ഡ്രെയിനേജ്, കാറ്റിന്റെ വേഗത എന്നിവ അടിസ്ഥാനമാക്കിയുള്ള മോഡൽ.",
  close_btn: "അടയ്ക്കുക",

  em_modal_title: "ദുരന്ത നിവാരണ കേന്ദ്രവും അഭയകേന്ദ്രങ്ങളും",
  badge_safety_dir: "സുരക്ഷാ ഡയറക്ടറി",
  em_modal_sub: "പ്രാദേശിക ദുരിതാശ്വാസ സംവിധാനങ്ങൾ, ഹെൽപ്പ് ലൈനുകൾ & മാർഗ്ഗനിർദ്ദേശങ്ങൾ",
  em_tab_shelters: "ദുരിതാശ്വാസ ക്യാമ്പുകൾ",
  em_tab_checklist: "സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ്",
  em_tab_contacts: "അടിയന്തര ഹെൽപ്പ് ലൈനുകൾ",
  em_col_capacity: "ശേഷി",
  em_checklist_before: "ദുരന്തത്തിന് മുൻപ് (തയ്യാറെടുപ്പ്)",
  em_checklist_during: "ദുരന്ത സമയത്ത് (നടപടികൾ)",
  em_call_now: "ഇപ്പോൾ വിളിക്കുക",

  report_modal_title: "കാലാവസ്ഥാ ഇന്റലിജൻസ് റിപ്പോർട്ട്",
  badge_exec_report: "എക്സിക്യൂട്ടീവ് റിപ്പോർട്ട്",
  report_modal_sub: "യാന്ത്രിക വിശകലന സംഗ്രഹവും മാർഗ്ഗനിർദ്ദേശങ്ങളും",
  report_type_label: "റിപ്പോർട്ട് തരം തിരഞ്ഞെടുക്കുക",
  report_type_daily: "പ്രതിദിന ബ്രീഫിംഗ്",
  report_type_weekly: "7 ദിവസത്തെ പ്രവചനം",
  report_type_disaster: "ദുരന്ത വിലയിരുത്തൽ",
  report_generating: "റിപ്പോർട്ട് തയ്യാറാക്കുന്നു...",
  report_generate_btn: "വിശദമായ റിപ്പോർട്ട് സൃഷ്ടിക്കുക",
  report_summary: "പ്രധാന സംഗ്രഹം",
  report_recommendations: "പ്രവർത്തനക്ഷമമായ നിർദ്ദേശങ്ങൾ",
  report_export_as: "റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",

  climate_modal_title: "ദശാബ്ദ കാലാവസ്ഥാ പ്രവണതകളും വിശകലനവും",
  badge_climate_analytics: "കാലാവസ്ഥാ വിശകലനം",
  climate_modal_sub: "ചരിത്രപരമായ കാലാവസ്ഥാ മാനദണ്ഡങ്ങളും മാറ്റങ്ങളും",
  climate_avg_temp: "ചരിത്രപരമായ ശരാശരി താപനില",
  climate_avg_rain: "വാർഷിക മഴ",
  climate_anomaly_title: "കാലാവസ്ഥാ വ്യതിയാനം",
  climate_monthly_avg: "പ്രതിമാസ സാധാരണ കാലാവസ്ഥ",

  auth_persona_general: "സാധാരണ ജനങ്ങൾ",
  auth_persona_farmer: "🌾 കർഷകൻ / കൃഷി",
  auth_persona_traveller: "🚗 യാത്രക്കാരൻ / ഹൈവേ",
  auth_persona_disaster: "🚨 ദുരന്ത നിവാരണം",
  auth_persona_school: "🏫 വിദ്യാലയം / സ്ഥാപനം",
  auth_select_persona: "പ്രവർത്തന റോൾ തിരഞ്ഞെടുക്കുക",
  auth_email_label: "ഇമെയിൽ വിലാസം",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "പാസ്‌വേഡ്",
  auth_name_label: "പൂർണ്ണമായ പേര്",
  auth_name_placeholder: "ഉദാ: വിക്രം ശർമ്മ",
  auth_role_label: "പ്രവർത്തന റോൾ",
  auth_btn_login: "സൈൻ ഇൻ ചെയ്യുക",
  auth_btn_register: "അക്കൗണ്ട് സൃഷ്ടിക്കുക"
};

export const PA_STRINGS: ModalStrings = {
  sim_modal_title: "ਆਫ਼ਤ ਸਥਿਤੀ ਸਿਮੂਲੇਟਰ",
  badge_advanced_ai: "ਉੱਨਤ AI",
  sim_modal_sub: "ਰੀਅਲ-ਟਾਈਮ ਮਲਟੀ-ਖ਼ਤਰਾ ਪ੍ਰਭਾਵ ਇੰਜਣ",
  sim_tab_preset: "ਪਹਿਲਾਂ ਤੋਂ ਤੈਅ ਖ਼ਤਰੇ",
  sim_tab_whatif: "ਕੀ-ਜੇਕਰ ਪੈਰਾਮੀਟਰ",
  sim_select_scenario: "ਸਿਮੂਲੇਸ਼ਨ ਲਈ ਖ਼ਤਰਾ ਚੁਣੋ",
  sim_scenario_rain: "ਭਾਰੀ ਮੀਂਹ",
  sim_scenario_flood: "ਅਚਾਨਕ ਹੜ੍ਹ",
  sim_scenario_heatwave: "ਲੂ / ਹੀਟਵੇਵ",
  sim_scenario_cyclone: "ਚੱਕਰਵਾਤ",
  sim_scenario_thunder: "ਗਰਜ ਨਾਲ ਤੂਫ਼ਾਨ",
  sim_affected_zones: "ਪ੍ਰਭਾਵਿਤ ਖੇਤਰ",
  sim_ai_rec: "ਰਣਨੀਤਕ AI ਸਲਾਹ",
  sim_rain_increase: "ਮੀਂਹ ਵਿੱਚ ਵਾਧਾ",
  sim_temp_shift: "ਤਾਪਮਾਨ ਬਦਲਾਅ",
  sim_wind_surge: "ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ ਵਾਧਾ",
  sim_hypo_risk: "ਕਾਲਪਨਿਕ ਖ਼ਤਰਾ ਸਕੋਰ",
  sim_hypo_desc: "ਮਿੱਟੀ ਦੀ ਨਮੀ, ਉਚਾਈ, ਨਿਕਾਸੀ ਅਤੇ ਹਵਾ ਦੀ ਗਤੀ 'ਤੇ ਆਧਾਰਿਤ ਮਾਡਲ।",
  close_btn: "ਬੰਦ ਕਰੋ",

  em_modal_title: "ਆਫ਼ਤ ਐਮਰਜੈਂਸੀ ਕੇਂਦਰ ਅਤੇ ਆਸਰਾ ਸਥਾਨ",
  badge_safety_dir: "ਸੁਰੱਖਿਆ ਡਾਇਰੈਕਟਰੀ",
  em_modal_sub: "ਸਥਾਨਕ ਰਾਹਤ ਢਾਂਚਾ, ਹੈਲਪਲਾਈਨਾਂ ਅਤੇ ਨਿਯਮ",
  em_tab_shelters: "ਰਾਹਤ ਕੈਂਪ",
  em_tab_checklist: "ਸੁਰੱਖਿਆ ਚੈੱਕਲਿਸਟ",
  em_tab_contacts: "ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨਾਂ",
  em_col_capacity: "ਸਮਰੱਥਾ",
  em_checklist_before: "ਆਫ਼ਤ ਤੋਂ ਪਹਿਲਾਂ (ਤਿਆਰੀ)",
  em_checklist_during: "ਆਫ਼ਤ ਦੌਰਾਨ (ਕਦਮ)",
  em_call_now: "ਹੁਣੇ ਕਾਲ ਕਰੋ",

  report_modal_title: "ਮੌਸਮ ਖ਼ੁਫ਼ੀਆ ਰਿਪੋਰਟ",
  badge_exec_report: "ਕਾਰਜਕਾਰੀ ਰਿਪੋਰਟ",
  report_modal_sub: "ਆਟੋਮੈਟਿਕ ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਸੰਖੇਪ ਅਤੇ ਸਲਾਹਾਂ",
  report_type_label: "ਰਿਪੋਰਟ ਦੀ ਕਿਸਮ ਚੁਣੋ",
  report_type_daily: "ਰੋਜ਼ਾਨਾ ਬ੍ਰੀਫਿੰਗ",
  report_type_weekly: "7-ਦਿਨਾਂ ਦਾ ਦ੍ਰਿਸ਼ਟੀਕੋਣ",
  report_type_disaster: "ਆਫ਼ਤ ਮੁਲਾਂਕਣ",
  report_generating: "ਰਿਪੋਰਟ ਤਿਆਰ ਹੋ ਰਹੀ ਹੈ...",
  report_generate_btn: "ਪੂਰੀ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ",
  report_summary: "ਕਾਰਜਕਾਰੀ ਸੰਖੇਪ",
  report_recommendations: "ਕਾਰਵਾਈ ਯੋਗ ਸਿਫ਼ਾਰਸ਼ਾਂ",
  report_export_as: "ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ",

  climate_modal_title: "ਦਹਾਕੇ ਦੇ ਜਲਵਾਯੂ ਰੁਝਾਨ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣ",
  badge_climate_analytics: "ਜਲਵਾਯੂ ਵਿਸ਼ਲੇਸ਼ਣ",
  climate_modal_sub: "ਇਤਿਹਾਸਕ ਮੌਸਮ ਮਾਪਦੰਡ ਅਤੇ ਬਦਲਾਅ",
  climate_avg_temp: "ਇਤਿਹਾਸਕ ਔਸਤ ਤਾਪਮਾਨ",
  climate_avg_rain: "ਸਾਲਾਨਾ ਮੀਂਹ",
  climate_anomaly_title: "ਜਲਵਾਯੂ ਵਿਗਾੜ",
  climate_monthly_avg: "ਮਹੀਨਾਵਾਰ ਆਮ ਜਲਵਾਯੂ",

  auth_persona_general: "ਆਮ ਲੋਕ",
  auth_persona_farmer: "🌾 ਕਿਸਾਨ / ਖੇਤੀਬਾੜੀ",
  auth_persona_traveller: "🚗 ਯਾਤਰੀ / ਹਾਈਵੇਅ",
  auth_persona_disaster: "🚨 ਆਫ਼ਤ ਪ੍ਰਬੰਧਨ",
  auth_persona_school: "🏫 ਸਕੂਲ / ਸੰਸਥਾ",
  auth_select_persona: "ਕਾਰਜਕਾਰੀ ਭੂਮਿਕਾ ਚੁਣੋ",
  auth_email_label: "ਈਮੇਲ ਪਤਾ",
  auth_email_placeholder: "your.name@domain.com",
  auth_password_label: "ਪਾਸਵਰਡ",
  auth_name_label: "ਪੂਰਾ ਨਾਮ",
  auth_name_placeholder: "ਜਿਵੇਂ: ਵਿਕਰਮ ਸ਼ਰਮਾ",
  auth_role_label: "ਕਾਰਜਕਾਰੀ ਭੂਮਿਕਾ",
  auth_btn_login: "ਸਾਈਨ ਇਨ ਕਰੋ",
  auth_btn_register: "ਖਾਤਾ ਬਣਾਓ"
};

const MODAL_MAP: Record<string, Partial<ModalStrings>> = {
  en: EN_STRINGS,
  hi: HI_STRINGS,
  mr: MR_STRINGS,
  ta: TA_STRINGS,
  te: TE_STRINGS,
  bn: BN_STRINGS,
  gu: GU_STRINGS,
  kn: KN_STRINGS,
  ml: ML_STRINGS,
  pa: PA_STRINGS,
};

/**
 * Returns complete modal localization dictionary for a given language,
 * with guaranteed English fallback for any missing or empty key.
 */
export function getModalStrings(lang?: SupportedLanguage): ModalStrings {
  const chosen = (lang && MODAL_MAP[lang]) || {};
  const result: Record<string, string> = { ...EN_STRINGS };
  for (const [k, v] of Object.entries(chosen)) {
    if (v && typeof v === 'string' && v.trim().length > 0) {
      result[k] = v;
    }
  }
  return result as unknown as ModalStrings;
}
