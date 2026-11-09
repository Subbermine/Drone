export interface SpecItem {
  label: string;
  value: string;
}

export interface HardwareItem {
  id: string;
  name: string;
  tagline: string;
  type: string;
  image: string;
  badge: string;
  description: string;
  features: string[];
  specs: SpecItem[];
}

export const HARDWARE_DATA: HardwareItem[] = [
  {
    id: 'vajra-scan-g',
    name: 'Vajra Scan-G System',
    tagline: 'Stationary & Tactical Multi-Frequency RF Drone Detector',
    type: 'Detection & Tracking',
    image: '/assets/vajra-scan-tripod-blue.png',
    badge: '4,000m Coverage Radius',
    description: 'The Vajra Scan-G System ensures superior drone detection with a 4,000-meters range, identifying threats in under 10 seconds. Using passive RF detection across multiple bands, it offers 360° azimuth and 30° elevation coverage while tracking multiple rogue drones simultaneously. Designed for vehicle-mounted or field tripod deployments.',
    features: [
      'Passive RF signal detection with zero electromagnetic footprint',
      'Instant brand, model, serial number, and pilot location identification',
      'Real-time flight path visualization and trajectory prediction',
      'Rapid detection in under 10 seconds across 360° azimuth',
      'Ruggedized 10-inch Windows OS tablet (IP65 & MIL-STD-810G compliant)',
      'Covers 99% of commercial-off-the-shelf (COTS) and DIY WiFi drones'
    ],
    specs: [
      { label: 'Detected Drone Types', value: 'COTS & WiFi drones (DJI, Autel, Parrot, DIY FPV)' },
      { label: 'Detection Method', value: 'Passive detection of RF signals' },
      { label: 'Visualization Tracking', value: 'Displays Real-Time Flight Path & Pilot Location' },
      { label: 'Detection Range', value: 'Up to 4,000 m (4 km radius)' },
      { label: 'Identification Capability', value: 'Brand, Model and Serial No.' },
      { label: 'Coverage & Direction', value: '360° azimuth, 30° elevation (±20°)' },
      { label: 'Unit Weight', value: '10 kg (Compact & highly portable)' },
      { label: 'Power Requirements', value: '220V–240V AC or Field Generator / Battery' },
      { label: 'Detection Speed', value: '< 10 seconds rapid lock' },
      { label: 'Frequency Bands', value: '433 MHz, 840 MHz, 915 MHz, 2.4 GHz, 5.8 GHz' },
      { label: 'Tactical Console', value: '10-inch rugged Windows OS tablet (IP65 / MIL-STD-810G)' },
      { label: 'Market Effectiveness', value: 'Covers 99% of COTS drones by global volume' }
    ]
  },
  {
    id: 'vajra-shot',
    name: 'Vajra Shot Handheld Jammer',
    tagline: 'Software-Defined Tactical Anti-Drone Jamming Gun',
    type: 'Neutralization & Jamming',
    image: '/assets/vajra-shot-gun-blue.png',
    badge: '2,000m Tactical Range',
    description: 'The Vajra Shot represents a groundbreaking handheld anti-drone jammer, setting itself apart with its software-defined functionality. It possesses the unique ability to adapt its interference output frequency using software, effectively neutralizing a wide array of standard and non-standard unauthorized drones with precision.',
    features: [
      'Software-defined frequency adaptation targeting specific drone signals',
      'Multi-band RF disruption and GPS spoofing forcing safe vertical descent',
      'Forced Return-to-Home (RTH) or emergency controlled landing',
      'Ultra-lightweight composite build (<3.5 kg) for rapid single-operator response',
      'One-button trigger start with integrated LED status display',
      '24/7 uninterrupted operation with simultaneous multi-frequency jamming'
    ],
    specs: [
      { label: 'Jamming Range', value: '2,000 m (Open environment, 0.1W radiation/source)' },
      { label: 'Jamming Frequencies', value: '433 MHz, 840 MHz, 915 MHz, 2.4 GHz, and 5.8 GHz' },
      { label: 'Software Customizable Bands', value: '300 MHz – 2,500 MHz custom configuration' },
      { label: 'Overall Weight', value: '< 3.5 kg (Ultra-maneuverable)' },
      { label: 'Display Console', value: 'OLED / LED self-check status and interference timer' },
      { label: 'Power Supply', value: 'High-density built-in rechargeable Lithium battery' },
      { label: 'Drone Neutralization Modes', value: 'Forced Return-to-Home & Controlled Vertical Descent' },
      { label: 'Operation Ergonomics', value: 'Tactical rifle grip, one-button quick response' },
      { label: 'Endurance', value: 'Continuous multi-band jamming capability' }
    ]
  }
];

export const CORE_SERVICES = [
  {
    id: 'detection-jamming',
    title: 'Drone Detection & Jamming',
    subtitle: 'Autonomous perimeter surveillance & tactical threat neutralization',
    icon: 'Radio',
    points: [
      'Deploys advanced RF scanning and passive radar systems monitoring skies in real-time.',
      'Identifies unauthorized drones within a 4 km perimeter in under 10 seconds.',
      'Simultaneously tracks up to 40 targets with zero RF interference to concert audio/radios.',
      'Neutralizes rogue threats using surgical RF disruption and GPS spoofing.',
      'Forces hostile drones to land safely or retreat from designated no-fly zones.'
    ]
  },
  {
    id: 'airspace-management',
    title: 'Tailored Airspace Management',
    subtitle: 'Comprehensive flight path architecture for live production',
    icon: 'Compass',
    points: [
      'Designs pre-approved 3D flight paths for authorized broadcast & media drones.',
      'Prevents approved drones from straying into restricted VIP or stage pyrotechnic zones.',
      'Conducts mandatory pilot licensing, driver verification, and hardware security checks.',
      'Coordinates live air traffic with venue operations, stage managers, and broadcast teams.',
      'Risk mitigation protocols designed to avoid collisions and aerial mishaps.'
    ]
  },
  {
    id: 'vip-protection',
    title: 'VIP & Performer Sanctuary',
    subtitle: 'Backstage aerial bubbles & intellectual property protection',
    icon: 'ShieldCheck',
    points: [
      'Enforces an impenetrable geofenced aerial shield around artist stages and green rooms.',
      'Protects against unauthorized telephoto photography, video espionage, and paparazzi drones.',
      'Prevents IP infringement and illegal live-streaming of unreleased concerts and performances.',
      'Eliminates safety hazards from drone crashes, rotor injuries, or object-dropping payloads.'
    ]
  }
];

export const STATS = [
  {
    value: 600000,
    suffix: '+',
    label: 'Rogue Drones in Country',
    subtext: 'Unregulated drones identified across India by security agencies (Economic Times)'
  },
  {
    value: 4000,
    suffix: 'm',
    label: 'Perimeter Detection Radius',
    subtext: 'Continuous 360° spherical dome coverage around live concert venues'
  },
  {
    value: 10,
    prefix: '< ',
    suffix: 's',
    label: 'Threat Acquisition Speed',
    subtext: 'Instant signature identification of brand, model, and pilot coordinates'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Airspace Control',
    subtext: 'Commanded exclusively by battle-tested ex-Indian Army tactical officers'
  }
];

export const CONTACT_PERSONNEL = [
  {
    name: 'Sushil',
    phone: '+91 9818008953',
    cleanPhone: '+919818008953',
    role: 'Operations & Tactical Deployment Director',
    badge: 'Ex-Defense Tactical Specialist'
  },
  {
    name: 'Harris',
    phone: '+91 9619015750',
    cleanPhone: '+919619015750',
    role: 'Airspace Security & Venue Solutions Lead',
    badge: 'Live Events Security Commander'
  }
];

export const FAQS = [
  {
    question: 'How does BuzzKill detect rogue drones without interfering with event equipment?',
    answer: 'BuzzKill uses passive RF (Radio Frequency) scanning and radar sensors. Passive detection does not emit any RF radiation into the environment; it silently listens for drone telemetry and video links. It has zero interference with stage wireless microphones, in-ear monitors (IEMs), lighting DMX controllers, or venue Wi-Fi.'
  },
  {
    question: 'What happens to a rogue drone when the Vajra Shot jammer is activated?',
    answer: 'The Vajra Shot emits directed, software-tailored interference frequencies specifically targeting the drone’s control signals and GPS navigation. Depending on the tactical requirement, the drone is forced into an immediate safe vertical descent on the spot or triggered to activate its automated Return-to-Home (RTH) failsafe, sending it back to where the unauthorized operator launched it.'
  },
  {
    question: 'Can official event production and broadcast drones still fly during the show?',
    answer: 'Yes! That is the core of our Airspace Management solution. We register, inspect, and whitelist all official media drones, issue pre-approved 3D corridor flight paths, and coordinate in real-time with production crews. Our systems monitor authorized drones while isolating and neutralizing rogue intruders.'
  },
  {
    question: 'Who operates the BuzzKill security and jamming systems?',
    answer: 'All BuzzKill deployments are led and executed exclusively by ex-Indian Army officers and defense-trained security personnel. Their military-grade discipline, tactical situational awareness, and calm composure under high pressure ensure foolproof security during high-stakes concerts, festivals, and VIP gatherings.'
  },
  {
    question: 'What is the required lead time to book BuzzKill for a concert or festival?',
    answer: 'We recommend booking 2 to 4 weeks prior to the event to allow adequate time for venue 3D airspace mapping, local authority coordination, and RF spectrum profiling. However, our rapid-response tactical teams can be deployed on expedited notice for emergency VIP security requirements.'
  }
];

