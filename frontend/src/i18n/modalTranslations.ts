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

const EN_STRINGS: ModalStrings = {
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

const HI_STRINGS: ModalStrings = {
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

const MR_STRINGS: ModalStrings = {
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

const MODAL_MAP: Record<string, Partial<ModalStrings>> = {
  en: EN_STRINGS,
  hi: HI_STRINGS,
  mr: MR_STRINGS,
};

/**
 * Returns complete modal localization dictionary for a given language,
 * with guaranteed English fallback for any missing key.
 */
export function getModalStrings(lang?: SupportedLanguage): ModalStrings {
  const chosen = (lang && MODAL_MAP[lang]) || {};
  return {
    ...EN_STRINGS,
    ...chosen,
  };
}
