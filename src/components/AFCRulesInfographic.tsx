import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, DollarSign, Users, FileText, Shield, Home, Building, Building2, Warehouse, ArrowRight, TrendingUp, Minus, Scale, BookOpen, UserCheck, ClipboardList, GraduationCap, Stethoscope, Bell, UserPlus, Shirt, Tag, Bed, Accessibility } from 'lucide-react';

type FacilityType = 'family' | 'small' | 'large' | 'congregate';

const AFCRulesInfographic = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityType>('small');
  const [expandedChange, setExpandedChange] = useState<string | null>(null);

  const facilityTypes = {
    family: {
      name: "Family Home",
      icon: Home,
      capacity: "1-6 residents",
      color: "blue",
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      textColor: "text-blue-900",
      illustration: "🏠"
    },
    small: {
      name: "Small Group Home",
      icon: Building,
      capacity: "7-12 residents",
      color: "green",
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      textColor: "text-green-900",
      illustration: "🏘️"
    },
    large: {
      name: "Large Group Home",
      icon: Building2,
      capacity: "13-20 residents",
      color: "purple",
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      textColor: "text-purple-900",
      illustration: "🏢"
    },
    congregate: {
      name: "Congregate Facility",
      icon: Warehouse,
      capacity: "21+ residents",
      color: "orange",
      gradient: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      textColor: "text-orange-900",
      illustration: "🏛️"
    }
  };

  const detailedChanges = {
    family: [
      // HIGH IMPACT (sorted by rule number)
      {
        id: 'family-training-required',
        icon: GraduationCap,
        title: "AFC New Provider Training Required",
        oldRule: "No equivalent",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.627(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "No mandatory new provider training requirement",
        newText: "All licensees and administrators must complete AFC New Provider Training within 6 months of license issuance or hire; once completed, doesn't need repeating if documentation exists",
        impact: "high",
        visual: { old: "📋 No Training", new: "🎓 Mandatory Training" },
        timeline: "6 months from license/hire",
        cost: "$0 (free training)",
        action: "Register for training notifications; complete within 6 months; keep certificates in personnel files",
        source: "LARA Key Highlight #1"
      },
      {
        id: 'family-emergency-prep',
        icon: Bell,
        title: "Emergency Preparedness Plan (All-Hazards)",
        oldRule: "R 400.1438",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.619",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Required evacuation plan, posted procedures, 4 fire drills/year (2 during sleeping hours), and staff/resident familiarity",
        newText: "All-hazards emergency preparedness plan required covering severe weather, extended utility outage, alternate care location, limited mobility methods, and fire safety. Staff trained at hire and quarterly. Plan practiced quarterly on each shift (7am-3pm, 3pm-11pm, 11pm-7am). Records maintained 2 years.",
        impact: "high",
        visual: { old: "📅 4 Drills/Year (Fire)", new: "📅 All-Hazards, Per Shift, Quarterly" },
        timeline: "Quarterly (every 3 months)",
        cost: "Staff time",
        action: "Create/maintain written Emergency Preparedness Plan covering all hazards (fire, weather, utility outage, alternate care location); train staff at hire and quarterly; practice plan quarterly on each shift (7-3, 3-11, 11-7); document resident-specific assistance needs and evacuation methods; ensure shelter-in-place and evacuation/temporary housing planning is covered; retain all training and drill records 2 years",
        source: "LARA Key Highlight #16 + MDHHS Emergency Planning Toolkit"
      },
      {
        id: 'family-personnel',
        icon: ClipboardList,
        title: "Personnel Policies Now Required",
        oldRule: "R 400.1404",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.701(1)(a)-(f) & (3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "No specific written personnel policy requirements for family homes",
        newText: "Must maintain written policies covering: mandatory reporting, prohibited practices, confidentiality, training requirements, resident rights; job descriptions required for each position",
        impact: "high",
        visual: { old: "📝 None Required", new: "📋 Full Policy Manual + Job Descriptions" },
        timeline: "Immediate",
        cost: "$0-500",
        action: "Create comprehensive policy manual using LARA templates; develop job descriptions for all staff positions",
        source: "LARA Key Highlight #10"
      },
      {
        id: 'family-fire',
        icon: Shield,
        title: "Fire Safety Modernization",
        oldRule: "R 400.1435",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.727(7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Battery-operated smoke alarms in sleeping areas and common areas",
        newText: "Interconnected smoke alarms powered by building electrical OR wireless system compliant with NFPA 72 (2019 edition, section 29.10.8.1 et seq.) for new construction, conversions, or licensing type changes",
        impact: "high",
        visual: { old: "🔋 Battery Only", new: "🔌 Interconnected or Wireless NFPA 72" },
        timeline: "For new construction/conversions",
        cost: "$200-800",
        action: "Install wireless interconnected smoke detection system (NFPA 72 compliant) for new construction or conversions",
        source: "LARA Key Highlight #7"
      },
      // MEDIUM IMPACT
      {
        id: 'family-staff-records',
        icon: FileText,
        title: "Staff Records Requirements",
        oldRule: "Minimal requirements",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.639(1)(a)-(i)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic staff documentation required",
        newText: "Family homes employing staff must maintain comprehensive records for each staff member containing: application, references, background checks, health screening, training certifications, job description, personnel policies acknowledgment, performance evaluations, disciplinary actions",
        impact: "medium",
        visual: { old: "📄 Basic Files", new: "📁 Complete Personnel Files" },
        timeline: "30 days",
        cost: "$0",
        action: "Establish personnel file system with all required components for each staff member",
        source: "LARA Key Highlight #9"
      },
      {
        id: 'family-admission-discharge',
        icon: FileText,
        title: "Admission & Discharge Policy Required",
        oldRule: "No written policy required",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.687(1)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "No formal written admission and discharge policy required for family homes",
        newText: "Must have written admission and discharge policy; policy must be made available to residents and their designated representatives",
        impact: "medium",
        visual: { old: "📝 Informal Process", new: "📋 Written Policy Required" },
        timeline: "30 days",
        cost: "$0",
        action: "Develop written admission and discharge policy; make available to all residents and representatives",
        source: "LARA Key Highlight #12"
      },
      {
        id: 'family-visitation',
        icon: Users,
        title: "Visitation & Overnight Guest Policy",
        oldRule: "Informal arrangements",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.687(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Visitation handled informally without written policy",
        newText: "Written visitation policy required, including whether overnight visitors are allowed; roommate consent required for overnight visitors in semi-private rooms; overnight visitors count toward licensed capacity",
        impact: "medium",
        visual: { old: "👥 Informal", new: "📋 Written Policy + Consent" },
        timeline: "30 days",
        cost: "$0",
        action: "Develop written visitation policy addressing overnight guests; ensure capacity limits not exceeded; obtain roommate consent procedures",
        source: "LARA Key Highlight #3"
      },
      {
        id: 'family-wheelchair-ramps',
        icon: Accessibility,
        title: "Wheelchair Accessibility Requirements",
        oldRule: "General accessibility",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.725(5)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Accessibility accommodations as needed",
        newText: "Family homes accommodating residents who regularly require wheelchairs must be equipped with ramps at 2 approved means of egress from first floor",
        impact: "medium",
        visual: { old: "♿ As Needed", new: "♿ 2 Ramps Required" },
        timeline: "If applicable",
        cost: "$2,000-10,000+",
        action: "Install ramps at 2 approved egress points if accommodating wheelchair users",
        source: "LARA Key Highlight #14"
      },
      {
        id: 'family-hygiene',
        icon: Shirt,
        title: "Hygiene & Clothing Requirements",
        oldRule: "General provisions",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.677(2)(a)-(d)(i)-(viii)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic hygiene and clothing provisions required",
        newText: "Licensee must ensure residents receive or have access to comprehensive list of specified hygiene items and adequate clothing as detailed in rule subsections",
        impact: "medium",
        visual: { old: "🧴 Basic Items", new: "🧴 Comprehensive List" },
        timeline: "30 days",
        cost: "Variable",
        action: "Review R 400.677(2) requirements; ensure all specified hygiene and clothing items available to residents",
        source: "LARA Key Highlight #2"
      },
      {
        id: 'family-nutrition-standards',
        icon: ClipboardList,
        title: "Updated Nutrition Standards",
        oldRule: "R 400.1419 (legacy)",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.663",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "3 meals/day, ≤14 hours between evening and morning meal; menus required only upon departmental direction; older USDA/RDA-era nutrition references",
        newText: "DGA 2020–2025 standard adopted; weekly written/posted menus required; substitutions documented; menu records (incl. special diets) kept 90 days; prescribed diets accepted from appropriately licensed health care professional",
        impact: "medium",
        visual: { old: "🍽️ RDA-era Standards", new: "📋 DGA 2020-2025 + Weekly Menus" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update nutrition policy to DGA 2020–2025; implement weekly menu planning + posting + substitution documentation; keep menus 90 days; accept diet orders from licensed health care professionals",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'family-food-service',
        icon: Tag,
        title: "Additional Food Service Requirements",
        oldRule: "R 400.1419(2), R 400.1425 (legacy)",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.665",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "General food safety: proper preparation, serving, sanitation, and safety required",
        newText: "Explicit controls: 40°F cold/140°F hot holding; thermometers required in refrigerators/freezers; utensils cleaned + air dried after each use; repackaged perishables labeled with open/prep date + discard date (≤7 days; day 1 = open/prep); allergen indication required when applicable",
        impact: "medium",
        visual: { old: "📦 General Safety", new: "🏷️ Label + Temp + Date (7-day max)" },
        timeline: "Immediate",
        cost: "$0 (labels + thermometers)",
        action: "Implement food labeling system; install refrigerator/freezer thermometers; train staff on 7-day discard rule + allergen labeling + air-drying utensils",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'family-admin',
        icon: UserCheck,
        title: "Administrator Requirements",
        oldRule: "No specific requirement",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.699, R 400.625",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Family homes did not require a designated administrator",
        newText: "Administrator not required for family homes, BUT if services warrant, licensee may need to designate one",
        impact: "medium",
        visual: { old: "👤 Licensee Only", new: "👤/👥 May Need Admin" },
        timeline: "Within 30 days if applicable",
        cost: "Variable",
        action: "Consult LARA to determine if your services require an administrator",
        source: "AI Analysis"
      },
      {
        id: 'family-training',
        icon: BookOpen,
        title: "Staff Training Enhanced",
        oldRule: "R 400.1404",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.629(5)(a)-(i)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Training in first aid, CPR, resident care, safety",
        newText: "Family homes must now provide in-service training to direct care staff in: first aid, CPR, resident rights, behavior management, medication administration, infection control, food safety (storage, preparation, serving), nutrition and special diets, prevention of communicable diseases",
        impact: "medium",
        visual: { old: "📚 4 Topics", new: "📚 9 Topics" },
        timeline: "Next training cycle",
        cost: "$50-200/staff",
        action: "Expand training to include all required topics; document all training provided",
        source: "LARA Key Highlight #8"
      },
      // BENEFICIAL
      {
        id: 'family-tb-eliminated',
        icon: Stethoscope,
        title: "TB Testing No Longer Mandatory",
        oldRule: "Blanket TB testing required",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.631(5)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All staff and residents required to undergo TB testing",
        newText: "Blanket TB testing replaced with risk-based health screening approach",
        impact: "beneficial",
        visual: { old: "💉 All Tested", new: "📋 Risk-Based Screening" },
        timeline: "Immediate",
        cost: "Cost savings",
        action: "Update health screening procedures to risk-based assessment; document screening process",
        source: "LARA Key Highlight #6"
      },
      {
        id: 'family-teen-staff',
        icon: UserPlus,
        title: "Can Now Hire 16-17 Year Olds",
        oldRule: "Staff must be 18+",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.629(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All direct care staff must be 18 years or older",
        newText: "Can employ 16-17 year olds as direct care staff and count toward ratios; requires: parental consent for background check, direct supervision by adult 18+, training before independent work, cannot pass medications or transport residents",
        impact: "beneficial",
        visual: { old: "👤 18+ Only", new: "👥 16+ with Conditions" },
        timeline: "Immediate",
        cost: "$0",
        action: "If hiring teens: obtain parental consent, ensure adult supervision, complete training, restrict from meds/transport",
        source: "LARA Key Highlight #4"
      },
      {
        id: 'family-furniture',
        icon: Bed,
        title: "Residents Can Bring Own Furniture",
        oldRule: "Licensee must provide furnishings",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.661(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee required to provide all bedroom furnishings per rule specifications",
        newText: "Residents now allowed to bring their own bedroom furnishings instead of licensee-provided items",
        impact: "beneficial",
        visual: { old: "🛏️ Facility Provides", new: "🛋️ Resident Choice" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update admission policies to allow resident-owned furniture; ensure safety standards met",
        source: "LARA Key Highlight #13"
      },
      {
        id: 'family-funds',
        icon: DollarSign,
        title: "Resident Funds Increased & Simplified",
        oldRule: "R 400.1421",
        oldRuleUrl: "/family_home_rules.pdf",
        newRule: "R 400.637(4)(7)(8)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Maximum $200 in non-bank funds per resident; $20 immediate access; must use Resident Funds I and II forms",
        newText: "Maximum $400 in non-bank funds per resident; $40 immediate access; no longer required to use Resident Funds I and II forms - may create own forms",
        impact: "beneficial",
        visual: { old: "💵 $200/$20 + Mandated Forms", new: "💰 $400/$40 + Custom Forms" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update resident care agreements; may create custom tracking forms; increase petty cash limits",
        source: "LARA Key Highlight #5"
      }
    ],
    small: [
      // HIGH IMPACT
      {
        id: 'small-training-required',
        icon: GraduationCap,
        title: "AFC New Provider Training Required",
        oldRule: "R 400.14203",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.627(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee and administrator training requirements existed but no specific AFC New Provider Training mandate",
        newText: "All licensees and administrators must complete AFC New Provider Training within 6 months of license issuance or hire; once completed, doesn't need repeating if documentation exists",
        impact: "high",
        visual: { old: "📋 No Training", new: "🎓 Mandatory Training" },
        timeline: "6 months from license/hire",
        cost: "$0 (free training)",
        action: "Register for training notifications; complete within 6 months; keep certificates in personnel files",
        source: "LARA Key Highlight #1"
      },
      {
        id: 'small-emergency-prep',
        icon: Bell,
        title: "Emergency Preparedness Plan (All-Hazards)",
        oldRule: "R 400.14318",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.619",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Required emergency plan with quarterly practice across day/evening/sleeping shifts; staff and resident familiarity with procedures",
        newText: "All-hazards emergency preparedness plan required with explicit plan components including severe weather, extended utility outage, alternate care location, and limited mobility methods. Staff trained at hire and quarterly. Plan practiced quarterly on each shift (7am-3pm, 3pm-11pm, 11pm-7am). Records maintained 2 years.",
        impact: "high",
        visual: { old: "📅 Quarterly (Fire-Focused)", new: "📅 All-Hazards, Per Shift, Quarterly" },
        timeline: "Quarterly (every 3 months)",
        cost: "Staff time",
        action: "Create/maintain written Emergency Preparedness Plan covering all hazards (fire, weather, utility outage, alternate care location); train staff at hire and quarterly; practice plan quarterly on each shift (7-3, 3-11, 11-7); document resident-specific assistance needs and evacuation methods; ensure shelter-in-place and evacuation/temporary housing planning is covered; retain all training and drill records 2 years",
        source: "LARA Key Highlight #16 + MDHHS Emergency Planning Toolkit"
      },
      {
        id: 'small-training',
        icon: BookOpen,
        title: "Enhanced Staff Training Requirements",
        oldRule: "R 400.14204",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.629(5)(a)-(i)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Training in first aid, CPR, medication, infection control, behavior management, resident rights",
        newText: "Must now also include: food safety (storage, preparation, distribution, serving), nutrition and special diets, prevention of communicable diseases",
        impact: "high",
        visual: { old: "📚 6 Topics", new: "📚 9 Topics" },
        timeline: "Next training cycle",
        cost: "$100-300/staff",
        action: "Add food safety, nutrition, and communicable disease modules to training programs",
        source: "AI Analysis + LARA Highlight"
      },
      {
        id: 'small-personnel',
        icon: ClipboardList,
        title: "Written Personnel Policies Required",
        oldRule: "R 400.14207",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.701(1)(a)-(f)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Personnel policies recommended but details not mandated",
        newText: "Must have written policies: mandatory reporting, prohibited practices, confidentiality, personnel records, training, resident rights",
        impact: "high",
        visual: { old: "📝 Recommended", new: "📋 Mandated Policies" },
        timeline: "Immediate",
        cost: "$0-500",
        action: "Formalize and document all required personnel policies using LARA templates",
        source: "AI Analysis"
      },
      // MEDIUM IMPACT
      {
        id: 'small-visitation',
        icon: Users,
        title: "Visitation & Overnight Guest Policy",
        oldRule: "Informal arrangements",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.687(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Visitation handled informally without written policy",
        newText: "Written visitation policy required, including whether overnight visitors are allowed; roommate consent required for overnight visitors in semi-private rooms; overnight visitors count toward licensed capacity",
        impact: "medium",
        visual: { old: "👥 Informal", new: "📋 Written Policy + Consent" },
        timeline: "30 days",
        cost: "$0",
        action: "Develop written visitation policy addressing overnight guests; ensure capacity limits not exceeded; obtain roommate consent procedures",
        source: "LARA Key Highlight #3"
      },
      {
        id: 'small-hygiene',
        icon: Shirt,
        title: "Hygiene & Clothing Requirements",
        oldRule: "General provisions",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.677(2)(a)-(d)(i)-(viii)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic hygiene and clothing provisions required",
        newText: "Licensee must ensure residents receive or have access to comprehensive list of specified hygiene items and adequate clothing as detailed in rule subsections",
        impact: "medium",
        visual: { old: "🧴 Basic Items", new: "🧴 Comprehensive List" },
        timeline: "30 days",
        cost: "Variable",
        action: "Review R 400.677(2) requirements; ensure all specified hygiene and clothing items available to residents",
        source: "LARA Key Highlight #2"
      },
      {
        id: 'small-nutrition-standards',
        icon: ClipboardList,
        title: "Updated Nutrition Standards",
        oldRule: "R 400.14313 (legacy)",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.663",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Weekly menus + posting required; menus kept 1 calendar year; older RDA-era nutrition references; prescribed diets required physician authorization",
        newText: "DGA 2020–2025 standard adopted; weekly menus + posting + substitution documentation continues; menu records reduced to 90 days retention; prescribed diets now accepted from appropriately licensed health care professional",
        impact: "medium",
        visual: { old: "📋 RDA + 1-Year Records", new: "📋 DGA 2020-2025 + 90-Day Records" },
        timeline: "Immediate",
        cost: "$0",
        action: "Align menus to DGA 2020–2025; reduce menu retention to 90 days; update special diet workflow to accept orders from licensed health care professionals",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'small-food-service',
        icon: Tag,
        title: "Additional Food Service Requirements",
        oldRule: "R 400.14402 (legacy)",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.665; R 400.663(7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Safe food sources, contamination protection, 40°F/140°F temperature controls, thermometers, equipment/utensil sanitation, clean food-prep surfaces required",
        newText: "Prior controls continue; adds explicit repackaged-food labeling + discard dating (≤7 days; day 1 = open/prep); allergen indication required when applicable",
        impact: "medium",
        visual: { old: "🌡️ Temps + Sanitation", new: "🏷️ Label + Date + Allergen" },
        timeline: "Immediate",
        cost: "$0 (labels)",
        action: "Implement labeling/discard dating for repackaged perishables; add allergen labeling; continue temperature + sanitation controls",
        source: "LARA Key Highlight #11"
      },
      // BENEFICIAL
      {
        id: 'small-tb-eliminated',
        icon: Stethoscope,
        title: "TB Testing No Longer Mandatory",
        oldRule: "Blanket TB testing required",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.631(5)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All staff and residents required to undergo TB testing",
        newText: "Blanket TB testing replaced with risk-based health screening approach",
        impact: "beneficial",
        visual: { old: "💉 All Tested", new: "📋 Risk-Based Screening" },
        timeline: "Immediate",
        cost: "Cost savings",
        action: "Update health screening procedures to risk-based assessment; document screening process",
        source: "LARA Key Highlight #6"
      },
      {
        id: 'small-teen-staff',
        icon: UserPlus,
        title: "Can Now Hire 16-17 Year Olds",
        oldRule: "Staff must be 18+",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.629(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All direct care staff must be 18 years or older",
        newText: "Can employ 16-17 year olds as direct care staff and count toward ratios; requires: parental consent for background check, direct supervision by adult 18+, training before independent work, cannot pass medications or transport residents",
        impact: "beneficial",
        visual: { old: "👤 18+ Only", new: "👥 16+ with Conditions" },
        timeline: "Immediate",
        cost: "$0",
        action: "If hiring teens: obtain parental consent, ensure adult supervision, complete training, restrict from meds/transport",
        source: "LARA Key Highlight #4"
      },
      {
        id: 'small-furniture',
        icon: Bed,
        title: "Residents Can Bring Own Furniture",
        oldRule: "Licensee must provide furnishings",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.661(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee required to provide all bedroom furnishings per rule specifications",
        newText: "Residents now allowed to bring their own bedroom furnishings instead of licensee-provided items",
        impact: "beneficial",
        visual: { old: "🛏️ Facility Provides", new: "🛋️ Resident Choice" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update admission policies to allow resident-owned furniture; ensure safety standards met",
        source: "LARA Key Highlight #13"
      },
      {
        id: 'small-funds',
        icon: DollarSign,
        title: "Resident Funds Increased & Simplified",
        oldRule: "R 400.14315",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.637(4)(7)(8)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Maximum $200 in non-bank funds per resident; $20 immediate access; must use Resident Funds I and II forms",
        newText: "Maximum $400 in non-bank funds per resident; $40 immediate access; no longer required to use Resident Funds I and II forms - may create own forms",
        impact: "beneficial",
        visual: { old: "💵 $200/$20 + Mandated Forms", new: "💰 $400/$40 + Custom Forms" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update resident care agreements; may create custom tracking forms; increase petty cash limits",
        source: "LARA Key Highlight #5"
      },
      {
        id: 'small-dietary',
        icon: Scale,
        title: "Updated Dietary Guidelines & Simplified Records",
        oldRule: "R 400.14313",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.663(4) & (7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Meals per outdated dietary standards; menu records kept 1 year",
        newText: "Meals must follow Dietary Guidelines for Americans 2020-2025 edition; menu records kept 90 days (reduced from 1 year); written menus in advance; resident input required; cultural/religious preferences respected",
        impact: "beneficial",
        visual: { old: "📋 1980s Standards + 1-Year Records", new: "📊 2020-2025 Standards + 90-Day Records" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update menu planning to 2020-2025 guidelines; reduce menu record retention to 90 days",
        source: "LARA Key Highlight #15"
      },
      {
        id: 'small-fire-wireless',
        icon: Shield,
        title: "Fire Safety - Wireless Systems Allowed",
        oldRule: "Fire Safety Rules Part 5",
        oldRuleUrl: "/fire_safety_rules_family_small.pdf",
        newRule: "R 400.727(7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Smoke alarms must be powered by facility electrical service",
        newText: "For new construction, conversions, or licensing type changes: interconnected smoke alarms powered by building electrical OR wireless system compliant with NFPA 72 (2019 edition, section 29.10.8.1 et seq.)",
        impact: "beneficial",
        visual: { old: "🔌 Hardwired Only", new: "🔌 Hardwired or Wireless NFPA 72" },
        timeline: "For new construction/conversions",
        cost: "$500-1,500",
        action: "Consider wireless NFPA 72 system for new construction or conversions; verify compliance with NFPA 72-2019",
        source: "LARA Key Highlight #7"
      },
      // NO CHANGE
      {
        id: 'small-ratios',
        icon: Users,
        title: "Staffing Ratio (No Change)",
        oldRule: "R 400.14206",
        oldRuleUrl: "/small_group_home_rules.pdf",
        newRule: "R 400.633(1)(b)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "1 staff awake for 1-6 residents; 2 staff awake for 7+ residents",
        newText: "1 staff awake for 1-6 residents; 2 staff awake for 7+ residents",
        impact: "none",
        visual: { old: "👤/👥 Same", new: "👤/👥 Unchanged" },
        timeline: "N/A",
        cost: "$0",
        action: "No action required - staffing requirements remain the same",
        source: "AI Analysis"
      }
    ],
    large: [
      // HIGH IMPACT
      {
        id: 'large-training-required',
        icon: GraduationCap,
        title: "AFC New Provider Training Required",
        oldRule: "R 400.15203",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.627(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee and administrator training requirements existed but no specific AFC New Provider Training mandate",
        newText: "All licensees and administrators must complete AFC New Provider Training within 6 months of license issuance or hire; once completed, doesn't need repeating if documentation exists",
        impact: "high",
        visual: { old: "📋 No Training", new: "🎓 Mandatory Training" },
        timeline: "6 months from license/hire",
        cost: "$0 (free training)",
        action: "Register for training notifications; complete within 6 months; keep certificates in personnel files",
        source: "LARA Key Highlight #1"
      },
      {
        id: 'large-emergency-prep',
        icon: Bell,
        title: "Emergency Preparedness Plan (All-Hazards)",
        oldRule: "R 400.15318",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.619",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Required emergency plan, staff familiarity, and practice once per quarter across day/evening/sleeping shifts; records available on request",
        newText: "All-hazards emergency preparedness plan required (fire, utility outage, alternate care location, limited mobility methods). Staff trained at hire and quarterly. Plan practiced quarterly on each shift (7am-3pm, 3pm-11pm, 11pm-7am). Records maintained 2 years.",
        impact: "high",
        visual: { old: "📅 Quarterly (Fire-Focused)", new: "📅 All-Hazards, Per Shift, Quarterly" },
        timeline: "Quarterly (every 3 months)",
        cost: "Staff time",
        action: "Create/maintain written Emergency Preparedness Plan covering all hazards (fire, weather, utility outage, alternate care location); train staff at hire and quarterly; practice plan quarterly on each shift (7-3, 3-11, 11-7); document resident-specific assistance needs and evacuation methods (Appendix F supports documentation); ensure shelter-in-place and evacuation/temporary housing planning is covered; retain all training and drill records 2 years",
        source: "LARA Key Highlight #16 + MDHHS Emergency Planning Toolkit"
      },
      {
        id: 'large-training',
        icon: BookOpen,
        title: "Enhanced Staff Training",
        oldRule: "Similar to R 400.14204",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.629(5)(a)-(i)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Training required in resident care, medication, behavior management",
        newText: "Enhanced requirements: food safety, nutrition, special diets, communicable disease prevention added",
        impact: "high",
        visual: { old: "📚 Core Topics", new: "📚 Expanded Curriculum" },
        timeline: "Next training cycle",
        cost: "$100-300/staff",
        action: "Expand training curriculum to include food safety, nutrition, and disease prevention",
        source: "AI Analysis"
      },
      // MEDIUM IMPACT
      {
        id: 'large-visitation',
        icon: Users,
        title: "Visitation & Overnight Guest Policy",
        oldRule: "Informal arrangements",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.687(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Visitation handled informally without written policy",
        newText: "Written visitation policy required, including whether overnight visitors are allowed; roommate consent required for overnight visitors in semi-private rooms; overnight visitors count toward licensed capacity",
        impact: "medium",
        visual: { old: "👥 Informal", new: "📋 Written Policy + Consent" },
        timeline: "30 days",
        cost: "$0",
        action: "Develop written visitation policy addressing overnight guests; ensure capacity limits not exceeded; obtain roommate consent procedures",
        source: "LARA Key Highlight #3"
      },
      {
        id: 'large-hygiene',
        icon: Shirt,
        title: "Hygiene & Clothing Requirements",
        oldRule: "General provisions",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.677(2)(a)-(d)(i)-(viii)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic hygiene and clothing provisions required",
        newText: "Licensee must ensure residents receive or have access to comprehensive list of specified hygiene items and adequate clothing as detailed in rule subsections",
        impact: "medium",
        visual: { old: "🧴 Basic Items", new: "🧴 Comprehensive List" },
        timeline: "30 days",
        cost: "Variable",
        action: "Review R 400.677(2) requirements; ensure all specified hygiene and clothing items available to residents",
        source: "LARA Key Highlight #2"
      },
      {
        id: 'large-nutrition-standards',
        icon: ClipboardList,
        title: "Updated Nutrition Standards",
        oldRule: "R 400.15313 (legacy)",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.663",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Weekly menus + posting required; menus kept 1 calendar year; older nutrition references; physician-only special diet prescribing",
        newText: "DGA 2020–2025 standard adopted; weekly menus + posting + substitution documentation continues; menu records reduced to 90 days; prescribed diets now accepted from appropriately licensed health care professional",
        impact: "medium",
        visual: { old: "📋 RDA + 1-Year Records", new: "📋 DGA 2020-2025 + 90-Day Records" },
        timeline: "Immediate",
        cost: "$0",
        action: "Align menus to DGA 2020–2025; reduce menu retention to 90 days; update special diet workflow for broader health care professional prescribing",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'large-food-service',
        icon: Tag,
        title: "Additional Food Service Requirements",
        oldRule: "R 400.15402 (legacy)",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.665; R 400.663(7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Explicit food safety controls: 40°F/140°F temps, thermometers, equipment sanitation, clean food-prep surfaces required",
        newText: "Prior controls continue; adds explicit repackaged-food labeling + discard dating (≤7 days; day 1 = open/prep); allergen indication required when applicable",
        impact: "medium",
        visual: { old: "🌡️ Temps + Sanitation", new: "🏷️ Label + Date + Allergen" },
        timeline: "Immediate",
        cost: "$0 (labels)",
        action: "Implement labeling/discard dating for repackaged perishables + allergen indication; confirm thermometers installed",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'large-ratios',
        icon: Users,
        title: "Staffing Ratios Clarified",
        oldRule: "R 400.15206",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.633(1)(a)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Complex ratio calculations based on resident needs",
        newText: "Minimum 2 staff awake on duty; ratios based on resident assessment and capabilities",
        impact: "medium",
        visual: { old: "👥 Variable Ratios", new: "👥 Minimum 2 + Assessment" },
        timeline: "Immediate",
        cost: "Variable",
        action: "Review staffing patterns against new requirements; adjust schedules if needed",
        source: "AI Analysis"
      },
      {
        id: 'large-fire-assessment',
        icon: Shield,
        title: "Fire Evacuation Assessments Required",
        oldRule: "General fire safety requirements",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.715(3)-(4)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "General evacuation planning required",
        newText: "Must conduct individual evacuation assessments for each resident; document mobility level and assistance needs",
        impact: "medium",
        visual: { old: "📋 General Plan", new: "📋 Individual Assessments" },
        timeline: "30 days for existing residents",
        cost: "$0",
        action: "Conduct and document individual evacuation assessments for all residents; use Appendix F guidance to support evacuation risk and mobility documentation",
        source: "AI Analysis"
      },
      // BENEFICIAL
      {
        id: 'large-tb-eliminated',
        icon: Stethoscope,
        title: "TB Testing No Longer Mandatory",
        oldRule: "Blanket TB testing required",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.631(5)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All staff and residents required to undergo TB testing",
        newText: "Blanket TB testing replaced with risk-based health screening approach",
        impact: "beneficial",
        visual: { old: "💉 All Tested", new: "📋 Risk-Based Screening" },
        timeline: "Immediate",
        cost: "Cost savings",
        action: "Update health screening procedures to risk-based assessment; document screening process",
        source: "LARA Key Highlight #6"
      },
      {
        id: 'large-teen-staff',
        icon: UserPlus,
        title: "Can Now Hire 16-17 Year Olds",
        oldRule: "Staff must be 18+",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.629(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All direct care staff must be 18 years or older",
        newText: "Can employ 16-17 year olds as direct care staff and count toward ratios; requires: parental consent for background check, direct supervision by adult 18+, training before independent work, cannot pass medications or transport residents",
        impact: "beneficial",
        visual: { old: "👤 18+ Only", new: "👥 16+ with Conditions" },
        timeline: "Immediate",
        cost: "$0",
        action: "If hiring teens: obtain parental consent, ensure adult supervision, complete training, restrict from meds/transport",
        source: "LARA Key Highlight #4"
      },
      {
        id: 'large-furniture',
        icon: Bed,
        title: "Residents Can Bring Own Furniture",
        oldRule: "Licensee must provide furnishings",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.661(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee required to provide all bedroom furnishings per rule specifications",
        newText: "Residents now allowed to bring their own bedroom furnishings instead of licensee-provided items",
        impact: "beneficial",
        visual: { old: "🛏️ Facility Provides", new: "🛋️ Resident Choice" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update admission policies to allow resident-owned furniture; ensure safety standards met",
        source: "LARA Key Highlight #13"
      },
      {
        id: 'large-funds',
        icon: DollarSign,
        title: "Resident Funds Increased & Simplified",
        oldRule: "Similar to small group",
        oldRuleUrl: "/large_group_home_rules.pdf",
        newRule: "R 400.637(4)(7)(8)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Maximum $200 in non-bank funds per resident; $20 immediate access; must use Resident Funds I and II forms",
        newText: "Maximum $400 in non-bank funds per resident; $40 immediate access; no longer required to use Resident Funds I and II forms - may create own forms",
        impact: "beneficial",
        visual: { old: "💵 $200/$20 + Mandated Forms", new: "💰 $400/$40 + Custom Forms" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update resident care agreements; may create custom tracking forms; increase petty cash limits",
        source: "LARA Key Highlight #5"
      }
    ],
    congregate: [
      // HIGH IMPACT
      {
        id: 'congregate-training-required',
        icon: GraduationCap,
        title: "AFC New Provider Training Required",
        oldRule: "R 400.2402",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.627(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee and administrator training requirements existed but no specific AFC New Provider Training mandate",
        newText: "All licensees and administrators must complete AFC New Provider Training within 6 months of license issuance or hire; once completed, doesn't need repeating if documentation exists",
        impact: "high",
        visual: { old: "📋 No Training", new: "🎓 Mandatory Training" },
        timeline: "6 months from license/hire",
        cost: "$0 (free training)",
        action: "Register for training notifications; complete within 6 months; keep certificates in personnel files",
        source: "LARA Key Highlight #1"
      },
      {
        id: 'congregate-emergency-prep',
        icon: Bell,
        title: "Emergency Preparedness Plan (All-Hazards)",
        oldRule: "R 400.2461",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.619",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Written emergency plan; 4 fire drills/year; annual plan review",
        newText: "All-hazards emergency preparedness plan required with explicit components (fire, utility outage, alternate care location, limited mobility methods). Staff trained at hire and quarterly. Plan practiced quarterly on each shift (7am-3pm, 3pm-11pm, 11pm-7am). Records maintained 2 years.",
        impact: "high",
        visual: { old: "📅 4 Drills/Year + Annual Review", new: "📅 All-Hazards, Per Shift, Quarterly" },
        timeline: "Quarterly (every 3 months)",
        cost: "Staff time",
        action: "Update emergency preparedness plan to meet all-hazards requirements (fire, weather, utility outage, alternate care location); train staff at hire and quarterly; practice plan quarterly on each shift (7-3, 3-11, 11-7); document resident-specific assistance needs and evacuation methods; ensure shelter-in-place and evacuation/temporary housing planning is robust using Michigan's AFC/HFA toolkit; retain all training and drill records 2 years",
        source: "LARA Key Highlight #16 + MDHHS Emergency Planning Toolkit"
      },
      {
        id: 'congregate-discharge',
        icon: FileText,
        title: "Emergency Discharge Procedures Enhanced",
        oldRule: "R 400.2403",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.687",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Emergency discharge with 24-hour notice to agency",
        newText: "Enhanced emergency discharge procedures with clearer notification requirements and resident rights protections",
        impact: "high",
        visual: { old: "⚡ Basic Notice", new: "📋 Enhanced Procedures" },
        timeline: "Immediate",
        cost: "$0",
        action: "Review and update emergency discharge procedures; train staff on new protocols",
        source: "AI Analysis"
      },
      {
        id: 'congregate-incident',
        icon: AlertTriangle,
        title: "Incident Reporting Streamlined",
        oldRule: "R 400.2404a",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.693",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Multiple incident report forms and timelines",
        newText: "Unified incident reporting with 24-hour electronic submission requirement",
        impact: "high",
        visual: { old: "📝 Multiple Forms", new: "💻 Single Electronic System" },
        timeline: "Immediate",
        cost: "$0",
        action: "Implement electronic incident reporting system; train staff on 24-hour requirement",
        source: "AI Analysis"
      },
      // MEDIUM IMPACT
      {
        id: 'congregate-visitation',
        icon: Users,
        title: "Visitation & Overnight Guest Policy",
        oldRule: "Informal arrangements",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.687(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Visitation handled informally without written policy",
        newText: "Written visitation policy required, including whether overnight visitors are allowed; roommate consent required for overnight visitors in semi-private rooms; overnight visitors count toward licensed capacity",
        impact: "medium",
        visual: { old: "👥 Informal", new: "📋 Written Policy + Consent" },
        timeline: "30 days",
        cost: "$0",
        action: "Develop written visitation policy addressing overnight guests; ensure capacity limits not exceeded; obtain roommate consent procedures",
        source: "LARA Key Highlight #3"
      },
      {
        id: 'congregate-hygiene',
        icon: Shirt,
        title: "Hygiene & Clothing Requirements",
        oldRule: "General provisions",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.677(2)(a)-(d)(i)-(viii)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic hygiene and clothing provisions required",
        newText: "Licensee must ensure residents receive or have access to comprehensive list of specified hygiene items and adequate clothing as detailed in rule subsections",
        impact: "medium",
        visual: { old: "🧴 Basic Items", new: "🧴 Comprehensive List" },
        timeline: "30 days",
        cost: "Variable",
        action: "Review R 400.677(2) requirements; ensure all specified hygiene and clothing items available to residents",
        source: "LARA Key Highlight #2"
      },
      {
        id: 'congregate-nutrition-standards',
        icon: ClipboardList,
        title: "Updated Nutrition Standards",
        oldRule: "R 400.2471, R 400.2474 (legacy)",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.663",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "3 meals/day; ≤15 hours between evening and morning meal; menus 3 days in advance; no explicit 90-day retention; older nutrition references",
        newText: "DGA 2020–2025 standard adopted; meal timing tightened to ≤14 hours; menus now 1 week in advance; substitutions documented; menu records kept 90 days; diets prescribed by appropriately licensed health care professional",
        impact: "medium",
        visual: { old: "🍽️ 15hrs + 3-Day Menus", new: "📋 DGA + 14hrs + Weekly Menus + 90-Day Records" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update meal timing to ≤14 hours; shift to weekly (1-week ahead) menu planning + posting + substitution documentation; retain menus 90 days; align to DGA 2020–2025; update special diet workflow",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'congregate-food-service',
        icon: Tag,
        title: "Additional Food Service Requirements",
        oldRule: "R 400.2472, R 400.2473, R 400.2475 (legacy)",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.665; R 400.663(7)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Safe storage temps, contamination protection, proper equipment, qualified food-prep staff required at a high level; no explicit label/discard dating",
        newText: "Detailed operational controls: 40°F/140°F holding temps, thermometers, equipment/utensils cleaned + air dried; adds repackaged-food labeling + discard dating (≤7 days; day 1 = open/prep); allergen indication required",
        impact: "medium",
        visual: { old: "🌡️ General Safety Controls", new: "🏷️ Label + Date + Temp + Allergen" },
        timeline: "Immediate",
        cost: "$0 (labels)",
        action: "Implement repackaged perishable labeling + discard dating + allergen indication; ensure thermometers installed; clean + air dry utensils/equipment after each use",
        source: "LARA Key Highlight #11"
      },
      {
        id: 'congregate-ratios',
        icon: Users,
        title: "Staffing Ratios Standardized",
        oldRule: "R 400.2407",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.633(1)(a)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Complex ratio based on unit size and resident dependency",
        newText: "Minimum staffing based on resident assessment; clearer guidelines for determining adequate staffing levels",
        impact: "medium",
        visual: { old: "👥 Complex Formulas", new: "👥 Assessment-Based" },
        timeline: "Immediate",
        cost: "Variable",
        action: "Review staffing against new assessment-based requirements; adjust as needed",
        source: "AI Analysis"
      },
      {
        id: 'congregate-rights',
        icon: Scale,
        title: "Resident Rights Expanded",
        oldRule: "R 400.2412, R 400.2414",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.681",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Basic resident rights and grievance procedures",
        newText: "Enhanced resident rights including communication privacy, personal choice, and expanded grievance protections",
        impact: "medium",
        visual: { old: "📜 Basic Rights", new: "📜 Enhanced Rights" },
        timeline: "30 days",
        cost: "$0",
        action: "Update resident rights materials; train staff on expanded protections; post updated rights",
        source: "AI Analysis"
      },
      // BENEFICIAL
      {
        id: 'congregate-tb-eliminated',
        icon: Stethoscope,
        title: "TB Testing No Longer Mandatory",
        oldRule: "Blanket TB testing required",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.631(5)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All staff and residents required to undergo TB testing",
        newText: "Blanket TB testing replaced with risk-based health screening approach",
        impact: "beneficial",
        visual: { old: "💉 All Tested", new: "📋 Risk-Based Screening" },
        timeline: "Immediate",
        cost: "Cost savings",
        action: "Update health screening procedures to risk-based assessment; document screening process",
        source: "LARA Key Highlight #6"
      },
      {
        id: 'congregate-teen-staff',
        icon: UserPlus,
        title: "Can Now Hire 16-17 Year Olds",
        oldRule: "Staff must be 18+",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.629(2)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "All direct care staff must be 18 years or older",
        newText: "Can employ 16-17 year olds as direct care staff and count toward ratios; requires: parental consent for background check, direct supervision by adult 18+, training before independent work, cannot pass medications or transport residents",
        impact: "beneficial",
        visual: { old: "👤 18+ Only", new: "👥 16+ with Conditions" },
        timeline: "Immediate",
        cost: "$0",
        action: "If hiring teens: obtain parental consent, ensure adult supervision, complete training, restrict from meds/transport",
        source: "LARA Key Highlight #4"
      },
      {
        id: 'congregate-furniture',
        icon: Bed,
        title: "Residents Can Bring Own Furniture",
        oldRule: "Licensee must provide furnishings",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.661(3)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Licensee required to provide all bedroom furnishings per rule specifications",
        newText: "Residents now allowed to bring their own bedroom furnishings instead of licensee-provided items",
        impact: "beneficial",
        visual: { old: "🛏️ Facility Provides", new: "🛋️ Resident Choice" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update admission policies to allow resident-owned furniture; ensure safety standards met",
        source: "LARA Key Highlight #13"
      },
      {
        id: 'congregate-funds',
        icon: DollarSign,
        title: "Financial Management Standardized & Simplified",
        oldRule: "R 400.2421-2424",
        oldRuleUrl: "/congregate_rules.pdf",
        newRule: "R 400.637(4)(7)(8)",
        newRuleUrl: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/Folder1/AFC-Ruleset-Final.pdf",
        oldText: "Maximum $200 in non-bank funds per resident; $20 immediate access; complex financial management requirements; must use Resident Funds I and II forms",
        newText: "Maximum $400 in non-bank funds per resident; $40 immediate access; simplified financial management; no longer required to use Resident Funds I and II forms - may create own forms",
        impact: "beneficial",
        visual: { old: "💵 $200/$20 + Complex Rules + Mandated Forms", new: "💰 $400/$40 + Simplified + Custom Forms" },
        timeline: "Immediate",
        cost: "$0",
        action: "Update resident care agreements; may create custom tracking forms; increase petty cash limits; simplify financial procedures",
        source: "LARA Key Highlight #5"
      }
    ]
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'beneficial' | 'none' | string) => {
    switch(impact) {
      case 'high': return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', badge: 'bg-red-100', icon: '⚠️' };
      case 'medium': return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-900', badge: 'bg-yellow-100', icon: '⚡' };
      case 'beneficial': return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900', badge: 'bg-green-100', icon: '✅' };
      case 'none': return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-900', badge: 'bg-gray-100', icon: '○' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-900', badge: 'bg-gray-100', icon: '○' };
    }
  };

  const currentType = facilityTypes[selectedFacility];
  const currentChanges = detailedChanges[selectedFacility];

  // Calculate statistics
  const impactCounts = {
    high: currentChanges.filter(c => c.impact === 'high').length,
    medium: currentChanges.filter(c => c.impact === 'medium').length,
    beneficial: currentChanges.filter(c => c.impact === 'beneficial').length,
    none: currentChanges.filter(c => c.impact === 'none').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <div className="text-4xl">🏛️</div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Michigan AFC Rules Comparison
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            November 2025 Unified Ruleset - Interactive Impact Analysis
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>AI Consensus Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <a href="https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/afc/Key-Highlights-of-New-Ruleset.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">Official LARA Key Highlights</a>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Implementation Guidance</span>
            </div>
          </div>
        </div>

        {/* Facility Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(facilityTypes) as [FacilityType, typeof facilityTypes[FacilityType]][]).map(([key, type]) => {
            const isSelected = selectedFacility === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedFacility(key);
                  setExpandedChange(null);
                }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? `${type.borderColor} ${type.bgColor} shadow-lg scale-105`
                    : 'border-gray-200 bg-white hover:shadow-md hover:scale-102'
                }`}
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl">{type.illustration}</div>
                  <div>
                    <div className={`font-bold ${isSelected ? type.textColor : 'text-gray-900'}`}>
                      {type.name}
                    </div>
                    <div className="text-sm text-gray-600">{type.capacity}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Impact Summary */}
        <div className={`${currentType.bgColor} ${currentType.borderColor} border-2 rounded-xl p-6`}>
          <h2 className={`text-2xl font-bold ${currentType.textColor} mb-4 flex items-center gap-2`}>
            <div className="text-3xl">{currentType.illustration}</div>
            {currentType.name} - Change Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{impactCounts.high}</div>
              <div className="text-sm text-gray-600">High Impact</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{impactCounts.medium}</div>
              <div className="text-sm text-gray-600">Medium Impact</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{impactCounts.beneficial}</div>
              <div className="text-sm text-gray-600">Beneficial</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-600">{impactCounts.none}</div>
              <div className="text-sm text-gray-600">No Change</div>
            </div>
          </div>
        </div>

        {/* Change Cards */}
        <div className="space-y-4">
          {currentChanges.map((change) => {
            const colors = getImpactColor(change.impact);
            const Icon = change.icon;
            const isExpanded = expandedChange === change.id;

            return (
              <div
                key={change.id}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl overflow-hidden transition-all ${
                  isExpanded ? 'shadow-xl' : 'shadow-md hover:shadow-lg'
                }`}
              >
                {/* Card Header - Always Visible */}
                <button
                  onClick={() => setExpandedChange(isExpanded ? null : change.id)}
                  className="w-full p-6 text-left transition-colors hover:bg-white/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${colors.badge} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className={`text-xl font-bold ${colors.text}`}>{change.title}</h3>
                          <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-semibold`}>
                            {colors.icon} {change.impact.toUpperCase()}
                          </span>
                          {change.source && change.source.includes('LARA') && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                              🎯 LARA Official
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-4 h-4" />
                            <span>{change.timeline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-4 h-4" />
                            <span>{change.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${colors.badge} p-2 rounded-lg transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 border-t-2 border-current pt-6">
                    {/* Old vs New Comparison */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                        <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Minus className="w-4 h-4" />
                          OLD RULE: {change.oldRule}
                        </div>
                        <p className="text-gray-600">{change.oldText}</p>
                        <a
                          href={change.oldRuleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center gap-1"
                        >
                          View PDF <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                      <div className={`bg-white rounded-lg p-4 border-2 ${colors.border}`}>
                        <div className={`font-semibold ${colors.text} mb-2 flex items-center gap-2`}>
                          <TrendingUp className="w-4 h-4" />
                          NEW RULE: {change.newRule}
                        </div>
                        <p className="text-gray-700">{change.newText}</p>
                        <a
                          href={change.newRuleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center gap-1"
                        >
                          View PDF <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Visual Comparison */}
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-3">Quick Visual</div>
                      <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                          <div className="text-3xl mb-2">{change.visual.old}</div>
                          <div className="text-sm text-gray-600">Before</div>
                        </div>
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                        <div className="text-center">
                          <div className="text-3xl mb-2">{change.visual.new}</div>
                          <div className="text-sm text-gray-700 font-semibold">After</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Required */}
                    <div className={`${colors.badge} rounded-lg p-4`}>
                      <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        ACTION REQUIRED
                      </div>
                      <p className="text-gray-700">{change.action}</p>
                    </div>

                    {/* Source Attribution */}
                    {change.source && (
                      <div className="text-xs text-gray-600 italic">
                        Source: {change.source}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="font-bold text-amber-900 mb-2">Important Notes:</h3>
              <ul className="space-y-2 text-sm text-amber-800 list-disc list-inside">
                <li>This analysis synthesizes AI mappings from ChatGPT, Gemini, and Grok PLUS <a href="https://www.michigan.gov/lara/-/media/Project/Websites/lara/bchs/afc/Key-Highlights-of-New-Ruleset.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold hover:text-amber-700 underline">official LARA Key Highlights</a></li>
                <li>Always consult LARA directly for official guidance and clarifications</li>
                <li>Facilities licensed before specific dates may have grandfathered provisions</li>
                <li>Implementation timelines may vary - contact your LARA consultant</li>
                <li>Click each card to see detailed old vs. new rule comparisons</li>
                <li>This knowledge resource sponsored by <a href="https://jirehdigitalsolutions.com/" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold hover:text-amber-700 underline">Jireh Digital Solutions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AFCRulesInfographic;
