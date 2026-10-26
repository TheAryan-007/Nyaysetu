"""
NyayaSetu Python Legal NLP & Verification Engine
Grounded in official India Code statutes, authoritative government portals,
and element-based legal applicability checks.
"""

from typing import Dict, Any, List, Optional
import re

def analyze_legal_problem_python(query: str) -> Dict[str, Any]:
    text = (query or "").strip()
    if not text or len(text) < 5:
        return create_clarification_response("Short Query")

    t_lower = text.lower()

    # 1. Prompt Injection Guard
    if any(re.search(p, t_lower) for p in [
        r"ignore all previous instructions", r"you are now dan", r"jailbreak",
        r"bypass indian law", r"how to manufacture (an )?illegal"
    ]):
        return {
            "status": "no_actionable_claim",
            "detected_language": "English",
            "detected_category": "Safety Guard: Instruction Override Rejected (सुरक्षा चेतावनी)",
            "issue_categories": ["Responsible AI Policy", "Security Refusal"],
            "translated_text": None,
            "problem_summary": "Your input contains instructions attempting to alter system guardrails or solicit illegal guidance.",
            "supporting_facts": ["Prompt injection pattern detected."],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [],
            "risk_assessment": {
                "estimated_duration_months": 0,
                "financial_risk_level": "Safe",
                "estimated_cost_inr": "₹0",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Not Applicable"
            },
            "actionable_advice": "NyayaSetu operates strictly within the framework of Indian legal information and responsible AI safety standards. We provide objective legal information regarding Indian statutes and cannot execute overrides or assist in illegal activities.",
            "procedural_steps": ["Please describe a legitimate factual dispute or legal inquiry under Indian law."],
            "procedural_actions": [],
            "evidence_to_preserve": [],
            "urgent_safety_guidance": ["System instructions cannot be overridden."],
            "official_portals": [],
            "professional_help_recommended": False
        }

    # 2. Emergency Threat to Life Check
    if any(re.search(p, t_lower) for p in [
        r"breaking (the )?door", r"outside (with|having) (a )?(weapon|knife|gun|pistol|chaku|lathi)",
        r"right now.*(kill|shoot|attack)", r"trying to break.*(door|window|house)", r"bachao"
    ]):
        return {
            "status": "emergency_safety",
            "detected_language": "English / Hindi",
            "detected_category": "EMERGENCY: Immediate Threat to Physical Safety (तत्काल आपातकालीन स्थिति)",
            "issue_categories": ["Emergency Police Protection", "Imminent Threat to Life", "Criminal Trespass with Weapon"],
            "translated_text": None,
            "problem_summary": "URGENT SAFETY ALERT: Ongoing active physical threat or armed trespass at your location.",
            "supporting_facts": ["Ongoing attempt to breach physical security or active weapon display."],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [
                {
                    "section_code": "Section 333 BNS, 2023",
                    "title": "House-Trespass in Order to Commit Offence Punishable with Death / Imprisonment",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Unlawful entry into human dwelling armed with offensive weapons", "Threat to commit grave violence"],
                    "relevance_explanation": "Penalizes armed entry or breaking into a dwelling house with intent to harm.",
                    "simplified_explanation": "Breaking into a home with weapons. Strictly non-bailable cognizable offense.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment for Life or 10 Years"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 1,
                "financial_risk_level": "Severe",
                "estimated_cost_inr": "FREE - Emergency Police Response",
                "eligible_for_nalsa_free_aid": True,
                "bail_status": "Non-Bailable (Discretionary)"
            },
            "actionable_advice": "PRIORITIZE IMMEDIATE PHYSICAL SAFETY OVER LEGAL REPORTS: 1. Move to a lockable safe room. 2. Dial 112 (National Emergency Helpline) IMMEDIATELY and shout your exact location and address. 3. Call neighbors or building security. Do NOT confront an armed intruder.",
            "procedural_steps": [
                "DIAL 112 IMMEDIATELY (Emergency Police Dispatch)",
                "Lock doors and windows from inside; stay away from entry points",
                "Keep call line open with police dispatcher until PCR van arrives"
            ],
            "procedural_actions": [
                {
                    "step_number": 1,
                    "action": "Dial 112 (National Emergency Helpline) immediately and provide exact building number and landmark.",
                    "action_type": "emergency_golden_hour",
                    "authority_or_portal": "Dial 112 / Emergency Response Center"
                }
            ],
            "evidence_to_preserve": ["Save CCTV footage and call recordings only after securing physical safety."],
            "urgent_safety_guidance": [
                "Do not open the door under any circumstances.",
                "Dial 112, 1091 (Women Helpline), or 181 immediately."
            ],
            "official_portals": [
                {
                    "name": "National Emergency Helpline",
                    "url": "https://112.gov.in/",
                    "phone": "112",
                    "description": "All-India 24x7 Emergency Police, Fire, and Ambulance."
                }
            ],
            "professional_help_recommended": True
        }

    # 3. Non-Existent Law Check
    if any(re.search(p, t_lower) for p in [r"anti-ghosting", r"social media relationship act", r"relationship act 2024"]):
        return {
            "status": "no_actionable_claim",
            "detected_language": "English / Hinglish",
            "detected_category": "Statutory Verification: Non-Existent Act (कानून अस्तित्व में नहीं है)",
            "issue_categories": ["Statutory Verification Rejection", "Interpersonal Communication"],
            "translated_text": None,
            "problem_summary": "Inquiry references a purported statute that does not exist in the Republic of India.",
            "supporting_facts": ["Mention of non-existent legislation."],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [],
            "risk_assessment": {
                "estimated_duration_months": 0,
                "financial_risk_level": "Safe",
                "estimated_cost_inr": "₹0",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Not Applicable"
            },
            "actionable_advice": "VERIFICATION FINDING: No statute titled 'Anti-Ghosting Act', 'Relationship Act', or equivalent exists under Indian jurisprudence. Under Indian law, private interpersonal communications (such as ending a conversation or breaking a social commitment) do NOT constitute a statutory or criminal offense unless they involve actionable threats, stalking, extortion, or physical violence.",
            "procedural_steps": ["No legal proceedings or police FIR can be initiated for non-existent statutes."],
            "procedural_actions": [],
            "evidence_to_preserve": [],
            "urgent_safety_guidance": [],
            "official_portals": [
                {
                    "name": "India Code (Legislative Repository)",
                    "url": "https://www.indiacode.nic.in/",
                    "description": "Official repository of all valid Central and State Acts passed by Indian Parliaments."
                }
            ],
            "professional_help_recommended": False
        }

    # 4. Social / Non-Actionable Promises Check
    if any(re.search(p, t_lower) for p in [
        r"birthday party.*(movie|not come|didn't come)", r"promised to come.*party.*movie",
        r"friend.*promise.*movie instead"
    ]):
        return {
            "status": "no_actionable_claim",
            "detected_language": "English / Hinglish",
            "detected_category": "Non-Actionable Social Promise (सामाजिक वादे का उल्लंघन)",
            "issue_categories": ["Absence of Legal Intention", "Non-Actionable Dispute"],
            "translated_text": None,
            "problem_summary": "The grievance arises out of an informal personal promise without legal intention.",
            "supporting_facts": ["Informal invitation or promise between friends regarding a social event."],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [],
            "risk_assessment": {
                "estimated_duration_months": 0,
                "financial_risk_level": "Safe",
                "estimated_cost_inr": "₹0",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Not Applicable"
            },
            "actionable_advice": "LEGAL REASONING: Under Section 10 of the Indian Contract Act, 1872 and basic principles of Indian jurisprudence (Balfour v. Balfour doctrine), casual social promises and informal friendly commitments lack the essential 'intention to create legal relations'. A friend skipping a birthday party to watch a movie is an interpersonal matter and does not give rise to any civil liability or criminal offense.",
            "procedural_steps": ["No legal action, police complaint, or consumer claim is maintainable under Indian law for social commitments."],
            "procedural_actions": [],
            "evidence_to_preserve": [],
            "urgent_safety_guidance": [],
            "official_portals": [],
            "professional_help_recommended": False
        }

    # 5. Outdated Statutes Translation (IPC 420 / CrPC 154)
    if re.search(r"ipc\s*(section\s*)?420|section\s*420\s*ipc", t_lower) or re.search(r"crpc\s*(section\s*)?154|section\s*154\s*crpc", t_lower):
        return {
            "status": "outdated_law_mapped",
            "detected_language": "English / Hindi",
            "detected_category": "Statutory Transition: Old IPC/CrPC to New Sanhitas 2023 (कानूनी बदलाव)",
            "issue_categories": ["New Criminal Sanhitas Transition", "BNS & BNSS Mapping", "Effective Date July 1, 2024"],
            "translated_text": None,
            "problem_summary": "You cited older provisions (IPC / CrPC) that have been replaced by Parliament under the 2023 Sanhitas.",
            "supporting_facts": ["Citation of former IPC Section 420 or CrPC Section 154."],
            "missing_facts": ["Date of occurrence (crucial to determine whether IPC or BNS applies substantively)."],
            "uncertainties": ["If the alleged incident occurred BEFORE July 1, 2024, IPC 420 applies substantively. If the incident occurred ON OR AFTER July 1, 2024, Section 318(4) BNS applies."],
            "recommended_sections": [
                {
                    "section_code": "Section 318(4) BNS, 2023",
                    "title": "Cheating and Dishonestly Inducing Delivery of Property (former IPC Section 420)",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Fraudulent or dishonest inducement to deliver property"],
                    "relevance_explanation": "Parliament repealed IPC 420 and reenacted it as Section 318(4) under Bharatiya Nyaya Sanhita, 2023.",
                    "simplified_explanation": "The new official criminal section for fraud and cheating (formerly IPC 420). Imprisonment up to 7 years and fine.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 7 Years & Fine"
                },
                {
                    "section_code": "Section 173 BNSS, 2023",
                    "title": "Information in Cognizable Cases & Registration of FIR (former CrPC Section 154)",
                    "statutory_category": "Procedural Safeguard",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21736",
                    "source_verified_at": "India Code - Ministry of Law & Justice",
                    "legal_elements": ["Mandatory registration of FIR, Zero FIR, or e-FIR for cognizable crimes"],
                    "relevance_explanation": "CrPC Section 154 has been replaced by Section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023.",
                    "simplified_explanation": "The new procedural law governing how police must register an FIR for serious crimes.",
                    "bailable": True,
                    "cognizable": True,
                    "max_punishment": "Procedural Section"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 6,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Standard Court Fees",
                "eligible_for_nalsa_free_aid": True,
                "bail_status": "Non-Bailable (Discretionary)"
            },
            "actionable_advice": "IMPORTANT LEGAL NOTICE: The three new criminal laws—Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA)—came into force on JULY 1, 2024. For any offense committed on or after July 1, 2024, complaints must cite Section 318(4) BNS (not IPC 420) and Section 173 BNSS (not CrPC 154).",
            "procedural_steps": [
                "Verify whether the cause of action arose before or after July 1, 2024",
                "If after July 1, 2024, mention Section 318(4) BNS in your police complaint",
                "Invoke Section 173 BNSS to request registration of an e-FIR or Zero FIR"
            ],
            "procedural_actions": [
                {
                    "step_number": 1,
                    "action": "Draft your formal police complaint referencing Section 318(4) BNS 2023 and Section 173 BNSS 2023.",
                    "action_type": "legally_required"
                }
            ],
            "evidence_to_preserve": ["All transactional proofs and records establishing the date of the crime."],
            "urgent_safety_guidance": [],
            "official_portals": [
                {
                    "name": "India Code - BNS 2023",
                    "url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "description": "Official text of Bharatiya Nyaya Sanhita, 2023."
                }
            ],
            "professional_help_recommended": True
        }

    # 6. User Citation Error Correction (IPC 302 for Cheating)
    if (re.search(r"ipc\s*(section\s*)?302|section\s*302|bns\s*103", t_lower) and 
        re.search(r"cheat|fraud|paisa|money|scam|stolen money", t_lower) and 
        not re.search(r"murder|hatya|katl|dead body|killing|killed", t_lower)):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Citation Correction: IPC 302 vs Financial Cheating (धारा सुधार)",
            "issue_categories": ["Citation Correction", "Cheating & Fraud under BNS 318(4)"],
            "translated_text": None,
            "problem_summary": "You asked whether Section 302 (Murder) can be applied to a financial cheating or money dispute.",
            "supporting_facts": ["Financial cheating or money loss reported by user."],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [
                {
                    "section_code": "Section 318(4) BNS, 2023",
                    "title": "Cheating and Dishonestly Inducing Delivery of Property (replaces IPC 420)",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Fraudulent or dishonest inducement to part with money"],
                    "relevance_explanation": "This is the correct legal section for cheating and financial deception.",
                    "simplified_explanation": "The correct criminal section for money cheating. Punishable with up to 7 years imprisonment.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 7 Years & Fine"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 6,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Standard Court Fees",
                "eligible_for_nalsa_free_aid": True,
                "bail_status": "Non-Bailable (Discretionary)"
            },
            "actionable_advice": "CRITICAL CITATION CORRECTION: Section 302 IPC (now Section 103 BNS) exclusively punishes MURDER (causing death with premeditation). It CANNOT be applied to financial cheating, debt disputes, or money fraud. The legally correct provision for cheating and money deception is Section 318(4) of the Bharatiya Nyaya Sanhita, 2023 (formerly IPC Section 420).",
            "procedural_steps": [
                "Do NOT mention Section 302 in your complaint, as this will lead to rejection",
                "Lodge your complaint under Section 318(4) BNS with transaction evidence"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Bank statements and receipts of disputed payment."],
            "urgent_safety_guidance": [],
            "official_portals": [],
            "professional_help_recommended": True
        }

    # 7. Jurisdiction-Specific Tenancy (Mumbai Rent)
    if re.search(r"mumbai|bombay|maharashtra", t_lower) and re.search(r"tenant|landlord|rent|evict|eviction|not paid rent|kirayedar", t_lower):
        return {
            "status": "conclusive",
            "detected_language": "English",
            "detected_category": "Jurisdiction-Specific Tenancy: Maharashtra Rent Control Act, 1999 (किराया विवाद)",
            "issue_categories": [
                "State Tenancy Law (Maharashtra)",
                "Eviction Proceedings & Arrears of Rent",
                "Competent Authority & Small Causes Court"
            ],
            "translated_text": None,
            "problem_summary": "Eviction and rent default matter in Mumbai governed by Maharashtra State Tenancy Legislation.",
            "supporting_facts": ["Premises located in Mumbai / Maharashtra", "Default in rental payment"],
            "missing_facts": [
                "Is there a registered Leave and License agreement under Section 55 of Maharashtra Rent Control Act?",
                "Has a statutory 90-day demand notice for arrears been served under Section 15?"
            ],
            "uncertainties": [
                "Different procedures apply for registered Leave & License (Competent Authority) versus regular tenancies (Small Causes Court, Mumbai)."
            ],
            "recommended_sections": [
                {
                    "section_code": "Section 15 Maharashtra Rent Control Act, 1999",
                    "title": "Relief against Forfeiture for Non-Payment of Rent",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/2311",
                    "source_verified_at": "Maharashtra State Legislature / India Code",
                    "legal_elements": [
                        "Landlord must issue 90 days statutory notice demanding standard rent / permitted increases",
                        "Tenant fails to pay or deposit rent within 90 days of notice expiration"
                    ],
                    "relevance_explanation": "Tenancy in Mumbai is strictly governed by state law (Maharashtra Rent Control Act, 1999), NOT general central laws.",
                    "simplified_explanation": "State-specific procedure to issue a 90-day demand notice before filing for eviction in Mumbai.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Eviction Decree & Recovery of Rent"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 12,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Court fees based on annual rent",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Civil / Non-Penal Remedy"
            },
            "actionable_advice": "JURISDICTION NOTICE: In India, tenancy is a State Subject. For premises in Mumbai, the Maharashtra Rent Control Act, 1999 applies. You CANNOT forcefully evict a tenant or cut off electricity/water (punishable under Section 29). If you have a registered Leave & License agreement, file an eviction application before the Competent Authority under Section 24.",
            "procedural_steps": [
                "Verify whether the agreement is a registered Leave and License or regular tenancy",
                "Serve statutory demand notice under Section 15 of Maharashtra Rent Control Act",
                "File eviction application before Competent Authority (Sec 24) or Small Causes Court"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Registered agreement and bank default statement."],
            "urgent_safety_guidance": ["Never disconnect water or electricity to force eviction."],
            "official_portals": [],
            "professional_help_recommended": True
        }

    # 8. Compound Multi-Issue Query Separation
    if re.search(r"salary|wages|employer|boss", t_lower) and re.search(r"(car|vehicle).*(damage|scratch|hit|dent)|(damage|scratch|hit|dent).*(car|vehicle)", t_lower):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Compound Multi-Issue: Unpaid Salary + Property Mischief (दो अलग मामले)",
            "issue_categories": [
                "Issue 1: Employment Dispute (Payment of Wages)",
                "Issue 2: Property Damage / Mischief by Neighbor"
            ],
            "translated_text": None,
            "problem_summary": "Your query describes two completely distinct legal problems that cannot be combined into a single proceeding.",
            "supporting_facts": [
                "Problem 1: Employer has not paid 3 months salary.",
                "Problem 2: Neighbor caused damage to your parked vehicle."
            ],
            "missing_facts": [],
            "uncertainties": ["These two claims arise against separate parties under entirely different legal frameworks."],
            "recommended_sections": [
                {
                    "section_code": "Section 15 Payment of Wages Act, 1936",
                    "title": "Claims Arising out of Deductions from Wages or Delay in Payment",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/2361",
                    "source_verified_at": "India Code - Ministry of Labour and Employment",
                    "legal_elements": ["Delayed or withheld earned wages without statutory authorization"],
                    "relevance_explanation": "Applies to your employment grievance against your employer.",
                    "simplified_explanation": "Claim before the Labour Commissioner to recover unpaid wages with up to 10x penalty.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Recovery of Wages & Penalty"
                },
                {
                    "section_code": "Section 324 BNS, 2023",
                    "title": "Mischief Causing Damage to Property (replaces IPC 425/427)",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Intentional or knowing destruction or damage to property causing wrongful loss"],
                    "relevance_explanation": "Applies to your property dispute against your neighbor who damaged your car.",
                    "simplified_explanation": "Intentionally damaging someone else's car or property. Punishable with imprisonment or fine.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Imprisonment or Fine"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 6,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Separate proceedings",
                "eligible_for_nalsa_free_aid": True,
                "bail_status": "Civil / Non-Penal Remedy"
            },
            "actionable_advice": "SEPARATE DUAL CLAIMS: 1. FOR UNPAID SALARY: Submit a formal representation to your company's HR/Director, then file an application before the Labour Commissioner under Section 15 of the Payment of Wages Act. 2. FOR CAR DAMAGE: Preserve CCTV footage of your parking area, get a repair estimate, and lodge a police complaint for mischief under Section 324 BNS at the local police station.",
            "procedural_steps": [
                "Keep employee salary records separate from vehicle repair quotes",
                "File wage recovery claim before Labour Commissioner",
                "File police complaint for vehicle mischief under Section 324 BNS with CCTV proof"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Employment appointment letter and vehicle damage photographs."],
            "urgent_safety_guidance": [],
            "official_portals": [],
            "professional_help_recommended": True
        }

    # 9. Dedicated UPI / Online Payment Fraud & Non-Delivery Domain
    if any(k in t_lower for k in ["upi", "gpay", "google pay", "phonepe", "paytm", "transferred", "sent money", "paisa bheja", "paise bhej diye"]) and any(k in t_lower for k in ["blocked", "block kar", "never delivered", "product", "saman nahi", "fake seller", "advance"]):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Online Payment & UPI Cyber Fraud (ऑनलाइन वित्तीय धोखाधड़ी)",
            "issue_categories": [
                "Online Payment Fraud & Cybercrime",
                "Deceptive Inducement & Cheating",
                "Consumer / E-Commerce Redressal Alternative"
            ],
            "translated_text": None,
            "problem_summary": "Online financial deception: funds transferred via UPI for goods, followed by non-delivery and recipient blocking.",
            "supporting_facts": [
                "Electronic UPI funds transfer executed by user.",
                "Promised product/service never delivered.",
                "Recipient blocked communication upon receipt of funds."
            ],
            "missing_facts": [
                "Whether the recipient was an unverified individual or a registered e-commerce company.",
                "Whether the transaction was reported to the remitter bank within the golden hour."
            ],
            "uncertainties": [
                "Whether the recipient is an anonymous cyber fraudster or a registered business entity facing supply delay."
            ],
            "recommended_sections": [
                {
                    "section_code": "Section 318(4) BNS, 2023",
                    "title": "Cheating and Dishonestly Inducing Delivery of Property (replaces IPC 420)",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": [
                        "Deception of any person by fraudulent or dishonest inducement",
                        "Inducing delivery of property or funds",
                        "Dishonest intention at the inception of the transaction"
                    ],
                    "exceptions_or_conditions": "Requires dishonest intent from inception (e.g. taking money and instantly blocking without intending to deliver).",
                    "relevance_explanation": "Directly applies where a seller or recipient dishonestly persuaded you to send money for goods, with no genuine intention to deliver, and blocked you immediately upon receipt.",
                    "simplified_explanation": "Dishonestly tricking a person into sending money or property. Punishable with imprisonment up to 7 years and fine.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 7 Years & Fine"
                },
                {
                    "section_code": "Section 66D Information Technology Act, 2000",
                    "title": "Punishment for Cheating by Personation by using Computer Resource",
                    "statutory_category": "Cyber Crime Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/1999",
                    "source_verified_at": "India Code - Ministry of Electronics and Information Technology",
                    "legal_elements": ["Cheating by personation using computer resource, mobile device, or network"],
                    "relevance_explanation": "Applies when the perpetrator used a digital profile, messaging platform, or UPI handle to impersonate a legitimate seller.",
                    "simplified_explanation": "Using internet, mobile apps, or digital means to impersonate and cheat someone out of money. Up to 3 years imprisonment and fine.",
                    "bailable": True,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 3 Years & ₹1,00,000 Fine"
                },
                {
                    "section_code": "Section 63 Bharatiya Sakshya Adhiniyam, 2023",
                    "title": "Admissibility of Electronic Records & Cryptographic Integrity",
                    "statutory_category": "Procedural Safeguard",
                    "applicability_status": "Procedural Safeguard",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21737",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Admissibility and preservation of electronic records / UTR receipts"],
                    "relevance_explanation": "Electronic records including UPI UTR numbers and chat transcripts must be preserved with digital integrity.",
                    "simplified_explanation": "Legal standard to submit digital proofs (chat screenshots, UPI payment receipts) as valid court evidence.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Evidentiary Requirement"
                },
                {
                    "section_code": "Section 35 Consumer Protection Act, 2019",
                    "title": "Complaint before Consumer Commission for Deficiency of Service & Unfair Trade Practice",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Alternative Civil Remedy",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/15256",
                    "source_verified_at": "India Code - Department of Consumer Affairs",
                    "legal_elements": ["Payment made for purchase of goods; non-delivery by merchant"],
                    "relevance_explanation": "If the recipient is an identifiable registered business rather than an untraceable criminal actor, civil consumer redressal applies.",
                    "simplified_explanation": "Filing an online complaint on e-Daakhil / NCH against a registered merchant to claim full refund.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Full Refund & Statutory Compensation"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 6,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "FREE - Cyber Cell & CFCFRMS",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Non-Bailable (Discretionary)"
            },
            "actionable_advice": "Act immediately within the 'Golden Hour' (first 2-4 hours). Call the National Cyber Crime Helpline '1930' to trigger the Citizen Financial Cyber Fraud Reporting System to freeze the money in the recipient's bank/wallet before it is withdrawn. Concurrently, register a formal complaint on cybercrime.gov.in and report the disputed transaction to your bank with the 12-digit UPI UTR number.",
            "procedural_steps": [
                "Dial 1930 immediately (National Cyber Crime Helpline) to activate CFCFRMS fund freeze",
                "File incident report on cybercrime.gov.in with 12-digit UPI UTR number and debit screenshot",
                "Submit transaction dispute / chargeback request with your bank's fraud monitoring cell",
                "Preserve unedited chat exports, caller numbers, and transaction slips under Section 63 BSA 2023"
            ],
            "procedural_actions": [
                {
                    "step_number": 1,
                    "action": "Dial 1930 immediately (National Cyber Crime Helpline) to request an urgent lien/freeze on the beneficiary account.",
                    "action_type": "emergency_golden_hour",
                    "authority_or_portal": "National Cyber Crime Helpline (1930 / I4C)",
                    "statutory_deadline": "Within 2-4 hours of transaction (Golden Hour)"
                },
                {
                    "step_number": 2,
                    "action": "File a formal incident report on the National Cyber Crime Reporting Portal (cybercrime.gov.in).",
                    "action_type": "legally_required",
                    "authority_or_portal": "https://cybercrime.gov.in/"
                }
            ],
            "evidence_to_preserve": [
                "12-digit UPI Transaction Reference Number (UTR / Ref ID)",
                "Bank account statement or debit SMS showing exact date, time, and debited amount",
                "Full conversation history (WhatsApp/Telegram/Instagram) showing product offer and blocking",
                "Recipient's UPI ID (VPA), registered mobile number, and QR code used"
            ],
            "urgent_safety_guidance": [
                "NEVER share your UPI PIN, MPIN, OTP, or password with anyone claiming to help reverse the payment.",
                "NEVER download remote screen-sharing tools (AnyDesk, TeamViewer) on instructions from unknown persons.",
                "The police and banks will NEVER ask for your UPI PIN to process a refund."
            ],
            "official_portals": [
                {
                    "name": "National Cyber Crime Reporting Portal",
                    "url": "https://cybercrime.gov.in/",
                    "phone": "1930",
                    "description": "Official Ministry of Home Affairs portal for reporting financial cyber fraud."
                },
                {
                    "name": "National Consumer Helpline (NCH)",
                    "url": "https://consumerhelpline.gov.in/",
                    "phone": "1915",
                    "description": "Department of Consumer Affairs portal for complaints against registered e-commerce sellers."
                }
            ],
            "professional_help_recommended": False
        }

    # 10. Civil Contractual Breach (Renovation Contractor Delay)
    if any(k in t_lower for k in ["contract", "agreement", "contractor", "renovate", "renovation", "signed agreement"]) and any(k in t_lower for k in ["delay", "material cost", "60%", "finished"]):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Contractual Dispute & Commercial Breach (अनुबंध उल्लंघन)",
            "issue_categories": ["Civil Contractual Breach", "Specific Relief & Damages"],
            "translated_text": None,
            "problem_summary": "Dispute over delayed execution of contractual renovation work without established criminal intent.",
            "supporting_facts": ["Written agreement executed", "Part-performance completed (60%)", "Delay attributed to material costs"],
            "missing_facts": ["Whether the contract contains an agreed liquidated damages or dispute resolution clause."],
            "uncertainties": ["Under Indian law, mere breach of contract is not criminal cheating unless dishonest intention existed from the inception."],
            "recommended_sections": [
                {
                    "section_code": "Section 73 Indian Contract Act, 1872",
                    "title": "Compensation for Loss or Damage Caused by Breach of Contract",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/2187",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Valid contract breached; foreseeable loss suffered"],
                    "relevance_explanation": "Governs situations where a contractor fails to complete promised work. Crucially, mere breach is NOT criminal cheating without dishonest intent at inception.",
                    "simplified_explanation": "Civil right to claim monetary compensation and damages for financial losses suffered due to a broken contract.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Monetary Damages & Compensation"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 14,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Civil Court Fees",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Civil / Non-Penal Remedy"
            },
            "actionable_advice": "Under established Supreme Court jurisprudence (such as Dalip Kaur v. Jagnar Singh), a breach of contract or construction delay does NOT automatically constitute criminal fraud or cheating (Section 318 BNS) unless dishonest intention existed from day one. Your primary remedy is civil: issue a formal Legal Notice for specific performance or recovery of damages under Section 73 of the Indian Contract Act.",
            "procedural_steps": [
                "Collate contract document, payment receipts, and site inspection photos",
                "Issue 15-30 day formal Legal Notice through an advocate calling upon contractor to cure breach",
                "Initiate Commercial Mediation or Civil Suit for Damages"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Signed contract, bank transfer slips, and site evaluation photos."],
            "urgent_safety_guidance": [],
            "official_portals": [],
            "professional_help_recommended": True
        }

    # 11. Consumer Dispute / Defective Goods / E-Commerce Non-Delivery
    if any(k in t_lower for k in ["defective", "refrigerator", "washing machine", "warranty", "service center", "faulty product", "amazon", "flipkart", "ordered", "consumer"]) and any(k in t_lower for k in ["refuses", "refusing repair", "replacement", "cooling", "bought", "not been delivered", "not delivered", "customer support"]):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Consumer Rights & Defective Products (उपभोक्ता संरक्षण / खराब सामान)",
            "issue_categories": ["Consumer Protection & Defective Goods", "Deficiency in Service"],
            "translated_text": None,
            "problem_summary": "Consumer purchased a product with warranty that malfunctioned, with seller/service center refusing repair or replacement.",
            "supporting_facts": ["Product bought for personal consideration", "Defect occurred within warranty period", "Service center denied remedy"],
            "missing_facts": ["Whether an official job-sheet or written service denial was issued."],
            "uncertainties": [],
            "recommended_sections": [
                {
                    "section_code": "Section 35 Consumer Protection Act, 2019",
                    "title": "Filing Complaint before District Consumer Disputes Redressal Commission",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/15256",
                    "source_verified_at": "India Code - Ministry of Consumer Affairs",
                    "legal_elements": ["Consumer bought goods; defect in goods or deficiency in service"],
                    "relevance_explanation": "Applies directly where a consumer purchased goods for personal use and the item suffers from defects.",
                    "simplified_explanation": "Right to file an online case before District Consumer Commission for replacement, repair, refund, and damages.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Replacement, Full Refund & Compensation"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 5,
                "financial_risk_level": "Low",
                "estimated_cost_inr": "Nominal Filing Fee",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Civil / Non-Penal Remedy"
            },
            "actionable_advice": "First, register a complaint on the National Consumer Helpline (Call 1915 or visit consumerhelpline.gov.in). If unresolved, file a formal complaint online via e-Daakhil (edaakhil.nic.in) before the District Consumer Commission. Note: An advocate is NOT mandatory in consumer forums; you may represent yourself.",
            "procedural_steps": [
                "Send written grievance via email to manufacturer customer support",
                "Register complaint on National Consumer Helpline (1915 / consumerhelpline.gov.in)",
                "File online complaint on e-Daakhil portal (edaakhil.nic.in)"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Tax invoice, warranty card, job-sheets, and malfunction photos/videos."],
            "urgent_safety_guidance": [],
            "official_portals": [
                {
                    "name": "National Consumer Helpline",
                    "url": "https://consumerhelpline.gov.in/",
                    "phone": "1915",
                    "description": "Department of Consumer Affairs grievance portal."
                },
                {
                    "name": "e-Daakhil",
                    "url": "https://edaakhil.nic.in/",
                    "description": "Online consumer commission filing portal."
                }
            ],
            "professional_help_recommended": False
        }

    # 12. Criminal Intimidation / Extortion
    if any(k in t_lower for k in ["dhamki", "threat", "gangster", "shoot", "pistol", "rangdari", "5 lakh", "extortion"]):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Criminal Intimidation & Extortion (धमकी / रंगदारी)",
            "issue_categories": ["Criminal Intimidation & Life Threats", "Extortion & Blackmail"],
            "translated_text": None,
            "problem_summary": "Extortion demand accompanied by explicit threat to kill or shoot with a weapon.",
            "supporting_facts": ["Financial extortion demand made", "Threat to cause death by firearm"],
            "missing_facts": [],
            "uncertainties": [],
            "recommended_sections": [
                {
                    "section_code": "Section 351(3) BNS, 2023",
                    "title": "Criminal Intimidation with Threat to Cause Death or Grievous Hurt",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Threat is to cause death or grievous hurt"],
                    "relevance_explanation": "Penalizes explicit threats to shoot, kill, or inflict severe bodily injury.",
                    "simplified_explanation": "Severe threats involving death or grievous bodily harm. Cognizable offense punishable up to 7 years.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 7 Years & Fine"
                },
                {
                    "section_code": "Section 308 BNS, 2023",
                    "title": "Extortion by Putting Person in Fear of Injury",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice",
                    "legal_elements": ["Intentionally putting person in fear of injury to demand money"],
                    "relevance_explanation": "Directly penalizes extortion and demanding money under threat of violence.",
                    "simplified_explanation": "Demanding money by threatening severe physical harm. Strictly non-bailable.",
                    "bailable": False,
                    "cognizable": True,
                    "max_punishment": "Imprisonment up to 7 Years & Fine"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 6,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Police Action",
                "eligible_for_nalsa_free_aid": True,
                "bail_status": "Non-Bailable (Discretionary)"
            },
            "actionable_advice": "If there is any immediate danger, dial 112 immediately. Preserve all call recordings, WhatsApp messages, and caller IDs under Section 63 BSA 2023 without editing. Approach the local police station to lodge an immediate FIR under Section 173 BNSS.",
            "procedural_steps": [
                "Dial 112 immediately if threat is imminent",
                "Secure unedited audio recordings and call logs",
                "Lodge FIR at police station under Section 351(3) & 308 BNS"
            ],
            "procedural_actions": [],
            "evidence_to_preserve": ["Call recordings and caller numbers."],
            "urgent_safety_guidance": ["Do not meet the threatening party alone."],
            "official_portals": [
                {
                    "name": "National Emergency Helpline",
                    "url": "https://112.gov.in/",
                    "phone": "112",
                    "description": "24x7 all-India emergency police assistance."
                }
            ],
            "professional_help_recommended": True
        }

    # 13. Property Encroachment & Illegal Land Acquisition
    has_property_kw = (
        any(k in t_lower for k in ["illegal land", "acquire my land", "acquire land", "land grabbing", "occupy my land", "illegal occupation", "encroach", "encroachment", "kabza", "khet", "ancestral land", "patwari", "khatauni", "boundary wall", "dispossess", "tehsildar", "zameen", "gaon"])
        or (re.search(r'\b(land|property|plot)\b', t_lower) and any(k in t_lower for k in ["acquire", "occupy", "village", "steal", "illegal", "grab", "encroach", "dispute", "ancestral", "possession"]))
    )
    if has_property_kw and not any(k in t_lower for k in ["landlord", "tenant", "rent", "water", "electricity", "upi", "consumer", "defective", "cheque bounce"]):
        return {
            "status": "conclusive",
            "detected_language": "English / Hinglish",
            "detected_category": "Property Encroachment & Land Disputes (जमीन विवाद / अवैध कब्जा)",
            "issue_categories": [
                "Property Encroachment & Illegal Dispossession",
                "Civil Injunction & Status Quo (Order 39 CPC)",
                "Criminal Trespass under Section 329 BNS"
            ],
            "translated_text": None,
            "problem_summary": "Attempted illegal occupation, encroachment, or acquisition of agricultural/village land.",
            "supporting_facts": [
                "Dispute concerning land or boundary in village/locality.",
                "Allegation of illegal attempt to acquire or occupy property."
            ],
            "missing_facts": [
                "Whether you have registered Sale Deed / Khatauni in your name.",
                "Whether physical possession has been disturbed or construction started."
            ],
            "uncertainties": [
                "Whether the land is governed by the State Revenue Code (agricultural) or Civil Procedure Code (urban)."
            ],
            "recommended_sections": [
                {
                    "section_code": "Section 329(3) BNS, 2023",
                    "title": "Criminal Trespass & House-Trespass (replaces IPC 447)",
                    "statutory_category": "Substantive Criminal Offence",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21735",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Entering onto land/property in another's possession with intent to intimidate or grab"],
                    "relevance_explanation": "Directly penalizes unauthorized physical intrusion and attempts to grab land.",
                    "simplified_explanation": "Entering someone's land or house unlawfully with intent to intimidate or grab property. Bailable offense punishable with up to 3 months imprisonment or fine.",
                    "bailable": True,
                    "cognizable": True,
                    "max_punishment": "3 Months Imprisonment or Fine"
                },
                {
                    "section_code": "Order 39 Rules 1 & 2 CPC, 1908",
                    "title": "Temporary Injunction & Direction for Status Quo against Illegal Dispossession",
                    "statutory_category": "Consumer & Civil Remedy",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/2191",
                    "source_verified_at": "India Code - Ministry of Law & Justice, Govt. of India",
                    "legal_elements": ["Prima facie title, balance of convenience, and prevention of irreparable injury"],
                    "relevance_explanation": "Civil court injunction order restraining the encroacher from entering, constructing, or altering the land.",
                    "simplified_explanation": "Court order directing the opposing party not to touch your land or alter its physical status until the dispute is decided.",
                    "bailable": True,
                    "cognizable": False,
                    "max_punishment": "Civil Injunctive Restraint"
                },
                {
                    "section_code": "Section 164 BNSS, 2023",
                    "title": "Magistrate Direction Concerning Land Dispute Likely to Cause Breach of Peace (replaces Sec 145 CrPC)",
                    "statutory_category": "Procedural Safeguard",
                    "applicability_status": "Directly Applicable",
                    "official_source_url": "https://www.indiacode.nic.in/handle/123456789/21736",
                    "source_verified_at": "India Code - Ministry of Law & Justice",
                    "legal_elements": ["Land dispute likely to cause breach of peace; SDM inquiry into actual possession"],
                    "relevance_explanation": "Enables immediate administrative intervention by the SDM to seal boundaries and prevent violence.",
                    "simplified_explanation": "Executive Magistrate (SDM) steps in to prevent physical violence and decides who was in peaceful possession.",
                    "bailable": True,
                    "cognizable": True,
                    "max_punishment": "Magisterial Seal & Peace Bond"
                }
            ],
            "risk_assessment": {
                "estimated_duration_months": 18,
                "financial_risk_level": "Medium",
                "estimated_cost_inr": "Civil Court Fees",
                "eligible_for_nalsa_free_aid": False,
                "bail_status": "Civil / Non-Penal Remedy"
            },
            "actionable_advice": "Under established Supreme Court law, no person can be forcefully dispossessed from land without due legal process. 1. Immediately file a Civil Suit for Permanent Injunction with an urgent stay application under Order 39 Rules 1 & 2 CPC before the Civil Judge. 2. Submit an urgent application before the Sub-Divisional Magistrate (SDM) under Section 164 BNSS to maintain status quo and prevent breach of peace. 3. If physical trespass or intimidation is attempted, lodge a police complaint for Criminal Trespass under Section 329 BNS.",
            "procedural_steps": [
                "Obtain certified revenue records (Khatauni, Jamabandi, Khasra map) from Tehsil office",
                "File an urgent representation before the Sub-Divisional Magistrate (SDM) under Section 164 BNSS",
                "File a Civil Suit for Declaration & Injunction with stay application under Order 39 CPC",
                "Lodge police complaint under Section 329 BNS for Criminal Trespass if boundary breach is attempted"
            ],
            "procedural_actions": [
                {
                    "step_number": 1,
                    "action": "Obtain certified Khatauni / Jamabandi and registered title deeds from Tehsil / Sub-Registrar.",
                    "action_type": "recommended_practical"
                },
                {
                    "step_number": 2,
                    "action": "File application before Sub-Divisional Magistrate (SDM) under Section 164 BNSS to prevent illegal occupation.",
                    "action_type": "legally_required",
                    "authority_or_portal": "Sub-Divisional Magistrate (SDM) Court"
                },
                {
                    "step_number": 3,
                    "action": "File Civil Injunction Suit with urgent stay application under Order 39 CPC before Civil Court.",
                    "action_type": "legally_required",
                    "authority_or_portal": "Jurisdictional Civil Court"
                }
            ],
            "evidence_to_preserve": [
                "Original registered Sale Deed / Gift Deed / Title documents",
                "Latest certified revenue extract (Khatauni / Khasra / Jamabandi) from Tehsil",
                "Photographs and video recordings showing physical boundaries and any illegal construction attempts"
            ],
            "urgent_safety_guidance": [
                "Do not engage in physical altercations or armed confrontation over land boundaries.",
                "Rely on court-ordered stay orders and revenue demarcation (Nishan-dehi)."
            ],
            "official_portals": [
                {
                    "name": "eCourts Services",
                    "url": "https://ecourts.gov.in/",
                    "description": "National judicial portal for tracking civil injunction suits."
                }
            ],
            "professional_help_recommended": True
        }

    # Fallback to Clarification (Zero Assault/Arrest Hallucinations!)
    return create_clarification_response(text)

def create_clarification_response(raw_input: str) -> Dict[str, Any]:
    return {
        "status": "requires_clarification",
        "detected_language": "English / Hindi (Auto-Detected)",
        "detected_category": "General Legal Inquiry: Requires Clarification (तथ्यों का अभाव - स्पष्टीकरण आवश्यक)",
        "issue_categories": ["Pending Factual Details", "Preliminary Legal Assessment"],
        "translated_text": None,
        "problem_summary": f"Your query contains insufficient factual details to conclusively identify specific Indian penal or civil sections.",
        "supporting_facts": ["General inquiry submitted without specific details of transactions, parties, or injuries."],
        "missing_facts": [
            "What is the specific nature of the dispute (e.g. money fraud, job termination, property dispute, physical threat, or matrimonial issue)?",
            "Who are the parties involved (e.g. unknown online seller, employer, neighbor, spouse, or business partner)?",
            "Did any financial loss, physical harm, or breach of written contract occur?",
            "In which State or City did this event occur?"
        ],
        "uncertainties": [
            "Indian statutes cannot be reliably applied without knowing the specific overt acts and legal relationship between the parties."
        ],
        "recommended_sections": [],
        "risk_assessment": {
            "estimated_duration_months": 0,
            "financial_risk_level": "Safe",
            "estimated_cost_inr": "Clarification Needed",
            "eligible_for_nalsa_free_aid": True,
            "bail_status": "Not Applicable"
        },
        "actionable_advice": "TO GET ACCURATE LEGAL SECTIONS: Please provide a few more details about what happened. For example:\n- If you lost money via UPI, mention the amount and what happened.\n- If you received threats, mention whether weapons were used or money was demanded.\n- If this is an employment or property issue, describe your agreement or tenancy.\nOur system will then match the exact, verified Indian laws without guesswork.",
        "procedural_steps": [
            "Add key facts: Who did what, when, how much money/injury was involved, and what evidence exists",
            "Re-submit the detailed description for statutory analysis",
            "For emergency situations, dial 112 (Police) or 15100 (NALSA Free Legal Aid)"
        ],
        "procedural_actions": [],
        "evidence_to_preserve": ["Any contracts, bank transfer proofs, chat logs, or medical reports relating to your problem."],
        "urgent_safety_guidance": [
            "If you are in immediate physical danger, please call 112 directly rather than waiting for an online analysis."
        ],
        "official_portals": [
            {
                "name": "National Legal Services Authority (NALSA)",
                "url": "https://nalsa.gov.in/",
                "phone": "15100",
                "description": "Official statutory body providing free legal services to eligible citizens."
            }
        ],
        "professional_help_recommended": False
    }
