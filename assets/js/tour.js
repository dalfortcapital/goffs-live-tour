// Goff's Live Tour: all content lives in this file.
// Questions, branching, products, hotspots, photos and the rep's talk track.
// To add a product, a question or a whole new branch, edit this file only. No build step.
//
// Product facts come from goffsenterprises.com (November 2026). Items marked
// "verify" in the README should be confirmed by Goff's before customer use.

export const CONTACT = { phone: '(262) 691-4998', email: 'sales@goffscw.com', web: 'goffsenterprises.com' };

const U = 'https://www.goffsenterprises.com/wp-content/uploads/';
export const PHOTOS = {
  cyclone:        { src: U + '2025/12/goffs-cyclone.jpg', caption: 'Cyclone High Performance Door' },
  cycloneInstall: { src: U + '2026/02/goffs-cyclone-inhouse-install.jpg', caption: 'Cyclone, installed' },
  cycloneSpiral:  { src: U + '2026/02/goffs-cyclone-spiral.jpg', caption: 'Cyclone spiral system' },
  g2:             { src: U + '2020/08/goffs-hpd-g2.jpg', caption: 'G2 high-performance door' },
  g2a:            { src: U + '2020/07/goffs-g22800-0220-17.jpg', caption: 'G2 2800' },
  g2b:            { src: U + '2020/07/goffs-g22800-0220-02.jpg', caption: 'G2 2800' },
  bugDoor:        { src: U + '2024/10/goffs-g2-basic-bugdoor-01.jpg', caption: 'Bug-blocking mesh door' },
  cwAero:         { src: U + '2021/01/goffs-curtainwall-aero-2.jpg', caption: 'Curtain wall in an aircraft hangar' },
  cw1:            { src: U + '2021/01/DSCN0905.jpg', caption: 'Curtain wall with clear vision panels' },
  cwClimate:      { src: U + '2021/01/goffs-climate-curtain-chickfila-01.jpg', caption: 'Climate Curtain Wall' },
  cw2:            { src: U + '2021/01/IMG_9727.jpg', caption: 'Curtain wall around a cutting station' },
  cwYellow:       { src: U + '2021/01/Goffs-Curtain-Walls-Yellow-1.jpg', caption: 'Original Curtain Wall' },
  cw3:            { src: U + '2021/02/IMG_2679-002.jpg', caption: 'Curtain walls around work cells' },
  shelter:        { src: U + '2024/07/goffs-foamsided-shelter-install-tyler.jpg', caption: 'Foam Sided Truck Shelter, installed' },
  seals:          { src: U + '2024/06/Contractor-Seals2.jpg', caption: 'Dock seals' },
  dock:           { src: U + '2024/02/IMG_2623-copy.jpg', caption: 'Loading dock' },
};

export const DIAGRAMS = { doors: 'assets/img/door.svg', curtain: 'assets/img/curtain.svg', dock: 'assets/img/dock.svg' };

const DOOR_STD = ['Auto-reset after impact', 'Full-width window', 'Auto-close timer'];
const CW_STD = [['Hardware', 'Track, hooks, end stops included'], ['Mounting', '25+ track options'], ['Made in', 'USA']];
const DOCK_STD = ['Standard', 'Yellow guide stripes, wear pleats'];

export const PRODUCTS = {
  // ---- High-performance doors
  cyclone: {
    name: 'Cyclone High Performance Door', branch: 'doors', photo: PHOTOS.cyclone.src,
    tagline: 'A high-speed interior door that resets itself after an impact.',
    specs: [['Opening speed', 'Up to 100 in/sec'], ['Closing speed', 'Up to 45 in/sec'], ['Max opening', "12' × 12'"], ['Impact recovery', 'Automatic (AIR)'], ['Controls', 'ICS3 with HMI touchscreen']],
  },
  g2_5400: {
    name: 'G2 5400 High Traffic Door', branch: 'doors', photo: PHOTOS.g2.src,
    tagline: 'The fastest G2, built for openings that never stop cycling.',
    specs: [['Speed', '54"/sec'], ['Duty', 'Up to 120 cycles/hr'], ['Max opening', "16' × 16'"], ['Controls', 'ICS2, NEMA 4X, VFD'], ['Safety', '42" IP67 light curtain']],
  },
  g2_2800: {
    name: 'G2 2800 Door', branch: 'doors', photo: PHOTOS.g2a.src,
    tagline: 'A medium-traffic workhorse with the full G2 feature set.',
    specs: [['Speed', '28"/sec'], ['Duty', 'Up to 120 cycles/hr'], ['Max opening', "16' × 16'"], ['Controls', 'ICS2, NEMA 4X, VFD'], ['Safety', 'IP67 photo eye']],
  },
  g2_1800: {
    name: 'G2 1800 Door', branch: 'doors', photo: PHOTOS.g2b.src,
    tagline: 'Right-sized for openings that cycle a few times an hour.',
    specs: [['Speed', '18"/sec'], ['Duty', 'Up to 24 cycles/hr'], ['Max opening', "16' × 16'"], ['Motor', 'In-tube, inside the header'], ['Install', 'In-jamb option']],
  },
  model_2000: {
    name: 'Model 2000 Door', branch: 'doors', photo: null,
    tagline: 'The economical medium-traffic door for smaller openings.',
    specs: [['Traffic', 'Medium'], ['Max opening', "12' × 12'"], ['Standard', DOOR_STD.join(', ')]],
  },
  clean_guard: {
    name: 'Clean Guard Wash Down Door', branch: 'doors', photo: null,
    tagline: 'A corrosion-resistant door that separates wet application areas.',
    specs: [['Materials', 'Corrosion-resistant'], ['Max opening', "12' × 12'"], ['Built for', 'Washdown areas']],
  },
  harsh_guard: {
    name: 'Harsh Guard Door', branch: 'doors', photo: null,
    tagline: 'A high-performance door built for harsh areas.',
    specs: [['Speed', '28"/sec'], ['Max opening', "16' × 16'"], ['Standard', DOOR_STD.join(', ')]],
  },
  g1: {
    name: 'G1 Industrial Bug Screen Door', branch: 'doors', photo: PHOTOS.bugDoor.src,
    tagline: 'Lets fresh air in and keeps bugs and pests out.',
    specs: [['Max opening', "12' × 14'"], ['Panel', 'Bug-blocking mesh']],
  },
  // ---- Curtain walls
  cw_original: {
    name: 'Original Curtain Wall', branch: 'curtain', photo: PHOTOS.cwYellow.src,
    tagline: 'The original industrial space-partitioning system. Stops dust, contaminants and overspray from spreading.',
    specs: [['Material', '14oz or 18oz vinyl'], ...CW_STD],
  },
  cw_climate: {
    name: 'Climate Curtain Wall', branch: 'curtain', photo: PHOTOS.cwClimate.src,
    tagline: 'Vinyl lined with 3M Thinsulate Ultra insulation to cut temperature loss between zones.',
    specs: [['Insulation', '3M Thinsulate Ultra'], ...CW_STD],
  },
  cw_sound: {
    name: 'Sound Curtain Wall', branch: 'curtain', photo: null,
    tagline: 'Vinyl with a viscoelastic acoustic dampener to block harmful industrial noise.',
    specs: [['Core', 'Viscoelastic acoustic dampener'], ...CW_STD],
  },
  cw_clean: {
    name: 'Clean Curtain Wall', branch: 'curtain', photo: null,
    tagline: 'Clear PVC curtains that separate washdown areas and contain overspray.',
    specs: [['Material', 'Clear PVC'], ...CW_STD],
  },
  cw_welding: {
    name: 'Welding Curtain Wall', branch: 'curtain', photo: null,
    tagline: 'Blocks UV rays and protects against fumes, contaminants and sparks.',
    specs: [['Protects against', 'UV, fumes, sparks'], ...CW_STD],
  },
  cw_outdoor: {
    name: 'Outdoor Curtain Wall', branch: 'curtain', photo: null,
    tagline: 'A heavy-duty curtain that encloses outdoor areas against wind and weather.',
    specs: [['Build', 'Heavy-duty, outdoor-rated'], ...CW_STD],
  },
  // ---- Dock seals & shelters
  head_pad_seal: {
    name: 'Head Pad Dock Seal', branch: 'dock', photo: PHOTOS.seals.src,
    tagline: 'Foam-filled head and side pads for the tightest seal around the trailer.',
    specs: [['Head', 'Foam-filled pad'], ['Sides', 'Foam-filled pads'], ['Best for', 'Consistent trailers'], DOCK_STD],
  },
  head_curtain_seal: {
    name: 'Head Curtain Dock Seal', branch: 'dock', photo: PHOTOS.seals.src,
    tagline: 'A curtain-style header with foam-filled side pads. The most economical way to close the gap.',
    specs: [['Head', 'Curtain-style header'], ['Sides', 'Foam-filled pads'], ['Position', 'Most economical'], DOCK_STD],
  },
  rigid_shelter: {
    name: 'Rigid Frame Truck Shelter', branch: 'dock', photo: null,
    tagline: 'Seals the top and sides while leaving full-width access to the back of the trailer.',
    specs: [['Access', 'Full width of the trailer'], ['Seals', 'Top and sides'], ['Option', 'Integrated Weather Wall'], DOCK_STD],
  },
  foam_shelter: {
    name: 'Foam Sided Truck Shelter', branch: 'dock', photo: PHOTOS.shelter.src,
    tagline: 'Foam-filled, insulated side members with a rigid structural header.',
    specs: [['Sides', 'Foam-filled, insulated'], ['Header', 'Rigid frame, structural'], ['Options', 'Weather Wall, metal hood'], DOCK_STD],
  },
  flex_shelter: {
    name: 'Flexible Frame Truck Shelter', branch: 'dock', photo: null,
    tagline: 'A shelter frame that pulls back on impact, so off-center trailers don’t wreck it.',
    specs: [['Frame', 'Pulls back on impact'], ['Benefit', 'Less frame damage'], DOCK_STD],
  },
};

// ---------------------------------------------------------------------------
// Recommendation logic: answers in, product + reasons out.

const has = (arr, v) => Array.isArray(arr) && arr.includes(v);
const uniq = (xs) => [...new Set(xs.filter(Boolean))];

function recDoors(a) {
  const env = a.door_env, t = a.door_traffic, size = a.door_size, issues = a.door_issues || [];
  const small = size === 's8' || size === 's12';
  let id;
  if (env === 'washdown') id = 'clean_guard';
  else if (env === 'harsh') id = 'harsh_guard';
  else if (env === 'exterior' && has(issues, 'bugs') && t !== 'high') id = 'g1';
  else if (env !== 'exterior' && small && (t === 'high' || has(issues, 'impacts'))) id = 'cyclone';
  else if (t === 'high') id = 'g2_5400';
  else if (t === 'medium') id = small && !has(issues, 'impacts') ? 'model_2000' : 'g2_2800';
  else if (t === 'low') id = 'g2_1800';
  else id = small ? 'cyclone' : 'g2_5400';

  const r = [];
  if (env === 'washdown') r.push('Corrosion-resistant materials built for wet application areas');
  if (env === 'harsh') r.push('Built for harsh areas, opening at 28"/sec');
  if (env === 'interior' && id !== 'g1') r.push('Separates departments and temperature zones inside the building');
  if (t === 'high' || has(issues, 'slow')) {
    if (id === 'cyclone') r.push('Opens at up to 100 in/sec, so traffic never waits on the door');
    else if (id === 'g2_5400') r.push('Opens at 54"/sec and handles up to 120 cycles an hour');
  }
  if (t === 'medium' && id === 'g2_2800') r.push('28"/sec and up to 120 cycles an hour covers steady, all-shift traffic');
  if (t === 'medium' && id === 'model_2000') r.push('An economical medium-traffic door sized for smaller openings');
  if (t === 'low' && id === 'g2_1800') r.push('Rated for up to 24 cycles an hour, so you don’t pay for speed you won’t use');
  if (has(issues, 'impacts')) r.push(id === 'cyclone'
    ? 'Automatic Impact Recovery resets the curtain after a hit, with no manual intervention'
    : 'Auto-resets after an impact, and panels are easy to replace in the field');
  if (has(issues, 'energy')) r.push('Auto-close timer keeps the opening shut between trips');
  if (has(issues, 'bugs')) r.push(id === 'g1' ? 'Lets fresh air in while keeping bugs and pests out' : 'Swap in bug-blocking mesh panels for the warm months');
  if (has(issues, 'dust')) r.push('A closed curtain keeps dust and contaminants on their side of the wall');
  if (has(issues, 'safety')) r.push(id === 'cyclone'
    ? 'Soft wireless reversing edge, photo eye and a panoramic vision panel'
    : id === 'g2_5400' ? '42" IP67 light curtain plus a full-width window' : 'Full-width window so drivers see what’s on the other side');

  const addons = [];
  if (id === 'cyclone') addons.push('45-day real-world Cyclone trial');
  if (has(issues, 'bugs') && id !== 'g1') addons.push('Mesh panels for summer');
  if (t === 'high' || has(issues, 'impacts')) addons.push('Motion sensor, remote or pull-cord activation');
  if (env === 'exterior' && has(issues, 'safety')) addons.push('Fall Guard dock fall protection');

  let note = '';
  if (size === 'big') note = 'Openings over 16′ × 16′ get an engineering review. We’ll confirm the model on the site survey.';
  else if ((id === 'clean_guard' || id === 'model_2000') && size === 's16') note = 'This model is offered up to 12′ × 12′. For a 16′ opening we’ll review options on the site survey.';
  else if (id === 'g1' && size === 's16') note = 'The G1 is offered up to 12′ × 14′. For a larger opening we’ll review options on the site survey.';

  return { id, product: PRODUCTS[id], reasons: uniq(r).slice(0, 4), addons: uniq(addons), note };
}

function recCurtain(a) {
  const map = { temperature: 'cw_climate', noise: 'cw_sound', dust: 'cw_original', washdown: 'cw_clean', welding: 'cw_welding', weather: 'cw_outdoor' };
  const id = map[a.curtain_goal] || 'cw_original';
  const core = {
    cw_climate: '3M Thinsulate lining cuts temperature loss between zones',
    cw_sound: 'Viscoelastic acoustic dampener blocks industrial noise at the source',
    cw_original: 'Confines dust, dirt and overspray to the area that makes it',
    cw_clean: 'Clear PVC contains washdown spray and keeps sightlines open',
    cw_welding: 'Blocks UV and protects nearby workers from fumes and sparks',
    cw_outdoor: 'Heavy-duty curtain encloses outdoor areas against wind and weather',
  }[id];
  const cfg = {
    single: 'A single curtain line divides the building with no construction',
    l: 'A two-sided L closes off a corner using your existing walls',
    three: 'A three-sided enclosure uses an existing wall as the fourth side',
    four: 'A four-sided, free-standing enclosure creates a room anywhere on the floor',
  }[a.curtain_config];
  const access = {
    forklifts: 'A strip door section lets forklifts drive through the curtain line',
    people: 'A strip door section keeps foot traffic moving',
    slides: 'Roller hooks on the track let the curtain slide open and stack back',
    fixed: 'A replaceable floor sweep seals the bottom edge',
  }[a.curtain_access];
  const mount = {
    ceiling: 'Hangs from the ceiling or deck on threaded rod or ceiling mounts',
    beam: 'Beam flange clamps hang the track straight from your I-beams',
    wall: 'Wall and end mounts carry the track off your existing walls',
    floor: 'Free-standing floor mounts when there’s nothing overhead to hang from',
  }[a.curtain_mount];
  const addons = [];
  if (a.curtain_goal === 'dust' || a.curtain_goal === 'welding') addons.push('Filter panels');
  if (a.curtain_access === 'forklifts') addons.push('High-speed door in the curtain line');
  if (a.curtain_access === 'forklifts' || a.curtain_access === 'people') addons.push('Strip door section');
  addons.push('Floor sweep', 'Upper valance panel', 'Custom colors and branding');
  return { id, product: PRODUCTS[id], reasons: uniq([core, cfg, access, mount]).slice(0, 4), addons: uniq(addons).slice(0, 4), note: '' };
}

function recDock(a) {
  const issues = a.dock_issues || [];
  let id;
  if (a.dock_drive === 'allover' || a.dock_priority === 'durability' || has(issues, 'impacts')) id = 'flex_shelter';
  else if (a.dock_trailers === 'mixed') id = a.dock_priority === 'access' ? 'rigid_shelter' : 'foam_shelter';
  else if (a.dock_priority === 'access') id = 'rigid_shelter';
  else if (a.dock_priority === 'cost') id = 'head_curtain_seal';
  else id = 'head_pad_seal';

  const r = [];
  if (id === 'flex_shelter') r.push('Flexible frame pulls back on impact instead of bending');
  if (id === 'head_pad_seal') r.push(a.dock_trailers === 'reefer' ? 'Foam pads compress against the trailer to hold the cold chain' : 'Foam pads compress against the trailer for the tightest seal');
  if (id === 'head_curtain_seal') r.push('The most economical way to seal the trailer');
  if (id === 'rigid_shelter') r.push('Full-width access to the back of the trailer for forklifts');
  if (id === 'foam_shelter') r.push('Insulated foam sides handle a mixed fleet of trailer sizes');
  if (has(issues, 'drafts') || a.dock_trailers === 'reefer') r.push('Seals the top and sides of the trailer to cut heating and cooling costs');
  if (has(issues, 'weather') || has(issues, 'pests')) r.push('Keeps out rain, snow, sun and pests');
  if (a.dock_drive === 'allover') r.push('Yellow guide stripes help drivers center the trailer');
  if (r.length < 3) r.push('Yellow guide stripes and corner wear pleats come standard');

  const addons = [];
  if (has(issues, 'damaged')) addons.push('Dock Seal Bottom Boot');
  if (has(issues, 'gaps')) addons.push('Dock Blocker');
  if (has(issues, 'fall')) addons.push('Fall Guard Safety System');
  if (has(issues, 'creep')) addons.push('PRH Trailer Restraint');
  if (has(issues, 'weather') && (id === 'foam_shelter' || id === 'rigid_shelter')) addons.push('Integrated Weather Wall');
  if (has(issues, 'weather') && id === 'foam_shelter') addons.push('Metal hood');
  if (addons.length < 2) addons.push('88-8 laminated wheel chocks');
  return { id, product: PRODUCTS[id], reasons: uniq(r).slice(0, 4), addons: uniq(addons).slice(0, 4), note: '' };
}

export function recommend(a) {
  if (a.need === 'doors') return recDoors(a);
  if (a.need === 'curtain') return recCurtain(a);
  if (a.need === 'dock') return recDock(a);
  return null;
}

export function ctxFor(state) {
  const a = state.answers || {};
  const rec = recommend(a);
  return { a, meta: state.meta || {}, need: a.need, rec, p: rec && rec.product };
}

// ---------------------------------------------------------------------------
// Hotspot content (depends on the recommended product)

function doorSpots(ctx) {
  const cy = ctx.rec && ctx.rec.id === 'cyclone';
  const pid = ctx.rec && ctx.rec.id;
  const sensing = cy ? 'A soft wireless reversing edge and soft bottom edge pocket, plus a through-beam photo eye across the opening.'
    : pid === 'g2_5400' ? 'A 42" IP67 light curtain watches the opening. The door won’t come down on people or product.'
    : pid === 'g2_2800' ? 'An IP67 photo eye watches the opening, so the door won’t come down on people or product.'
    : 'Photo-eye safety sensing watches the opening, so the door won’t come down on people or product.';
  return [
    { id: 'header', x: 28, y: 16.3, title: cy ? 'Optional header box' : 'Full-width header cover',
      text: cy ? 'Protects against dust and moisture and conceals the hardware.' : 'Covers the roll and drive across the full width of the door.' },
    { id: 'impact', x: 37, y: 66, title: cy ? 'Automatic Impact Recovery (AIR)' : 'Auto-reset after impact',
      text: cy ? 'A soft breakaway curtain that resets itself without manual intervention. Retention tabs are designed to fail first and swap out with basic hand tools.'
        : 'When a forklift clips the curtain, it breaks away and resets. Panels have welded seams and are easy to replace in the field.' },
    { id: 'window', x: 62, y: 45.5, title: cy ? 'Panoramic vision panel' : 'Full-width window',
      text: cy ? 'A PVC vision panel up to 60" × 36", so drivers see what’s coming.' : 'Drivers and pedestrians can see through the opening before they go.' },
    { id: 'bars', x: 69, y: 58, title: cy ? 'Adjustable Curtain Retention (ACR)' : 'Fiberglass wind bars',
      text: cy ? 'A patent-pending field adjustment for positive or negative building pressure. No special parts or labor.'
        : 'Yield to impact without permanent damage, and won’t rust in wet areas.' },
    { id: 'guides', x: 22.6, y: 57.7, title: 'Aluminum side guides',
      text: cy ? 'Compact aluminum guides with self-lubricating UHMW inserts.' : 'Aluminum guides resist rust and corrosion.' },
    { id: 'safety', x: 77.4, y: 83, title: 'Safety sensing', text: sensing },
    { id: 'controls', x: 89.9, y: 55.4, title: cy ? 'ICS3 control panel' : 'Controls',
      text: cy ? 'VFD motor control, HMI touchscreen and remote diagnostics in a pre-wired NEMA 4X enclosure.'
        : 'From a simple push button up to the ICS2 touchscreen (PLC + VFD in a NEMA 4X box). Add motion sensors, a remote or a pull cord for forklift drivers.' },
  ];
}

function curtainSpots(ctx) {
  const fabric = {
    cw_climate: ['Insulated curtain', 'Vinyl lined with 3M Thinsulate Ultra insulation to cut temperature loss.'],
    cw_sound: ['Acoustic curtain', 'Vinyl with a viscoelastic acoustic dampener to block industrial noise.'],
    cw_clean: ['Clear PVC curtain', 'Contains washdown and overspray while you still see across the line.'],
    cw_welding: ['Welding curtain', 'Blocks UV rays and protects against fumes, contaminants and sparks.'],
    cw_outdoor: ['Outdoor curtain', 'Heavy-duty construction that stands up to wind and weather.'],
    cw_original: ['Curtain material', '14oz or 18oz vinyl, plus mesh, in a range of colors. Custom colors on request.'],
  }[(ctx.rec && ctx.rec.id) || 'cw_original'];
  return [
    { id: 'mount', x: 19.4, y: 11.2, title: '25+ mounting options', text: 'Threaded rod, beam flange clamp, wall and end mount, ceiling mount, or a free-standing floor mount.' },
    { id: 'track', x: 34.7, y: 15.4, title: 'Track and roller hooks', text: 'Every curtain ships with track cut to length, track splice, roller hooks, end stops and track mount.' },
    { id: 'valance', x: 72.2, y: 10.8, title: 'Upper valance panel', text: 'Closes the gap between the track and the ceiling.' },
    { id: 'brand', x: 36.4, y: 47.5, title: 'Custom branding', text: 'Your logo or safety messaging printed on the curtain, in custom colors.' },
    { id: 'fabric', x: 23.6, y: 74, title: fabric[0], text: fabric[1] },
    { id: 'strip', x: 50, y: 57.7, title: 'Strip door section', text: 'People and forklifts pass through the curtain line without opening it up.' },
    { id: 'filter', x: 76.4, y: 39.4, title: 'Filter panels', text: 'Removable, nylon-scrim-reinforced panels in 2′ × 4′ or 4′ × 4′.' },
    { id: 'sweep', x: 77.8, y: 87.3, title: 'Floor sweep', text: 'A 6" replaceable vinyl sweep closes the gap at the floor.' },
  ];
}

function dockSpots(ctx) {
  const id = (ctx.rec && ctx.rec.id) || 'head_pad_seal';
  const seal = id === 'head_pad_seal' || id === 'head_curtain_seal';
  const head = id === 'head_pad_seal' ? ['Foam head pad', 'A foam-filled head pad seals across the top of the trailer.']
    : id === 'head_curtain_seal' ? ['Head curtain', 'A curtain-style header seals the top and flexes to the trailer height.']
    : id === 'foam_shelter' ? ['Rigid structural header', 'A rigid-frame header carries the shelter and seals across the top.']
    : ['Header', 'Seals across the top of the trailer.'];
  const sides = seal ? ['Foam side pads', 'Foam-filled side pads compress against the trailer for a tight seal.']
    : id === 'foam_shelter' ? ['Insulated foam sides', 'Foam-filled, insulated side members seal the sides of the trailer.']
    : id === 'flex_shelter' ? ['Flexible frame', 'The frame pulls back on impact, reducing frame damage.']
    : ['Rigid frame sides', 'Seal the sides while leaving full-width access to the back of the trailer.'];
  return [
    { id: 'head', x: 50, y: 13.5, title: head[0], text: head[1] },
    { id: 'pleats', x: 17.6, y: 9, title: 'Wear pleats', text: 'Standard in both upper corners, where trailers rub the most.' },
    { id: 'stripes', x: 20.8, y: 48, title: 'Yellow guide stripes', text: 'Standard on both sides. They give drivers a target for centering the trailer.' },
    { id: 'sides', x: 81.9, y: 48, title: sides[0], text: sides[1] },
    { id: 'boot', x: 79.2, y: 80.8, title: 'Dock Seal Bottom Boot', text: 'Repairs a damaged seal bottom without replacing the whole seal.' },
    { id: 'blocker', x: 40.3, y: 81.9, title: 'Dock Blocker', text: 'Fills the gaps around the dock.' },
    { id: 'restraint', x: 50, y: 91, title: 'PRH Trailer Restraint', text: 'Holds the trailer at the dock while it’s being loaded.' },
    { id: 'chock', x: 25.6, y: 92.7, title: '88-8 Laminated Wheel Chock', text: 'With 15′ or 20′ chain options and a sign.' },
  ];
}

// ---------------------------------------------------------------------------
// "Picture this" comparisons. They pick a scenario from what the customer said.

function doorCompare(ctx) {
  const i = ctx.a.door_issues || [];
  if (has(i, 'impacts') || !i.length) return {
    title: 'When a forklift clips the door',
    without: { title: 'A conventional door', items: ['A panel or guide gets bent, and the door is stuck open or shut', 'Heated or cooled air pours out while you wait on a service call', 'Traffic reroutes around a broken opening'] },
    with: { title: 'A Goff’s high-performance door', items: ['The soft curtain breaks away and resets itself', 'It’s back in service without a service call', 'Panels and wear parts are replaced in the field'] },
  };
  if (has(i, 'bugs') && !has(i, 'energy')) return {
    title: 'Warm-weather doors left open',
    without: { title: 'Propped-open dock doors', items: ['Doors stay open all summer for airflow', 'Bugs, birds and pests get into the building', 'Product and sanitation are at risk'] },
    with: { title: 'Goff’s mesh doors', items: ['Mesh lets fresh air in and keeps bugs and pests out', 'Swap solid and mesh panels by season', 'Close it up when the weather turns'] },
  };
  return {
    title: 'Every minute the opening sits open',
    without: { title: 'A slow door, or no door', items: ['The opening sits wide open between trips', 'Heated or cooled air escapes and temperature zones blur', 'Drivers wait on the door, or prop it open'] },
    with: { title: 'A Goff’s high-performance door', items: ['Opens fast and closes right behind traffic', 'The auto-close timer keeps the opening shut between trips', 'A full-width window shows drivers what’s coming'] },
  };
}

function curtainCompare(ctx) {
  const g = ctx.a.curtain_goal;
  if (g === 'noise') return {
    title: 'Noise that travels',
    without: { title: 'Living with it', items: ['One loud machine sets the noise level for the whole floor', 'People across the plant hear it all shift', 'A permanent sound wall is slow and expensive to build'] },
    with: { title: 'A Goff’s Sound Curtain Wall', items: ['A viscoelastic acoustic dampener blocks the noise', 'Enclose the source, not the whole building', 'Strip doors keep traffic moving through it'] },
  };
  if (g === 'temperature' || g === 'weather') return {
    title: 'Heating the whole building for one corner',
    without: { title: 'Living with it', items: ['You heat or cool the whole building to keep one area comfortable', 'Hot and cold spots, and complaints from the people in them', 'A permanent wall means permits, construction and a layout you can’t change'] },
    with: { title: g === 'weather' ? 'A Goff’s Outdoor Curtain Wall' : 'A Goff’s Climate Curtain Wall', items: [g === 'weather' ? 'A heavy-duty curtain encloses the area against wind and weather' : 'A 3M Thinsulate lining cuts temperature loss', 'Zone off only the space that needs it', 'Made in the USA, with track and hardware included'] },
  };
  return {
    title: 'When dust and spray won’t stay put',
    without: { title: 'Living with it', items: ['Dust and overspray drift onto finished product and clean areas', 'Extra cleaning, rework and failed inspections', 'Permanent walls take weeks of construction'] },
    with: { title: 'A Goff’s curtain wall', items: ['Confines dust, dirt and contaminants to where they’re made', 'Filter panels, floor sweeps and strip doors seal the gaps', 'Track and hardware ship with the curtain'] },
  };
}

function dockCompare(ctx) {
  const i = ctx.a.dock_issues || [];
  if (ctx.a.dock_drive === 'allover' || has(i, 'impacts')) return {
    title: 'When trailers come in crooked',
    without: { title: 'A rigid shelter', items: ['The frame takes the hit and bends', 'Torn pads and a shelter that no longer seals', 'Eventually, replacing the whole unit'] },
    with: { title: 'Goff’s Flexible Frame Truck Shelter', items: ['The frame pulls back on impact', 'Yellow guide stripes help drivers center the trailer', 'Bottom boots repair a damaged seal without full replacement'] },
  };
  return {
    title: 'The gap around the trailer',
    without: { title: 'An unsealed dock', items: ['Conditioned air escapes around the top and sides of the trailer', 'Rain, snow and sun get in, and the dock floor gets slick', 'Pests walk right in'] },
    with: { title: 'A Goff’s seal or shelter', items: ['Seals the top and sides of the trailer', 'Reduces heating and cooling costs', 'Keeps out rain, snow, sun and pests'] },
  };
}

// ---------------------------------------------------------------------------
// Slides. `next` may be a slide id or a function of the answers.
// Sections drive the progress chips: intro | needs | solution | next.

export const SECTIONS = [
  { id: 'needs', label: 'Your needs' },
  { id: 'solution', label: 'Your solution' },
  { id: 'next', label: 'Next steps' },
];

export const GROUPS = [
  { id: 'intro', label: 'Intro' },
  { id: 'doors', label: 'Branch: Doors' },
  { id: 'curtain', label: 'Branch: Curtain walls' },
  { id: 'dock', label: 'Branch: Dock' },
  { id: 'close', label: 'Close' },
];

export const SLIDES = [
  {
    id: 'welcome', type: 'title', section: 'intro', group: 'intro', label: 'Welcome', next: 'about',
    notes: 'Get them talking about their facility before you show any product. Confirm who’s on the call and how much time you have.<br><br><b>Goal:</b> leave with a clear need, a recommended product and a booked next step.',
  },
  {
    id: 'about', type: 'about', section: 'intro', group: 'intro', label: 'About Goff’s', next: 'need',
    eyebrow: 'Who we are', title: 'Built in Wisconsin. Built for your openings.',
    stats: [['Since 1987', 'Designed and manufactured in the USA'], ['67,000 sq ft', 'Manufacturing facility in Pewaukee, WI'], ['4 weeks or less', 'To ship most orders'], ['The original', 'Industrial curtain wall']],
    families: [
      { icon: 'door', title: 'High-performance doors', text: 'Cyclone, G2, bug-screen and washdown doors' },
      { icon: 'curtain', title: 'Curtain walls', text: 'Divide space by temperature, noise, dust or weather' },
      { icon: 'truck', title: 'Dock seals and shelters', text: 'Seal the trailer, stop drafts and pests' },
      { icon: 'shield', title: 'Dock equipment and safety', text: 'Levelers, trailer restraints, fall protection' },
    ],
    notes: 'Keep this to 30 seconds. Lead with <b>custom-built</b> and <b>fast lead times</b>: “Everything you’ll see is built to your opening sizes, here in Wisconsin.”',
  },
  {
    id: 'need', type: 'choice', section: 'needs', group: 'intro', label: 'Main challenge', key: 'need', cols: 3, required: true,
    eyebrow: 'Let’s start with your facility', title: 'What’s the biggest problem you’re trying to solve?',
    options: [
      { value: 'doors', icon: 'door', label: 'An opening between areas', sub: 'Forklift and foot traffic letting heat, cold, dust or pests through' },
      { value: 'curtain', icon: 'curtain', label: 'A space that needs dividing', sub: 'Contain temperature, noise, dust, overspray or weather' },
      { value: 'dock', icon: 'truck', label: 'The loading dock', sub: 'Gaps around trailers, drafts, weather and pests getting in' },
    ],
    next: (a) => ({ doors: 'd_env', curtain: 'c_goal', dock: 'k_trailers' })[a.need],
    notes: 'Ask it open-ended first: <i>“Walk me through what’s going on out there.”</i> Then pick the card that matches.<br><br>If they name more than one, start with the one that costs them the most today. You can loop back with <b>Jump to</b>.',
  },

  // ----- Doors branch
  {
    id: 'd_env', type: 'choice', section: 'needs', group: 'doors', label: 'Doors: location', key: 'door_env', cols: 4, next: 'd_traffic',
    eyebrow: 'About the opening', title: 'Where is the opening?',
    options: [
      { value: 'interior', icon: 'layers', label: 'Inside the building', sub: 'Between departments or temperature zones' },
      { value: 'exterior', icon: 'home', label: 'To the outside or a dock', sub: 'Exposed to wind and weather' },
      { value: 'washdown', icon: 'droplet', label: 'Washdown or food area', sub: 'Wet, sanitary environment' },
      { value: 'harsh', icon: 'alert', label: 'Harsh or corrosive area', sub: 'Chemicals, heavy wear, tough conditions' },
    ],
    notes: 'Interior vs. exterior drives wind load and the model. Washdown and harsh areas go to the specialty doors (<b>Clean Guard</b>, <b>Harsh Guard</b>).',
  },
  {
    id: 'd_traffic', type: 'choice', section: 'needs', group: 'doors', label: 'Doors: traffic', key: 'door_traffic', cols: 3, next: 'd_size',
    eyebrow: 'About the opening', title: 'How often does it open?',
    options: [
      { value: 'low', icon: 'clock', label: 'A few times an hour', sub: 'Occasional pass-throughs' },
      { value: 'medium', icon: 'activity', label: 'Steady, every shift', sub: 'Regular forklift and foot traffic' },
      { value: 'high', icon: 'trend', label: 'Constantly', sub: 'Dozens of cycles an hour, and traffic stacks up' },
    ],
    notes: 'Get a number if you can: cycles per hour or per shift. Most G2 models run up to <b>120 cycles/hr</b>; the G2 1800 is rated for up to <b>24</b>.',
  },
  {
    id: 'd_size', type: 'choice', section: 'needs', group: 'doors', label: 'Doors: size', key: 'door_size', cols: 4, next: 'd_issues',
    eyebrow: 'About the opening', title: 'How big is the opening?', sub: 'Width × height. A close guess is fine for now.',
    options: [
      { value: 's8', icon: 'maximize', label: 'Up to 8′ × 8′', sub: 'Pedestrian and pallet-jack openings' },
      { value: 's12', icon: 'maximize', label: 'Up to 12′ × 12′', sub: 'Typical forklift openings' },
      { value: 's16', icon: 'maximize', label: 'Up to 16′ × 16′', sub: 'Large equipment and trucks' },
      { value: 'big', icon: 'info', label: 'Bigger, or not sure', sub: 'We’ll measure on the site survey' },
    ],
    notes: 'If they’re unsure, note it for the survey. Cyclone covers openings up to <b>12′ × 12′</b>; the G2 line goes up to <b>16′ × 16′</b>.',
  },
  {
    id: 'd_issues', type: 'choice', multi: true, section: 'needs', group: 'doors', label: 'Doors: problems', key: 'door_issues', cols: 3, next: 'd_compare',
    eyebrow: 'What it’s costing you', title: 'What’s going wrong with the opening today?', sub: 'Choose all that apply.',
    options: [
      { value: 'impacts', icon: 'forklift', label: 'Forklift hits and repairs' },
      { value: 'energy', icon: 'thermometer', label: 'Heat or A/C escaping' },
      { value: 'dust', icon: 'cloud', label: 'Dust and contaminants' },
      { value: 'bugs', icon: 'bug', label: 'Bugs and pests in summer' },
      { value: 'slow', icon: 'clock', label: 'A slow door holding up traffic' },
      { value: 'safety', icon: 'eye', label: 'Visibility and safety' },
    ],
    notes: 'This is the money question. For each one they pick, ask what it costs: repair bills, downtime, energy, product loss. <b>Write the numbers down.</b> They go in the follow-up.',
  },
  {
    id: 'd_compare', type: 'compare', section: 'needs', group: 'doors', label: 'Doors: picture this', next: 'd_rec',
    eyebrow: 'Picture this', compare: doorCompare,
    notes: 'Ask: <i>“When was the last time this happened? How long was it down?”</i> Let them tell the story. It sells the solution better than we can.',
  },
  {
    id: 'd_rec', type: 'recommend', section: 'solution', group: 'doors', label: 'Doors: recommendation', next: 'd_tour',
    notes: (ctx) => `Lead with the <b>why</b>. Each line ties back to something they told you. Don’t read the spec list; let them ask.${ctx.rec && ctx.rec.id === 'cyclone' ? '<br><br>If they hesitate, offer the <b>45-day real-world Cyclone trial</b>.' : ''}`,
  },
  {
    id: 'd_tour', type: 'hotspots', section: 'solution', group: 'doors', label: 'Doors: closer look', next: 'd_gallery', image: DIAGRAMS.doors,
    eyebrow: 'Take a closer look', title: (ctx) => ctx.rec && ctx.rec.id === 'cyclone' ? 'Inside the Cyclone' : 'Inside a Goff’s high-performance door',
    spots: doorSpots,
    notes: 'Tap each numbered point as you talk; their screen follows. Spend the most time on the features tied to the problems they picked.',
  },
  {
    id: 'd_gallery', type: 'gallery', section: 'solution', group: 'doors', label: 'Doors: photos', next: 'order',
    eyebrow: 'In the field', title: 'Goff’s doors at work',
    photos: [PHOTOS.cyclone, PHOTOS.cycloneInstall, PHOTOS.cycloneSpiral, PHOTOS.g2, PHOTOS.g2a, PHOTOS.bugDoor],
    notes: 'Use photos to anchor scale: <i>“That’s about a 12-foot opening, about like your shipping aisle.”</i>',
  },

  // ----- Curtain wall branch
  {
    id: 'c_goal', type: 'choice', section: 'needs', group: 'curtain', label: 'Curtains: goal', key: 'curtain_goal', cols: 3, next: 'c_config',
    eyebrow: 'About the space', title: 'What do you need to keep in, or keep out?',
    options: [
      { value: 'temperature', icon: 'thermometer', label: 'Heat or cold', sub: 'Separate temperature zones' },
      { value: 'noise', icon: 'volume', label: 'Noise', sub: 'Contain loud equipment' },
      { value: 'dust', icon: 'cloud', label: 'Dust and overspray', sub: 'Grinding, sanding, painting' },
      { value: 'washdown', icon: 'droplet', label: 'Washdown spray', sub: 'Wet, sanitary areas' },
      { value: 'welding', icon: 'zap', label: 'Welding flash and sparks', sub: 'UV, fumes and spatter' },
      { value: 'weather', icon: 'wind', label: 'Wind and weather', sub: 'Enclose an outdoor area' },
    ],
    notes: 'This picks the curtain material. If they say “all of the above,” ask which one shows up in a complaint, a failed audit or a utility bill.',
  },
  {
    id: 'c_config', type: 'choice', section: 'needs', group: 'curtain', label: 'Curtains: layout', key: 'curtain_config', cols: 4, next: 'c_access',
    eyebrow: 'About the space', title: 'What shape is the space you’re closing off?',
    options: [
      { value: 'single', icon: 'cfg1', label: 'A single wall', sub: 'Divide the building in two' },
      { value: 'l', icon: 'cfg2', label: 'An L-shaped corner', sub: 'Two sides, using two existing walls' },
      { value: 'three', icon: 'cfg3', label: 'Three sides', sub: 'Against one existing wall' },
      { value: 'four', icon: 'cfg4', label: 'A free-standing room', sub: 'Four sides, anywhere on the floor' },
    ],
    notes: 'Have them describe the footprint. Get rough lengths of each side and the height to the deck. You’ll need them for the quote.',
  },
  {
    id: 'c_access', type: 'choice', section: 'needs', group: 'curtain', label: 'Curtains: access', key: 'curtain_access', cols: 4, next: 'c_mount',
    eyebrow: 'About the space', title: 'How do people and equipment get through?',
    options: [
      { value: 'forklifts', icon: 'forklift', label: 'Forklifts drive through', sub: 'Regular vehicle traffic' },
      { value: 'people', icon: 'users', label: 'People walk through', sub: 'Foot traffic only' },
      { value: 'slides', icon: 'move', label: 'It opens when needed', sub: 'Slide it back for big moves' },
      { value: 'fixed', icon: 'lock', label: 'It stays closed', sub: 'A fixed partition' },
    ],
    notes: 'If forklifts cross the curtain line many times a shift, mention that a <b>high-speed door</b> can go in the curtain wall. That’s a second line item.',
  },
  {
    id: 'c_mount', type: 'choice', section: 'needs', group: 'curtain', label: 'Curtains: mounting', key: 'curtain_mount', cols: 4, next: 'c_compare',
    eyebrow: 'About the space', title: 'What will it hang from?', sub: 'There are 25+ track mounting options. This narrows it down.',
    options: [
      { value: 'ceiling', icon: 'home', label: 'The ceiling or deck', sub: 'Threaded rod or ceiling mount' },
      { value: 'beam', icon: 'beam', label: 'Steel I-beams', sub: 'Beam flange clamps' },
      { value: 'wall', icon: 'wall', label: 'A wall', sub: 'Wall and end mounts' },
      { value: 'floor', icon: 'floor', label: 'Nothing overhead', sub: 'Free-standing floor mount' },
    ],
    notes: 'Ask about obstructions along the track line: sprinkler pipe, conduit, lights, HVAC. Those decide the mount.',
  },
  {
    id: 'c_compare', type: 'compare', section: 'needs', group: 'curtain', label: 'Curtains: picture this', next: 'c_rec',
    eyebrow: 'Picture this', compare: curtainCompare,
    notes: 'Ask what they’ve tried already: fans, plastic sheeting, a contractor quote for a permanent wall. Anchor on the cost and time of the permanent wall.',
  },
  {
    id: 'c_rec', type: 'recommend', section: 'solution', group: 'curtain', label: 'Curtains: recommendation', next: 'c_tour',
    notes: 'Lead with the <b>why</b>. Confirm the layout and access before you get into options; that’s where the quote moves.',
  },
  {
    id: 'c_tour', type: 'hotspots', section: 'solution', group: 'curtain', label: 'Curtains: closer look', next: 'c_gallery', image: DIAGRAMS.curtain,
    eyebrow: 'Take a closer look', title: 'How a Goff’s curtain wall goes together',
    spots: curtainSpots,
    notes: 'Point out that track and hardware ship with the curtain. Spend time on the options that fit their access answer: strip doors, floor sweep, filter panels.',
  },
  {
    id: 'c_gallery', type: 'gallery', section: 'solution', group: 'curtain', label: 'Curtains: photos', next: 'order',
    eyebrow: 'In the field', title: 'Goff’s curtain walls at work',
    photos: [PHOTOS.cwYellow, PHOTOS.cwClimate, PHOTOS.cwAero, PHOTOS.cw1, PHOTOS.cw2, PHOTOS.cw3],
    notes: 'Find the photo closest to their layout and ask: <i>“Is your space more like this one?”</i>',
  },

  // ----- Dock branch
  {
    id: 'k_trailers', type: 'choice', section: 'needs', group: 'dock', label: 'Dock: trailers', key: 'dock_trailers', cols: 3, next: 'k_priority',
    eyebrow: 'About your docks', title: 'What backs into your docks?',
    options: [
      { value: 'same', icon: 'truck', label: 'Mostly standard 53′ trailers', sub: 'Consistent heights and widths' },
      { value: 'mixed', icon: 'layers', label: 'A mix of trailers and trucks', sub: 'Different heights and sizes' },
      { value: 'reefer', icon: 'thermometer', label: 'Refrigerated trailers', sub: 'Cold chain, so temperature matters' },
    ],
    notes: 'Consistent trailers usually mean a <b>dock seal</b> (tightest fit). A mixed fleet usually needs a <b>shelter</b>.',
  },
  {
    id: 'k_priority', type: 'choice', section: 'needs', group: 'dock', label: 'Dock: priority', key: 'dock_priority', cols: 4, next: 'k_drive',
    eyebrow: 'About your docks', title: 'What matters most at the dock?',
    options: [
      { value: 'seal', icon: 'shield', label: 'The tightest seal', sub: 'Stop every draft' },
      { value: 'access', icon: 'maximize', label: 'Full access to the trailer', sub: 'Forklifts in and out' },
      { value: 'cost', icon: 'dollar', label: 'Lowest cost', sub: 'Close the gaps on a budget' },
      { value: 'durability', icon: 'tool', label: 'Durability', sub: 'Trailers keep hitting it' },
    ],
    notes: 'Seals compress against the trailer for the tightest seal. Shelters leave the full width of the trailer open for the forklift.',
  },
  {
    id: 'k_drive', type: 'choice', section: 'needs', group: 'dock', label: 'Dock: drivers', key: 'dock_drive', cols: 2, next: 'k_issues',
    eyebrow: 'About your docks', title: 'How well do drivers line up?',
    options: [
      { value: 'centered', icon: 'target', label: 'Pretty consistently', sub: 'Most trailers come in straight and centered' },
      { value: 'allover', icon: 'alert', label: 'All over the place', sub: 'Off-center backs and hard hits' },
    ],
    notes: 'Hard, off-center hits are what tear up shelter frames. If that’s their story, the <b>Flexible Frame</b> shelter is the answer.',
  },
  {
    id: 'k_issues', type: 'choice', multi: true, section: 'needs', group: 'dock', label: 'Dock: problems', key: 'dock_issues', cols: 4, next: 'k_compare',
    eyebrow: 'What it’s costing you', title: 'What’s happening at the dock today?', sub: 'Choose all that apply.',
    options: [
      { value: 'drafts', icon: 'thermometer', label: 'Drafts and energy loss' },
      { value: 'weather', icon: 'rain', label: 'Rain and snow getting in' },
      { value: 'pests', icon: 'bug', label: 'Pests getting in' },
      { value: 'damaged', icon: 'tool', label: 'Torn or worn-out seals' },
      { value: 'gaps', icon: 'maximize', label: 'Gaps around the dock' },
      { value: 'impacts', icon: 'alert', label: 'Shelter frames getting hit' },
      { value: 'fall', icon: 'shield', label: 'Fall risk at open doors' },
      { value: 'creep', icon: 'truck', label: 'Trailers creeping away' },
    ],
    notes: 'Each one maps to an add-on: <b>bottom boots</b> for worn seals, <b>Dock Blocker</b> for gaps, <b>Fall Guard</b> for open doors, <b>PRH restraints</b> for trailer creep.',
  },
  {
    id: 'k_compare', type: 'compare', section: 'needs', group: 'dock', label: 'Dock: picture this', next: 'k_rec',
    eyebrow: 'Picture this', compare: dockCompare,
    notes: 'Ask how many dock doors have the problem, and what they spend each year replacing seals and pads.',
  },
  {
    id: 'k_rec', type: 'recommend', section: 'solution', group: 'dock', label: 'Dock: recommendation', next: 'k_tour',
    notes: 'Lead with the <b>why</b>, then walk the add-ons. Each one ties to a problem they checked.',
  },
  {
    id: 'k_tour', type: 'hotspots', section: 'solution', group: 'dock', label: 'Dock: closer look', next: 'k_gallery', image: DIAGRAMS.dock,
    eyebrow: 'Take a closer look', title: 'A Goff’s dock, piece by piece',
    spots: dockSpots,
    notes: 'Start with the seal or shelter, then the add-ons below the trailer. Restraints and chocks are an easy safety upsell.',
  },
  {
    id: 'k_gallery', type: 'gallery', section: 'solution', group: 'dock', label: 'Dock: photos', next: 'order',
    eyebrow: 'In the field', title: 'Goff’s dock products at work',
    photos: [PHOTOS.shelter, PHOTOS.seals, PHOTOS.dock],
    notes: 'Use the install photo to talk through lead time and installation.',
  },

  // ----- Close
  {
    id: 'order', type: 'form', section: 'next', group: 'close', label: 'Scope', next: 'qualify',
    eyebrow: 'Let’s scope it', title: 'Quantity, location and timing',
    fields: [
      { key: 'qty', label: 'How many openings?', kind: 'stepper', min: 1, max: 99 },
      { key: 'location', label: 'Where will they go?', kind: 'text', placeholder: 'e.g., Dock doors 4–9, Building 2' },
      { key: 'sizes', label: 'Opening sizes (W × H)', kind: 'text', placeholder: 'e.g., 10′ × 12′' },
      { key: 'need_by', label: 'When do you need them?', kind: 'chips', options: [['asap', 'ASAP'], ['d30', 'Within 30 days'], ['d90', '60–90 days'], ['later', 'Later this year'], ['budget', 'Just budgeting']] },
      { key: 'install', label: 'Who’s installing?', kind: 'chips', options: [['distributor', 'A Goff’s distributor'], ['inhouse', 'Our maintenance team'], ['unsure', 'Need a recommendation']] },
      { key: 'survey', label: 'Site survey?', kind: 'chips', options: [['yes', 'Yes, let’s schedule one'], ['no', 'Not needed']] },
    ],
    notes: 'Confirm quantity, where they go and when. Every “not sure” becomes a site-survey item. Quotes are built from opening sizes, so get W × H for each.',
  },
  {
    id: 'qualify', type: 'form', section: 'next', group: 'close', label: 'Qualify', next: 'summary',
    eyebrow: 'A few last questions', title: 'Help us get this to the right people',
    fields: [
      { key: 'role', label: 'Your role', kind: 'chips', wide: true, options: [['facility', 'Facility / plant manager'], ['maint', 'Maintenance'], ['ops', 'Operations / EHS'], ['purch', 'Purchasing'], ['exec', 'Owner / executive']] },
      { key: 'timeline', label: 'Decision timeline', kind: 'chips', options: [['month', 'This month'], ['quarter', 'This quarter'], ['half', 'Next 6 months'], ['year', 'Next year']] },
      { key: 'approval', label: 'Who signs off?', kind: 'chips', options: [['me', 'I can approve it'], ['manager', 'My manager'], ['capex', 'Capex review'], ['unsure', 'Not sure yet']] },
      { key: 'budget', label: 'Is it budgeted?', kind: 'chips', options: [['yes', 'Yes'], ['working', 'Working on it'], ['no', 'Not yet']] },
      { key: 'followup', label: 'When should we follow up?', kind: 'chips', options: [['tomorrow', 'Tomorrow'], ['week', 'Later this week'], ['nextweek', 'Next week'], ['twoweeks', 'In two weeks'], ['month', 'Next month']] },
    ],
    notes: 'Ask these straight. If it isn’t budgeted, offer a <b>budgetary quote</b> they can take to their capex review. Book the follow-up before you hang up.',
  },
  {
    id: 'summary', type: 'summary', section: 'next', group: 'close', label: 'Summary', next: null,
    notes: 'Read back what you heard and confirm the next step. Then use <b>Copy</b> or <b>Download</b> under Lead summary to log it in the CRM.',
  },
];

export const SLIDE_MAP = Object.fromEntries(SLIDES.map((s) => [s.id, s]));
export const START = 'welcome';

export function resolveNext(slide, ctx) {
  if (!slide || !slide.next) return null;
  return typeof slide.next === 'function' ? slide.next(ctx.a) || null : slide.next;
}

// ---------------------------------------------------------------------------
// Labels and the lead summary

const SHORT = {
  need: 'Main challenge',
  door_env: 'Location', door_traffic: 'Traffic', door_size: 'Opening size', door_issues: 'Problems today',
  curtain_goal: 'Keep in / out', curtain_config: 'Layout', curtain_access: 'Access', curtain_mount: 'Hangs from',
  dock_trailers: 'Trailers', dock_priority: 'Priority', dock_drive: 'Driver alignment', dock_issues: 'Problems today',
  qty: 'Quantity', location: 'Install location', sizes: 'Opening sizes', need_by: 'Needed by', install: 'Installer', survey: 'Site survey',
  role: 'Role', timeline: 'Timeline', approval: 'Sign-off', budget: 'Budgeted', followup: 'Follow up',
};
const LABELS = {};
for (const s of SLIDES) {
  if (s.type === 'choice') LABELS[s.key] = { q: SHORT[s.key] || s.key, opts: Object.fromEntries(s.options.map((o) => [o.value, o.label])) };
  if (s.type === 'form') for (const f of s.fields) LABELS[f.key] = { q: SHORT[f.key] || f.label, opts: f.options ? Object.fromEntries(f.options) : null };
}

export function labelFor(key, value) {
  const L = LABELS[key];
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)) return '';
  if (Array.isArray(value)) return value.map((v) => (L && L.opts && L.opts[v]) || v).join(', ');
  return String((L && L.opts && L.opts[value]) || value);
}
export const questionFor = (key) => (LABELS[key] && LABELS[key].q) || key;

export const BRANCH_KEYS = {
  doors: ['door_env', 'door_traffic', 'door_size', 'door_issues'],
  curtain: ['curtain_goal', 'curtain_config', 'curtain_access', 'curtain_mount'],
  dock: ['dock_trailers', 'dock_priority', 'dock_drive', 'dock_issues'],
};
export const SCOPE_KEYS = ['qty', 'location', 'sizes', 'need_by', 'install', 'survey'];
export const QUALIFY_KEYS = ['role', 'timeline', 'approval', 'budget', 'followup'];

// Rows for the presenter's "Captured" panel and the lead export.
export function leadRows(state) {
  const a = state.answers || {};
  const ctx = ctxFor(state);
  const rows = [];
  const push = (group, key, label, value) => rows.push({ group, key, label, value });
  push('Session', 'company', 'Customer', (state.meta && state.meta.company) || '');
  push('Session', 'rep', 'Rep', (state.meta && state.meta.rep) || '');
  push('Needs', 'need', 'Main challenge', labelFor('need', a.need));
  for (const k of BRANCH_KEYS[a.need] || []) push('Needs', k, questionFor(k), labelFor(k, a[k]));
  push('Recommendation', 'product', 'Recommended', ctx.p ? ctx.p.name : '');
  push('Recommendation', 'addons', 'Also consider', ctx.rec ? ctx.rec.addons.join(', ') : '');
  for (const k of SCOPE_KEYS) push('Scope', k, questionFor(k), k === 'qty' ? String(a.qty || '') : labelFor(k, a[k]));
  for (const k of QUALIFY_KEYS) push('Qualification', k, questionFor(k), labelFor(k, a[k]));
  return rows;
}

export function leadText(state) {
  const rows = leadRows(state);
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const out = [`Goff's Live Tour: lead summary (${date})`];
  let g = '';
  for (const r of rows) {
    if (r.group !== g) { g = r.group; out.push('', g.toUpperCase()); }
    out.push(`${r.label}: ${r.value || '-'}`);
  }
  return out.join('\n');
}

export function leadCsv(state) {
  const q = (s) => `"${String(s == null ? '' : s).replace(/"/g, '""')}"`;
  return ['Section,Field,Value', ...leadRows(state).map((r) => [r.group, r.label, r.value].map(q).join(','))].join('\r\n');
}
