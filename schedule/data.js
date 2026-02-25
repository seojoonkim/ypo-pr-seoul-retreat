const scheduleData = [
    {
        day: 1,
        title: "DAY 1: Business Insight",
        title_en: "DAY 1: Business Insight",
        date: "2026. 10. (금)",
        date_en: "Oct 2026 (Fri)",
        location: "삼성동",
        location_en: "Samseong-dong",
        events: [
            {
                time: "15:00",
                title: "참가자 개별 체크인",
                title_en: "Individual Check-In",
                location: "웨스틴 조선 파르나스 (삼성동)",
                location_en: "Westin Josun Parnas (Samseong-dong)",
                icon: "🏨",
                desc: "YPO Pacific Rim 회원 및 가족분들의 숙소 체크인 및 웰컴 기프트 수령이 진행됩니다.",
                desc_en: "Check-in for YPO Pacific Rim members and families, plus welcome gift distribution.",
                details: "숙소는 시내 중심이자 비즈니스 핵심 상권인 삼성동 '웨스틴 조선 파르나스'에 마련됩니다. 편안한 쉼을 위한 40여 개 일반 및 스위트 객실이 준비되며, 교원헬스케어 등 호스팅 기업이 준비한 특별한 웰컴 기프트 패키지를 제공합니다.",
                details_en: "Accommodation is arranged at the Westin Josun Parnas in Samseong-dong, the heart of Seoul's business district. Over 40 standard and suite rooms are prepared, along with a special welcome gift package curated by host companies including Kyowon Healthcare."
            },
            {
                time: "16:00",
                title: "행사 오프닝 및 리더 초청 강연",
                title_en: "Opening & Leadership Speaker Session",
                location: "호텔 연회장",
                location_en: "Hotel Ballroom",
                icon: "🎤",
                desc: "공식적인 환영 인사와 함께 대한민국 K-Culture를 이끄는 리더들의 인사이트 세션.",
                desc_en: "Official welcome & insights from South Korea's leading K-Culture industry executives.",
                details: "교원그룹의 개회사를 시작으로 '코리안 캘리그라피(글씨당 김소영)'의 화려하고 감성적인 전통 붓글씨 퍼포먼스가 무대를 엽니다. 이어 K-Beauty(아모레퍼시픽 등), K-Entertainment(하이브, 스타쉽 등), K-Fashion(무신사 등) 산업 대표 리더들을 초청하여 한국 문화의 저력과 비즈니스 인사이트를 공유합니다.",
                details_en: "Opening remarks by Kyowon Group are followed by a stunning Korean calligraphy performance (Geulsidang, Kim So-young). Keynotes from executives in K-Beauty (Amorepacific), K-Entertainment (HYBE, Starship), and K-Fashion (Musinsa) share the power of Korean culture and global business strategy."
            },
            {
                time: "18:00",
                title: "만찬 (Welcome Dinner)",
                title_en: "Welcome Dinner",
                location: "파르나스 연회장 또는 외부 지정 식당",
                location_en: "Parnas Ballroom or Designated Restaurant",
                icon: "🍽️",
                desc: "한국의 맛을 담은 고품격 만찬과 그룹 네트워킹 타임.",
                desc_en: "Premium dining showcasing Korean flavors with exclusive group networking.",
                details: "첫날 만찬은 파르나스 연회장, 프리미엄 K-BBQ 흑돈가, 또는 고즈넉한 북촌의 고급 한옥 '휘겸재' 공간 중 한 곳에서 진행됩니다. 편안한 분위기 속에서 글로벌 멤버 간의 교류를 넓힐 수 있는 프라이빗 다이닝을 선사합니다.",
                details_en: "The first evening's dinner takes place at the Parnas Ballroom, premium K-BBQ at Heukdon-ga, or in the serene hanok setting of Hwegyeomjae in Bukchon. A relaxed private dining atmosphere to deepen connections among global members."
            },
            {
                time: "20:00~",
                title: "After-Party (선택)",
                title_en: "After-Party (Optional)",
                location: "라운지 바",
                location_en: "Lounge Bar",
                icon: "🥂",
                desc: "공식 일정 종료 후 자유로운 네트워킹 시간을 갖습니다.",
                desc_en: "Free-form networking in an upscale lounge after the official program.",
                details: "성인 멤버들을 위한 애프터 파티 공간입니다. 고급스러운 라운지에서 칵테일과 함께 자유롭게 비즈니스와 일상 이야기를 나눌 수 있습니다.",
                details_en: "A sophisticated after-party for adult members. Enjoy cocktails and open conversation in an elegant lounge setting — business talk or casual chat, your choice."
            }
        ]
    },
    {
        day: 2,
        title: "DAY 2: Cultural Experience",
        title_en: "DAY 2: Cultural Experience",
        date: "2026. 10. (토)",
        date_en: "Oct 2026 (Sat)",
        location: "서울 분산 활동",
        location_en: "Various Locations, Seoul",
        events: [
            {
                time: "09:00",
                title: "조식",
                title_en: "Breakfast",
                location: "호텔 레스토랑",
                location_en: "Hotel Restaurant",
                icon: "🍳",
                desc: "호텔에서 제공하는 조식 뷔페",
                desc_en: "International breakfast buffet provided by the hotel.",
                details: "신선한 재료로 준비된 인터내셔널 조식 뷔페가 제공됩니다.",
                details_en: "A freshly prepared international breakfast buffet awaits to start the day."
            },
            {
                time: "11:00",
                title: "오전 문화 투어 (택 1)",
                title_en: "Morning Cultural Tour (Choose 1)",
                location: "국립중앙박물관 등",
                location_en: "National Museum of Korea, etc.",
                icon: "🏛️",
                desc: "그룹별로 진행되는 한국의 역사와 현대 산업 탐방",
                desc_en: "Small-group tours exploring Korea's history and modern industries.",
                details: "20명 내외의 소규모 그룹으로 나뉘어 이동합니다. 국립중앙박물관에서 한국의 깊은 역사를 체험하거나, 주요 IT/엔터 기획사(더블랙레이블 등)를 방문하여 한국 현대 산업의 역동성을 경험합니다.",
                details_en: "Groups of ~20 split for curated tours. Visit the National Museum of Korea to discover Korea's rich history, or drop into top IT/entertainment companies such as The Black Label to experience Korea's modern creative industry."
            },
            {
                time: "13:00",
                title: "중식 (그룹별)",
                title_en: "Group Lunch",
                location: "지정 식당",
                location_en: "Designated Restaurant",
                icon: "🍱",
                desc: "동선 내 위치한 검증된 지역구 맛집 방문",
                desc_en: "Reserved local dining gems tailored to each group's route.",
                details: "비건 등 참석자들의 식성을 고려하여 예약된 지역별 프라이빗 식당에서 안전하고 맛있는 중식을 제공합니다.",
                details_en: "Dietary preferences (including vegan) are considered at each pre-booked, privately reserved local restaurant."
            },
            {
                time: "15:00",
                title: "오후 문화 체험 (택 1)",
                title_en: "Afternoon Cultural Experience (Choose 1)",
                location: "경복궁, 성수동 등",
                location_en: "Gyeongbokgung, Seongsu-dong, etc.",
                icon: "🎎",
                desc: "전통 한옥 공방 체험부터 성수동 K-뷰티 팝업스토어 탐방까지!",
                desc_en: "From traditional hanok craft workshops to K-Beauty pop-up tours in Seongsu-dong!",
                details: "- 경복궁/북촌 한옥 공방: 도장 만들기, 자개 공예, 한복 체험 등 한국의 미를 직접 체험\n- 성수동 뷰티 탐방: 국내 최대 뷰티 플래그십 매장(올리브영N 성수) 패스트트랙 투어 및 쇼핑\n- K-메이크업 및 다과 체험: 녹지원 등에서 전통차를 마시며 여유를 느끼는 시간",
                details_en: "- Gyeongbokgung/Bukchon Hanok Workshops: Seal carving, mother-of-pearl craft, and hanbok experience\n- Seongsu-dong Beauty Tour: Fast-track visit & shopping at Olive Young N Seongsu, Korea's largest beauty flagship\n- K-Makeup & Tea: Traditional tea ceremony paired with K-beauty demonstration at Nokjiwon"
            },
            {
                time: "18:00",
                title: "스페셜 석식",
                title_en: "Special Dinner",
                location: "선혜원, 온지음 또는 한강 유람선",
                location_en: "Seonhaewon, Onjium or Han River Cruise",
                icon: "🚢",
                desc: "서울의 정취를 온몸으로 느끼는 특별한 다이닝",
                desc_en: "An unforgettable dinner soaked in Seoul's unique atmosphere.",
                details: "한국 전통 식문화를 현대적으로 재해석한 파인다이닝 '온지음', 고즈넉한 한옥 마당에서 열리는 '선혜원' 만찬, 혹은 한강의 화려한 야경을 감상할 수 있는 단독 대관 유람선 선상 파티 중 하나로 특별한 밤을 장식합니다.",
                details_en: "Choose from: Onjium fine dining, reimagining traditional Korean cuisine; a banquet in the tranquil hanok garden of Seonhaewon; or a private night cruise on the Han River with spectacular city views."
            },
            {
                time: "20:00~",
                title: "Night 투어 및 After-Party",
                title_en: "Night Tour & After-Party",
                location: "허브라운지, 뷰직 등",
                location_en: "Hub Lounge, Vieweek, etc.",
                icon: "🎵",
                desc: "서울의 활기찬 나이트라이프 경험",
                desc_en: "Experience Seoul's vibrant and electric nightlife.",
                details: "음악과 예술이 중심이 되는 라운지형 클럽(뷰직)이나 프라이빗 네트워킹 공간(허브라운지)에서 이색적인 서울의 밤을 즐깁니다.",
                details_en: "Round off the evening at an arts-driven lounge club (Vieweek) or a private networking venue (Hub Lounge) for a uniquely Seoul night out."
            }
        ]
    },
    {
        day: 3,
        title: "DAY 3: Family-Friendly",
        title_en: "DAY 3: Family-Friendly",
        date: "2026. 10. (일)",
        date_en: "Oct 2026 (Sun)",
        location: "자연 속 힐링 (양평)",
        location_en: "Nature Healing (Yangpyeong)",
        events: [
            {
                time: "09:00",
                title: "조식",
                title_en: "Breakfast",
                location: "호텔",
                location_en: "Hotel",
                icon: "🥐",
                desc: "조식 후 서울 근교로 단체 이동을 준비합니다.",
                desc_en: "After breakfast, prepare for a group departure to the Seoul outskirts.",
                details: "조식을 마치고 전세 버스와 랩핑된 리무진 버스에 탑승하여 가족 다함께 편안하게 자연이 숨쉬는 경기도 양평으로 출발합니다.",
                details_en: "After breakfast, board our chartered and wrapped limousine buses for a comfortable, scenic journey to Yangpyeong, Gyeonggi-do."
            },
            {
                time: "11:00",
                title: "천년의 역사, 양평 용문사 투어",
                title_en: "1,000-Year History: Yangpyeong Yongmunsa Temple Tour",
                location: "양평 용문사",
                location_en: "Yongmunsa Temple, Yangpyeong",
                icon: "🌲",
                desc: "동양 최고의 은행나무와 사찰의 고즈넉함",
                desc_en: "Asia's oldest ginkgo tree & the quiet grace of an ancient temple.",
                details: "전문 해설사의 설명과 함께 천년의 역사가 깃든 용문사를 둘러봅니다. 수령 1,100년이 넘은 천연기념물 거대 은행나무 앞에서 가족 사진을 찍고, 사찰 명상 예절을 짧게 배우며 평온함을 겪어봅니다.",
                details_en: "A guided tour of the historic Yongmunsa Temple. Take a family photo before the 1,100-year-old national monument ginkgo tree, and enjoy a short introduction to temple meditation and etiquette."
            },
            {
                time: "13:00",
                title: "전통 사찰 음식 체험",
                title_en: "Traditional Temple Food Experience",
                location: "용문사 인근 전통 식당",
                location_en: "Traditional Restaurant near Yongmunsa",
                icon: "🥬",
                desc: "자연주의 웰빙 한식으로 점심 식사",
                desc_en: "A wholesome, plant-based Korean wellness lunch.",
                details: "육류를 배제하고 제철 나물과 천연 양념으로 맛을 낸 건강한 사찰음식 정식을 체험합니다. 비건인 참석자들도 훌륭하게 배를 채울 수 있습니다.",
                details_en: "Savor a healthy temple food set meal featuring seasonal vegetables and natural seasonings — no meat, 100% natural. Fully vegan-friendly."
            },
            {
                time: "15:00",
                title: "패밀리 데이 프로그램",
                title_en: "Family Day Program",
                location: "교원 양평 별장",
                location_en: "Kyowon Yangpyeong Villa",
                icon: "🎈",
                desc: "아이도 어른도 다함께 웃고 뛰노는 이벤트",
                desc_en: "Fun activities for kids and adults alike — everyone plays together!",
                details: "사유 공간인 교원 양평 별장에서 프라이빗하게 진행됩니다. 아이들이 좋아하는 보물찾기, 미션형 게임 등 가족 협동 액티비티가 마련됩니다. 푸짐한 경품이 걸린 럭키드로우 이벤트로 즐거움을 더합니다.",
                details_en: "Held privately at the exclusive Kyowon Yangpyeong Villa. Family cooperative activities including treasure hunts and mission-based games. A lucky draw raffle with generous prizes adds to the excitement."
            },
            {
                time: "17:00",
                title: "K-Food 스페셜 다이닝 (부페)",
                title_en: "K-Food Special Dining (Buffet)",
                location: "양평 별장 지정 연회 공간",
                location_en: "Designated Banquet Hall, Yangpyeong Villa",
                icon: "👨‍🍳",
                desc: "대한민국 최고 쉐프가 선사하는 K-Food의 향연",
                desc_en: "A spectacular K-Food feast curated by South Korea's top chefs.",
                details: "글로벌에서 인지도가 높은 최강록 쉐프(흑백요리사) 도는 임성근 조리명장 등 정상급 쉐프를 초청하여 불고기, 잡채, 떡볶이, 전 등을 고급스러운 파인다이닝형 부페로 제공합니다. 전통주 퍼포먼스도 함께 진행되어 미각과 시각을 모두 만족시킵니다.",
                details_en: "Master chefs Choi Kang-rok (of Culinary Class Wars fame) and Im Sung-geun present bulgogi, japchae, tteokbokki, and jeon as an elevated fine-dining buffet. Complemented by a traditional Korean liquor performance that delights both eye and palate."
            },
            {
                time: "19:00",
                title: "숙소 복귀 및 휴식",
                title_en: "Return to Hotel & Rest",
                location: "호텔",
                location_en: "Hotel",
                icon: "🌙",
                desc: "일정을 모두 마치고 서울로 안전하게 복귀합니다.",
                desc_en: "Safe return to Seoul after all activities conclude.",
                details: "3일 간의 모든 일정을 즐겁게 소화하고, 버스를 통해 다시 삼성동 파르나스 호텔로 돌아옵니다. 이후 일요일 저녁 푹 쉬거나 다음날 개별 일정을 준비할 수 있습니다.",
                details_en: "After three wonderful days, board the bus back to Parnas Hotel in Samseong-dong. Enjoy a restful Sunday evening or prepare for your own plans the next day."
            }
        ]
    }
];
