export const MOCK_ANALYSIS = {
    "_id": "69ea86aaffcba5a2b0c37826",
    "title": "Star Health Insurance",
    "summary": "The Star Health Assure Insurance Policy is structurally designed to prioritize insurer protection through layers of discretionary language and stringent conditions that may hinder real-world claims. While it offers broad coverage for various treatments, the heavy reliance on the medically necessary mandate allows the company to reject claims based on subjective international or local standards not clearly defined within the document. The non-disclosure clause is particularly aggressive, stating that the policy is void for any mis-description or non-disclosure of material facts, effectively placing a burden of absolute accuracy on the policyholder with no margin for error. Waiting periods are strategically stratified, with a longer 36-month period for standard one or two-year policies compared to 30 months for three-year terms, creating a significant time barrier for pre-existing disease coverage. Furthermore, cost-sharing is complicated by proportionate deductions where associated medical expenses—like surgeon and consultant fees—are reduced if a patient chooses a room exceeding the specified rent limit, a detail often overlooked by customers. This is compounded by a mandatory 10% co-payment for those entering the policy after age 61, further eroding the actual financial benefit.",
    "analysis": {
        "overview": {
            "policy_title": {
                "mention": true,
                "value": "Star Health Assure Insurance Policy"
            },
            "policy_type": {
                "mention": true,
                "value": "Comprehensive Health Insurance"
            },
            "parties_involved": {
                "mention": true,
                "insurer": "Star Health and Allied Insurance Company Limited",
                "policyholder": "The person named in the policy schedule as the proposer",
                "beneficiaries_defined": true
            },
            "period_of_contract": {
                "mention": true,
                "start_date": "As specified in the policy schedule",
                "end_date": "As specified in the policy schedule",
                "tenure": "1 year, 2 years or 3 years",
                "renewable": {
                    "bool": true,
                    "wording": "The policy shall ordinarily be renewable except on grounds of fraud, misrepresentation by the insured person",
                    "condition": "renewal can be denied on grounds of fraud, moral hazard, misrepresentation or non-disclosure of material facts"
                }
            },
            "installments": {
                "mention": true,
                "frequency": "Monthly, Quarterly, Half-yearly, Annual, Biennial (2 years) or Triennial (3 years)",
                "grace_period": "30 days",
                "consequence_of_lapse": "Coverage is not available for the period for which no premium is received"
            },
            "ways_to_claim": {
                "mention": true,
                "methods": [
                    "Cashless Service",
                    "Reimbursement of claim"
                ],
                "claim_notification_timeline": "within 24 hours of admission for emergency and 48 hours prior to admission for planned hospitalization",
                "documentation_required": [
                    "Duly completed claim form",
                    "Pre Admission investigations and treatment papers",
                    "Discharge Summary from the hospital",
                    "Cash receipts from hospital, chemists",
                    "Cash receipts and reports for tests done",
                    "Receipts from doctors, surgeons, anesthetist",
                    "Certificate from the attending doctor regarding the diagnosis",
                    "KYC of the proposer for claims above Rs 1 Lakh"
                ]
            },
            "brief_overview": "A health insurance policy providing indemnity for hospitalization expenses, day care procedures, and various modern treatments with automatic restoration of sum insured."
        },
        "coverage": {
            "desease": {
                "mention": true,
                "cover_all": {
                    "bool": false,
                    "wording": "",
                    "condition": "Expenses related to the treatment of a pre-existing Disease (PED) and its direct complications shall be excluded until the expiry of 30/36 months"
                },
                "includes_most": true,
                "exclusion": [
                    "Alcoholism, drug or substance abuse",
                    "Obesity/Weight Control",
                    "Cosmetic or plastic Surgery",
                    "Hazardous or Adventure sports",
                    "Breach of law",
                    "Sterility and Infertility",
                    "Maternity (except as specified)",
                    "Unproven Treatments"
                ],
                "inclusion": [
                    "In-patient Hospitalization",
                    "Day Care Procedures",
                    "Modern Treatments",
                    "AYUSH Treatment",
                    "Assisted Reproduction Treatment",
                    "Chronic Severe Refractory Asthma"
                ]
            },
            "hospital": {
                "mention": true,
                "cover_all": {
                    "bool": false,
                    "wording": "",
                    "condition": "Hospital means any institution established for in-patient care and day care treatment of illness and/or injuries and which has been registered as a hospital with the local authorities"
                },
                "includes_most": true,
                "includes": [
                    "Networked Hospitals",
                    "Non-network hospitals (reimbursement only)",
                    "AYUSH Hospital"
                ],
                "excludes": [
                    "Excluded Providers specifically disclosed on the website",
                    "Nature cure clinics",
                    "Spas",
                    "Health hydros"
                ]
            }
        },
        "waiting_period": {
            "mention": true,
            "max_duration": "36 months",
            "unscoped": [
                {
                    "benifit_exclusion": "Pre-Existing Diseases (PED)",
                    "has_list": true,
                    "list": [
                        "Any condition, ailment, injury or disease diagnosed by a physician within 48 months prior to the effective date"
                    ]
                }
            ],
            "scoped": true,
            "scope": [
                {
                    "benifit_exclusion": "Specified disease/procedure waiting period",
                    "has_list": true,
                    "list": [
                        "Hemicrania",
                        "Tonsillectomy",
                        "Adenoidectomy",
                        "Mastoidectomy",
                        "Myringotomy",
                        "Hysterectomy",
                        "Calculi in salivary glands",
                        "Gall bladder and bile duct calculi",
                        "Pancreatic calculi",
                        "Joint Replacement",
                        "Prolapse of Intervertebral disc",
                        "Varicose veins and Varicose ulcers"
                    ],
                    "duration": "24 months"
                },
                {
                    "benifit_exclusion": "Initial waiting period",
                    "has_list": false,
                    "list": [],
                    "duration": "30 days"
                }
            ]
        },
        "amount_sharing": {
            "sum_insured": {
                "mention": true,
                "base_amount": "Varies from Rs. 5,00,000 to Rs. 2,00,00,000",
                "is_floater": {
                    "bool": true,
                    "wording": "Coverage opted on family floater basis with overall Sum insured (Only one sum insured is available for the entire family)"
                }
            },
            "maximum_limits": {
                "mention": true,
                "overall_annual_limit": "Equal to the Sum Insured plus Cumulative Bonus plus Restored Sum Insured",
                "lifetime_maximum": {
                    "exists": false,
                    "amount": ""
                }
            },
            "scoped_limits": {
                "has_sublimits": true,
                "scope": [
                    {
                        "category": "Room Rent (for 5L Sum Insured)",
                        "limit_type": "Percentage",
                        "limit_value": "1% of Sum Insured per day",
                        "wording": "Up to 1% of Sum Insured per day"
                    },
                    {
                        "category": "Air Ambulance",
                        "limit_type": "Percentage",
                        "limit_value": "10%",
                        "wording": "up to 10% of sum insured per policy year"
                    },
                    {
                        "category": "Cataract Surgery",
                        "limit_type": "Fixed Amount",
                        "limit_value": "Varies by Sum Insured",
                        "wording": "Limit of Liability in a policy year (Rs.)"
                    }
                ]
            },
            "cost_sharing": {
                "copayment": {
                    "exists": true,
                    "percentage": "10%",
                    "condition": "Applicable for each and every claim amount for insured person whose age at the time of entry is 61 years and above"
                },
                "deductible": {
                    "exists": true,
                    "amount": "As per opted plan",
                    "type": "Annual Aggregate"
                }
            }
        },
        "red_flags": {
            "nondisclosure_clause": {
                "mention": true,
                "wording": "The policy shall be void and all premium paid thereon shall be forfeited to the Company in the event of misrepresentation, mis-description or non-disclosure of any material fact",
                "look_back_period": "48 months for Pre-Existing Diseases"
            },
            "material_facts": {
                "defined": true,
                "list": [
                    "Pre-existing disease/s or condition/s",
                    "Age of the members",
                    "Occupation",
                    "Health status of the proposed insured"
                ],
                "omission_consequence": "The policy shall be void and all premium paid thereon shall be forfeited"
            },
            "fraud_definitions": {
                "mention": true,
                "actions_labeled_as_fraud": [
                    "Submission of fake/forged documents",
                    "Suppression of material facts",
                    "Misrepresentation of health status"
                ],
                "forfeiture_wording": "the policy shall be cancelled ab-initio and there shall be no refund of premium"
            }
        },
        "loopholes": {
            "user_rejection_triggers": [
                {
                    "activity": "Primarily for investigation/diagnostic purpose",
                    "wording": "Any hospital admission primarily for investigation diagnostic purpose",
                    "is_discretionary": false
                },
                {
                    "activity": "Hazardous sports",
                    "wording": "Expenses related to any treatment necessitated due to participation as a professional in hazardous or adventure sports",
                    "is_discretionary": false
                }
            ],
            "exploitable_ambiguities": [
                {
                    "term": "Medically Necessary Treatment",
                    "potential_exploitation": "The insurer can reject a claim if they deem the treatment, tests, or hospital stay exceeds the required level of care based on their internal interpretation of clinical protocols.",
                    "vague_wording": "which does not exceed the level of care required to provide safe, adequate and appropriate medical care in scope, duration, or intensity"
                },
                {
                    "term": "Reasonable and Customary Charges",
                    "potential_exploitation": "Payouts can be limited to what the insurer considers standard for a geographical area, which may not cover the actual bill from a premium hospital.",
                    "vague_wording": "consistent with the prevailing charges in the geographical area for identical or similar services"
                }
            ],
            "silent_exclusions": {
                "mention": true,
                "list": [
                    "Treatment normally taken on an out-patient basis",
                    "Venereal disease and sexually transmitted diseases",
                    "Charges for various items as per List I specified in the policy wordings"
                ]
            },
            "technical_traps": {
                "notice_period_trap": {
                    "exists": true,
                    "wording": "notice with full particulars shall be sent to the Company within 24 hours from the date of occurrence of the event"
                },
                "geographic_limitations": {
                    "exists": true,
                    "restricted_areas": [
                        "Outside India"
                    ],
                    "wording": "Treatment outside India is excluded"
                }
            }
        }
    }
}
