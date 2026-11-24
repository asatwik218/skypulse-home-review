/* SkyPulse fleet — one source for the Fleet page and the aircraft pages.
   Performance figures are indicative manufacturer numbers for the type; confirm per airframe before launch. */
(function () {
  const A = 'media/';
  const SEAT_TEMPLATE = 'assets/vt-hgx/vt-hgx-seating.png';
  const DRAWING = '<svg viewBox="0 0 120 60" aria-hidden="true"><line x1="6" y1="12" x2="114" y2="12"/><line x1="60" y1="12" x2="60" y2="20"/><path d="M38 34c0-8 8-14 20-14h8c8 0 14 6 14 14v4H44c-4 0-6-2-6-4z"/><path d="M80 32h26l4-6"/><line x1="48" y1="46" x2="78" y2="46"/><line x1="54" y1="38" x2="52" y2="46"/><line x1="72" y1="38" x2="74" y2="46"/></svg>';

  const MISSIONS = [
    { key: 'vip', label: 'VIP & UHNWI' },
    { key: 'corporate', label: 'Corporate & regional' },
    { key: 'shuttle', label: 'Megapolis shuttle' },
    { key: 'pilgrimage', label: 'Pilgrimage' },
    { key: 'ems', label: 'Emergency medical' },
    { key: 'sar', label: 'Search & rescue' },
    { key: 'training', label: 'Flight training' }
  ];

  const FLEET = [
    {
      key: 'aw109', cut: 'assets/cutouts/aw109.png', cat: 'rotary', status: 'service',
      maker: 'Leonardo', name: 'AW109', full: 'Leonardo AW109S Grand',
      klass: 'Twin-engine light helicopter',
      line: 'A twin-engine executive helicopter with a cream leather club cabin.',
      desc: 'Two turbines, a quiet cabin and a club layout finished in diamond-quilted cream leather. The AW109S Grand is the fleet’s executive helicopter, leased to operators flying principals, corporate shuttles and medical missions.',
      regs: [
        { reg: 'VT-HGX', img: A + 'aw109-hgx-sky.jpg', note: 'VIP club cabin' },
        { reg: 'VT-HAX', img: A + 'aw109-hax.jpg', note: 'Executive cabin' }
      ],
      photos: [
        { src: A + 'aw109-hgx-sky.jpg', alt: 'AW109 VT-HGX on the apron', pos: 'center 70%' },
        { src: 'assets/vt-hgx/vt-hgx-interior.jpg', alt: 'VT-HGX cream leather club cabin', pos: 'center 60%' },
        { src: A + 'aw109-hax.jpg', alt: 'AW109 VT-HAX outside the hangar', pos: 'center 65%' },
        { src: A + 'aw109-hgx.jpg', alt: 'AW109 VT-HGX in profile', pos: 'center 78%' }
      ],
      video: 'videos/vt-hgx-tour.mp4',
      films: [
        { src: 'videos/vt-hgx-tour.mp4', label: 'Cabin tour', poster: A + 'aw109-hgx.jpg', pos: 'center 78%' }
      ],
      layout: 'assets/vt-hgx/vt-hgx-seating.png', layoutOwn: true,
      seats: 6, crew: 2, cruise: 289, range: 860,
      engines: '2 × Pratt & Whitney PW207C', power: 'Twin turbine',
      spec: [
        ['Passengers', '06 in VIP club layout · up to 07'],
        ['Crew', '02 pilots'],
        ['Max cruise', '≈ 289 km/h · 156 kt'],
        ['Range', '≈ 860 km, no reserve'],
        ['Engines', '2 × Pratt & Whitney PW207C'],
        ['Max take-off weight', '3,175 kg'],
        ['Cabin', 'Club 3 + 3, diamond-quilted leather'],
        ['Lease structures', 'Dry & operating · short or long term']
      ],
      missions: ['vip', 'corporate', 'shuttle', 'ems', 'sar']
    },
    {
      key: 'h130', cut: 'assets/cutouts/h130.png', cat: 'rotary', status: 'service',
      maker: 'Airbus', name: 'H130', full: 'Airbus H130 T2',
      klass: 'Single-engine light helicopter',
      line: 'Four airframes with a wide panoramic cabin and a quiet Fenestron tail.',
      desc: 'The widest cabin in its class, a flat floor and floor-to-ceiling glass. The enclosed Fenestron tail rotor keeps it quiet over cities and safe on crowded helipads, and it is proven on India’s high-altitude pilgrimage routes.',
      regs: [
        { reg: 'VT-SES', img: A + 'ses-golden.jpg', note: 'Black & gold livery' },
        { reg: 'VT-SDS', img: A + 'h130-sds.jpg', note: 'Black livery' },
        { reg: 'VT-HFX', img: A + 'h130-hfx.jpg', note: 'Gold livery' },
        { reg: 'VT-HEX', img: A + 'h130-hex.jpg', note: 'Gold livery' }
      ],
      photos: [
        { src: A + 'h130-flight.jpg', alt: 'Airbus H130 in flight', pos: 'center 50%' },
        { src: A + 'ses-golden.jpg', alt: 'H130 VT-SES at golden hour', pos: 'center 60%' },
        { src: A + 'cabin.jpg', alt: 'H130 passenger cabin', pos: 'center 50%' },
        { src: A + 'cockpit.jpg', alt: 'H130 cockpit', pos: 'center 50%' },
        { src: A + 'tail.jpg', alt: 'Fenestron tail with the SkyPulse feather', pos: 'center 40%' }
      ],
      video: 'videos/h130-ses-liftoff.mp4', videoScale: 1.22,
      films: [{ src: 'videos/h130-ses-liftoff.mp4', label: 'Lift-off', poster: A + 'ses-golden.jpg', pos: 'center 60%', scale: 1.22 }],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 7, crew: 1, cruise: 237, range: 610,
      engines: '1 × Safran Arriel 2D', power: 'Single turbine',
      spec: [
        ['Passengers', 'Up to 07'],
        ['Crew', '01 pilot'],
        ['Max cruise', '≈ 237 km/h · 128 kt'],
        ['Range', '≈ 610 km, no reserve'],
        ['Engine', '1 × Safran Arriel 2D'],
        ['Max take-off weight', '2,500 kg'],
        ['Tail rotor', 'Fenestron, enclosed and low-noise'],
        ['Lease structures', 'Dry & operating']
      ],
      missions: ['vip', 'shuttle', 'pilgrimage', 'ems']
    },
    {
      key: 'kingair', cut: 'assets/cutouts/kingair.png', cutCredit: 'Photo: Paul Seymour / AirHistory.net', cat: 'fixed', status: 'service',
      maker: 'Beechcraft', name: 'King Air', full: 'Beechcraft King Air B200',
      klass: 'Twin-turboprop',
      line: 'A pressurised twin-turboprop for short runways and regional airports.',
      desc: 'A pressurised cabin, two turboprops and the short-field performance to reach India’s smaller regional airports. The King Air carries corporate teams, regional charters through licensed operators, and fixed-wing medical evacuations.',
      regs: [{ reg: 'VT-ACD', img: 'assets/kingair-acd.jpg', note: 'Executive cabin' }],
      photos: [
        { src: 'assets/kingair-acd.jpg', alt: 'King Air VT-ACD on the apron', pos: 'center 55%' }
      ],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 9, crew: 2, cruise: 535, range: 2900,
      engines: '2 × Pratt & Whitney PT6A-42', power: 'Twin turboprop',
      spec: [
        ['Passengers', 'Up to 09 · 07 in executive layout'],
        ['Crew', '01–02 pilots'],
        ['Max cruise', '≈ 535 km/h · 289 kt'],
        ['Range', '≈ 2,900 km'],
        ['Engines', '2 × Pratt & Whitney PT6A-42'],
        ['Max take-off weight', '5,670 kg'],
        ['Cabin', 'Pressurised, executive seating'],
        ['Lease structures', 'Dry & operating']
      ],
      missions: ['vip', 'corporate', 'ems']
    },
    {
      key: 'hawker', cut: 'assets/cutouts/hawker.png', cat: 'fixed', status: 'service',
      maker: 'Hawker', name: 'Hawker 400', full: 'Hawker 400XP',
      klass: 'Light business jet',
      line: 'A light business jet: fast, flat-floored and built for city pairs.',
      desc: 'The fastest aircraft in the fleet. A light business jet with a flat-floor cabin that links India’s metros in a morning, leased to licensed operators serving corporate principals, family offices and long-range medical flights.',
      regs: [{ reg: 'VT-HBX', img: 'assets/hawker400-hbx.jpg', note: 'Executive cabin' }],
      photos: [
        { src: 'assets/hawker400-hbx.jpg', alt: 'Hawker 400 VT-HBX on the taxiway', pos: 'center 60%' }
      ],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 7, crew: 2, cruise: 830, range: 2500,
      engines: '2 × Pratt & Whitney JT15D-5R', power: 'Twin jet',
      spec: [
        ['Passengers', 'Up to 07'],
        ['Crew', '02 pilots'],
        ['High-speed cruise', '≈ 830 km/h · 447 kt'],
        ['Range', '≈ 2,500 km'],
        ['Engines', '2 × Pratt & Whitney JT15D-5R'],
        ['Max take-off weight', '7,394 kg'],
        ['Service ceiling', '45,000 ft'],
        ['Lease structures', 'Dry & operating']
      ],
      missions: ['vip', 'corporate', 'ems']
    },
    {
      key: 'h125', cat: 'rotary', status: 'arriving', when: '2026–27',
      maker: 'Airbus', name: 'H125', full: 'Airbus H125',
      klass: 'Single-engine utility helicopter',
      line: 'The high-altitude workhorse, for utility, rescue and mountain routes.',
      desc: 'The helicopter that has landed on the summit of Everest. The H125 brings high-altitude power and simple maintenance to utility work, search and rescue, and mountain pilgrimage routes.',
      regs: [], drawing: DRAWING,
      photos: [],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 6, crew: 1, cruise: 245, range: 630,
      engines: '1 × Safran Arriel 2D', power: 'Single turbine',
      spec: [
        ['Passengers', 'Up to 06'],
        ['Crew', '01 pilot'],
        ['Fast cruise', '≈ 245 km/h · 132 kt'],
        ['Range', '≈ 630 km, no reserve'],
        ['Engine', '1 × Safran Arriel 2D'],
        ['Max take-off weight', '2,250 kg'],
        ['Status', 'Arriving 2026–27']
      ],
      missions: ['pilgrimage', 'ems', 'sar']
    },
    {
      key: 'r44', cat: 'rotary', status: 'arriving', when: '2026–27',
      maker: 'Robinson', name: 'R44', full: 'Robinson R44 Raven II',
      klass: 'Four-seat piston helicopter',
      line: 'A four-seat piston helicopter for training schools and light utility.',
      desc: 'The world’s most widely used training and light-utility helicopter: four seats, a piston engine and low operating costs, for flying training organisations and aerial work.',
      regs: [], drawing: DRAWING,
      photos: [],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 3, crew: 1, cruise: 200, range: 550,
      engines: '1 × Lycoming IO-540', power: 'Single piston',
      spec: [
        ['Passengers', '03'],
        ['Crew', '01 pilot'],
        ['Cruise', '≈ 200 km/h · 109 kt'],
        ['Range', '≈ 550 km'],
        ['Engine', '1 × Lycoming IO-540'],
        ['Max take-off weight', '1,134 kg'],
        ['Status', 'Arriving 2026–27']
      ],
      missions: ['training']
    },
    {
      key: 'p2010', cut: 'assets/cutouts/p2010.png', cat: 'fixed', status: 'arriving', when: '2026–27', count: 25,
      maker: 'Tecnam', name: 'P2010', full: 'Tecnam P2010',
      klass: 'Four-seat training aircraft',
      line: 'Twenty-five glass-cockpit trainers for India’s flying schools.',
      desc: 'A fleet of twenty-five four-seat trainers with Garmin glass cockpits, leased to India’s flying training organisations as airlines hire pilots faster than ever.',
      regs: [],
      photos: [{ src: 'assets/tecnam-p2010.jpg', alt: 'Tecnam P2010 in flight over the coast', pos: 'center 50%' }],
      layout: SEAT_TEMPLATE, layoutOwn: false,
      seats: 3, crew: 1, cruise: 245, range: 1300,
      engines: '1 × Lycoming IO-360', power: 'Single piston',
      spec: [
        ['Seats', '04 · instructor + 3'],
        ['Max cruise', '≈ 245 km/h · 132 kt'],
        ['Range', '≈ 1,300 km'],
        ['Engine', '1 × Lycoming IO-360, 180 hp'],
        ['Avionics', 'Garmin G1000 NXi glass cockpit'],
        ['Fleet', '25 aircraft'],
        ['Status', 'Arriving 2026–27']
      ],
      missions: ['training']
    }
  ];

  window.SKY_FLEET = { FLEET, MISSIONS, DRAWING, SEAT_TEMPLATE };
})();
