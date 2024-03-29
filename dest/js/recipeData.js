app.recipeData = {
	ingredients: {
		M: {name: "Rainbow Matter", quality: 2, properties: []},
		R: {name: "Big Root",       quality: 1, properties: ["red",    "soft", "plant"]},
		B: {name: "Icy Rock",       quality: 1, properties: ["blue",   "hard", "mineral"]},
		Y: {name: "Honey",          quality: 1, properties: ["yellow", "soft", "sweet"]},
		G: {name: "Balm Mushroom",  quality: 1, properties: ["gray",   "soft", "mushroom"]},
		S: {name: "Mystical Shell", quality: 1, properties: ["mythical"]},
		r: {name: "Tiny Mushroom",  quality: 0, properties: ["red",    "soft", "mushroom"]},
		b: {name: "Bluk Berry",     quality: 0, properties: ["blue",   "soft", "sweet"]},
		y: {name: "Apricorn",       quality: 0, properties: ["yellow", "hard", "plant"]},
		g: {name: "Fossil",         quality: 0, properties: ["gray",   "hard", "mineral"]},
	},
	dishes: [
		{name: "Red",      properties: {red: 4}},
		{name: "Blue",     properties: {blue: 4}},
		{name: "Yellow",   properties: {yellow: 4}},
		{name: "Gray",     properties: {gray: 4}},
		{name: "Water",    properties: {blue: 3, soft: 4}},
		{name: "Normal",   properties: {gray: 2, sweet: 3}},
		{name: "Poison",   properties: {soft: 3, mushroom: 4}},
		{name: "Ground",   properties: {soft: 3, mineral: 2}},
		{name: "Grass",    properties: {soft: 2, plant: 4}},
		{name: "Bug",      properties: {yellow: 3, sweet: 4}},
		{name: "Psychic",  properties: {hard: 2, sweet: 3}},
		{name: "Rock",     properties: {hard: 4, mineral: 2}},
		{name: "Flying",   properties: {mineral: 3, plant: 2}},
		{name: "Fire",     properties: {red: 2, mushroom: 3}},
		{name: "Electric", properties: {yellow: 3, soft: 4}},
		{name: "Fighting", properties: {sweet: 3, mushroom: 2}},
		{name: "Ambrosia", properties: {mythical: 1}},
		{name: "Mulligan", properties: {}},
	],
	qualityDescriptors: {
		basic:          "Basic",
		good:           "Good",
		good_nrec:      "Good",
		very_good:      "Very Good",
		very_good_nrec: "Very Good",
		special:        "Special",
		special_nrec:   "Special",
	},
};

app.recipeTable = {
	Red: {
		basic: ['rrrr{bryg}'],
		good: ['Rrrr{bryg}', '{BRYGS}rrrr'],
		good_nrec: ['RRrr{bryg}', 'R{BRYGS}rrr', 'Mrrrr'],
		very_good: ['RRRr{bryg}', 'RR{BRYGS}rr', 'RMrrr'],
		very_good_nrec: ['RRRR{bryg}', 'RRR{BRYGS}r', 'RRMrr'],
		special: ['RRRR{BRYGS}', 'RRRMr'],
		special_nrec: ['RRRRM'],
	},
	Blue: {
		basic: ['bbbb{bryg}'],
		good: ['Bbbb{bryg}', '{BRYGS}bbbb'],
		good_nrec: ['BBbb{bryg}', 'B{BRYGS}bbb', 'Mbbbb'],
		very_good: ['BBBb{bryg}', 'BB{BRYGS}bb', 'BMbbb'],
		very_good_nrec: ['BBBB{bryg}', 'BBB{BRYGS}b', 'BBMbb'],
		special: ['BBBB{BRYGS}', 'BBBMb'],
		special_nrec: ['BBBBM'],
	},
	Yellow: {
		basic: ['yyyy{bryg}'],
		good: ['Yyyy{bryg}', '{BRYGS}yyyy'],
		good_nrec: ['YYyy{bryg}', 'Y{BRYGS}yyy', 'Myyyy'],
		very_good: ['YYYy{bryg}', 'YY{BRYGS}yy', 'YMyyy'],
		very_good_nrec: ['YYYY{bryg}', 'YYY{BRYGS}y', 'YYMyy'],
		special: ['YYYY{BRYGS}', 'YYYMy'],
		special_nrec: ['YYYYM'],
	},
	Gray: {
		basic: ['gggg{bryg}'],
		good: ['Gggg{bryg}', '{BRYGS}gggg'],
		good_nrec: ['GGgg{bryg}', 'G{BRYGS}ggg', 'Mgggg'],
		very_good: ['GGGg{bryg}', 'GG{BRYGS}gg', 'GMggg'],
		very_good_nrec: ['GGGG{bryg}', 'GGG{BRYGS}g', 'GGMgg'],
		special: ['GGGG{BRYGS}', 'GGGMg'],
		special_nrec: ['GGGGM'],
	},
	Water: {
		basic: ['bbbr{ryg}'],
		good: ['Bbbrr', '{RYG}bbb{ryg}', 'Sbbbr'],
		good_nrec: ['B{RYG}bbr', 'Mbbbr', '{RYGS}{RYG}bbb'],
		very_good: ['B{RYG}{RYG}bb', 'M{RYG}bbb'],
		very_good_nrec: [],
		special: [],
		special_nrec: [],
	},
	Normal: {
		basic: ['bbbgg'],
		good: ['Ybbgg'],
		good_nrec: ['YYbgg', 'YGbbg'],
		very_good: ['YYYgg', 'YYGbg', 'YGGbb'],
		very_good_nrec: ['YYYGg', 'YYGGb'],
		special: ['YYYGG'],
		special_nrec: [],
	},
	Poison: {
		basic: [],
		good: ['Grrr{byg}'],
		good_nrec: ['GGrr{bryg}', 'G{BYGS}rrr'],
		very_good: ['GGGr{bry}', 'GG{BRYGS}rr', 'GMrrr'],
		very_good_nrec: ['GGG{BRYS}r', 'GGMrr'],
		special: ['GGGMr'],
		special_nrec: [],
	},
	Ground: {
		basic: ['rgg{br}{br}'],
		good: ['Bgr{br}{br}', 'Yggr{br}', '{RG}gg{br}{br}'],
		good_nrec: ['BBrr{br}', 'B{RYG}g{br}{br}', 'R{RYG}gg{br}', '{RG}{RY}gg{br}', 'Y{RY}ggr'],
		very_good: ['BB{RYG}r{br}', 'B{RYG}{RYG}g{br}', '{RG}{RY}{RY}gg'],
		very_good_nrec: ['BB{RYG}{RYG}{br}', 'B{RYG}{RYG}{RY}g'],
		special: ['BB{RYG}{RYG}{RYG}'],
		special_nrec: [],
	},
	Grass: {
		basic: [],
		good: ['Ryyy{br}'],
		good_nrec: ['RRyy{bryg}', 'R{RG}yyy'],
		very_good: ['RRRy{byg}', 'RR{BRYGS}yy'],
		very_good_nrec: ['RRR{BYGS}y', 'RRMyy'],
		special: ['RRRMy'],
		special_nrec: [],
	},
	Bug: {
		basic: [],
		good: ['YYbby'],
		good_nrec: [],
		very_good: ['YYYb{brg}'],
		very_good_nrec: ['YYY{BRGS}b'],
		special: ['YYYMb'],
		special_nrec: [],
	},
	Psychic: {
		basic: ['bbby{yg}'],
		good: ['Ybby{yg}'],
		good_nrec: ['BYbby', 'YYbyg'],
		very_good: ['BYYby'],
		very_good_nrec: [],
		special: [],
		special_nrec: [],
	},
	Rock: {
		basic: ['gg{gy}y{bry}'],
		good: ['Bg{gy}{gy}{bry}', '{RYS}gg{gy}y', 'Gggyy'],
		good_nrec: ['BB{bryg}{yg}{yg}', 'B{BRYGS}yg{yg}', 'B{BRYS}ggg', 'B{RYS}g{yg}{yg}', 'Mygg{yg}'],
		very_good: ['BBB{ryg}{yg}', 'BB{BRYGS}{yg}{yg}', 'BMg{yg}{yg}'],
		very_good_nrec: ['BBB{RYGS}{yg}', 'BBM{yg}{yg}'],
		special: ['BBBM{yg}'],
		special_nrec: [],
	},
	Flying: {
		basic: [],
		good: ['RRggg'],
		good_nrec: [],
		very_good: ['BRRgg'],
		very_good_nrec: ['BBRRg'],
		special: ['BBBRR'],
		special_nrec: [],
	},
	Fire: {
		basic: ['rrr{byg}{by}'],
		good: ['Grr{byg}{by}', '{BYS}rrr{by}', '{YS}rrr{byg}'],
		good_nrec: ['G{BRYS}rr{by}', 'G{RYS}rr{byg}', 'Mrrr{byg}', '{BYS}{YS}rrr'],
		very_good: ['BG{RYS}rr', 'RG{BYS}rr', 'RGGr{byg}', 'GMrr{byg}', 'G{BRYS}{YS}rr', 'M{BYS}rrr'],
		very_good_nrec: ['RGG{BRYS}r', 'GM{BRYS}rr', 'MMrrr'],
		special: ['RRGGG', 'RGGMr', 'GMMrr'],
		special_nrec: [],
	},
	Electric: {
		basic: [],
		good: ['YYry{br}'],
		good_nrec: [],
		very_good: ['YYYr{rg}', 'YY{RG}y{br}'],
		very_good_nrec: ['RYYY{rg}', 'YYY{BRGS}r', 'YY{RG}{RG}y'],
		special: ['RYYY{BRGS}', 'YYYG{BRS}', 'YYYMr', 'YYY{BS}{RG}'],
		special_nrec: ['YYYM{RG}'],
	},
	Fighting: {
		basic: [],
		good: ['Ybbrr'],
		good_nrec: ['YYbrr', 'YGbbr'],
		very_good: ['YYGbr'],
		very_good_nrec: [],
		special: [],
		special_nrec: [],
	},
	Ambrosia: {
		basic: [],
		good: ['Sbryg', 'Sbb{ryg}{ryg}', 'Sbbb{yg}', 'Srr{byg}{byg}', 'Syy{brg}{br}', 'Syyy{brg}', 'Sgg{bry}{br}', 'Sggg{br}'],
		good_nrec: ['SByy{bry}', 'SB{bryg}{br}{yg}', 'SR{bryg}{bryg}{yg}', 'SYy{bryg}{brg}', 'SGy{bryg}{byg}', 'SGgg{bry}', 'SGg{bryg}{by}', 'SS{bryg}{bryg}{byg}', 'S{BRYGS}bb{ryg}', 'S{BRYGS}b{bryg}{yg}', 'S{BRY}b{bryg}{ryg}', 'S{BRYGS}r{byg}{byg}', 'S{BRYS}r{bryg}{byg}', 'S{BRGS}yyy', 'S{RGS}yy{bryg}', 'S{RYGS}yg{bryg}', 'S{RS}y{bryg}{bryg}', 'S{RYS}g{bryg}{bryg}', 'S{BRYGS}{br}{yg}{yg}'],
		very_good: [],
		very_good_nrec: ['SBB{RYGSryg}b', 'SBB{RYGSbr}{yg}', 'SBB{RYGS}{bryg}', 'SB{BRYGSbryg}{RYGS}{byg}', 'SB{BRYGSbryg}{RYS}{bryg}', 'SB{RYGSM}bb', 'SB{BRYGSM}b{ryg}', 'SB{BRYGSM}{br}{yg}', 'SB{RYGSM}{yg}{yg}', 'SRR{BYGSbyg}r', 'SRR{BYGSbrg}y', 'SRR{BYGS}{bryg}', 'SR{BRYGSbryg}{BYGS}y', 'SR{BRYGSbryg}{BRYGS}{bg}', 'SR{BRYGSbryg}{BYS}{bryg}', 'SR{BYSM}rr', 'SR{BYGSM}yy', 'SYY{BRGSbrg}y', 'SYY{BRGSbryg}{br}', 'SYY{BRGS}{bryg}', 'SY{BRYGSbryg}{BRGS}{by}', 'SY{BRYGSbryg}{BRS}{bryg}', 'SY{BRGSM}yy', 'SGG{BRYSby}g', 'SGG{BRYGSbyg}{by}', 'SG{BRYSbyg}{BRYS}r', 'SG{BRYGSbryg}{BRYS}{byg}', 'SG{BRYS}{BRYS}{bryg}', 'SG{BRYSM}r{byg}', 'SG{BRYSM}g{rg}', 'SG{BRYGSM}{byg}{by}', 'SS{BRYGSbryg}{BRYGS}{byg}', 'SS{BRYGSbryg}{BRYS}{bryg}', 'SS{BRYGSM}{bryg}{byg}', 'SM{BRYSbyg}rr', 'SM{BRYGSbryg}{bryg}{byg}', 'SM{BRYS}{bryg}{bryg}', 'S{BRYGSbryg}{BRYGS}{RS}b', 'S{BRYGSbryg}{BRYS}{BS}r', 'S{BRYGSbryg}{BRYGS}{RYS}g', 'S{BRYGSM}{RYGS}bb', 'S{BRYGSM}{BRYGS}b{yg}', 'S{BRYSM}{BYS}rr', 'S{BRYGSM}{BRYS}r{byg}', 'S{BRYGSM}{GS}yy', 'S{BRYGSM}{RYGS}yg', 'S{BRYGSM}{RY}y{brg}', 'S{BRYGSM}{RYS}{bryg}{bg}'],
		special: ['SBRYG', 'SBB{BRYG}{RYG}', 'SRR{BRYG}{BYG}', 'SYY{BRG}{BRG}', 'SYYYB', 'SGG{BRY}{BRY}', 'SGGG{BY}', 'SM{BRYGS}{BRYGS}{byg}', 'SM{BRYGS}{BRYS}{bryg}', 'SMM{bryg}{bryg}', 'SS{BRYGS}{BRYGS}{BRYGS}'],
		special_nrec: ['SMM{BRYGSMbryg}{BRYGSM}', 'SM{BRYGSM}{BRYGS}{BRYGS}'],
	},
	Mulligan: {
		basic: ['bb{ryg}{ryg}{yg}', 'rr{byg}{by}{yg}', 'rrb{by}{yg}', 'rr{yg}{yg}{yg}'],
		good: ['Byy{bry}{br}', 'Bg{br}{br}{yg}', 'Rbb{ryg}{ry}', 'Rby{bryg}{rg}', 'Rrr{byg}{by}', 'Ryy{brg}{br}', 'Ryg{bryg}{br}', 'Ybr{br}{yg}', 'Ybyy{rg}', 'Ybyg{ryg}', 'Yg{br}{yg}{yg}', 'Gbrg{by}', 'Gby{bryg}{yg}', 'Gry{byg}{byg}', 'Gyyy{brg}', '{RYG}bbrg', '{YG}bbr{yg}', '{BRG}bby{ryg}', '{RG}bbg{ry}', '{BRYG}bry{byg}', '{BRY}bry{bryg}', '{RY}brg{bry}', '{RG}byg{bryg}', '{BRY}rry{byg}', '{RY}rrg{by}', '{RY}ryy{brg}', '{RY}ry{bryg}{bg}', '{BG}yyy{br}', '{RG}yyg{bry}', '{RYG}yg{br}{yg}', '{RY}gg{br}{yg}'],
		good_nrec: ['BBr{br}{yg}', 'BRy{bryg}{br}', 'B{RY}br{ry}', 'B{BRY}rry', 'B{RY}rr{by}', 'B{RY}ry{bryg}', 'B{RG}yy{bry}', 'B{RYG}{br}{yg}{yg}', 'RRy{brg}{bg}', 'RYb{bryg}{ry}', 'RYrr{byg}', 'RYr{bryg}{by}', 'RYy{bryg}{brg}', 'RYg{bry}{br}', 'RGr{byg}{by}', 'R{RYG}bb{ryg}', 'R{RYG}br{bg}', 'R{RG}br{byg}', 'R{BRYG}by{brg}', 'R{BYG}by{bryg}', 'R{RYG}bg{bry}', 'R{BY}rr{by}', 'R{BRYG}ry{bg}', 'R{BY}ry{bryg}', 'R{RG}rg{by}', 'R{BYG}yy{br}', 'R{YG}yy{brg}', 'R{BRYG}yg{br}', 'R{YG}yg{bryg}', 'YYbr{bg}', 'YYbg{br}', 'YYyg{rg}', 'YGbr{yg}', 'YGbg{ry}', 'Y{RY}bb{rg}', 'Y{BRG}by{ryg}', 'Y{BR}rr{by}', 'Y{BRG}ry{by}', 'Y{BR}ry{bryg}', 'Y{RY}rg{bry}', 'Y{BRG}yy{br}', 'Y{RG}yy{brg}', 'Y{RG}y{bryg}{bg}', 'Y{RY}gg{yg}', 'GGbb{yg}', 'GGy{byg}{by}', 'GGg{by}{by}', 'G{RG}bbg', 'G{BRYG}by{byg}', 'G{BRY}by{bryg}', 'G{BRY}ry{byg}', 'G{RY}rg{by}', 'G{BG}yyy', 'G{RYG}yyg', 'G{RY}yy{brg}', 'G{RY}y{bryg}{bg}', 'Mbbr{ryg}', 'Mb{bryg}{bryg}{yg}', 'Mrr{byg}{byg}', 'Myyy{brg}', 'Myyg{bry}', 'M{bryg}{byg}{br}{yg}', '{BRYG}{BR}bry', '{RYG}{RY}brg', '{BRYG}{RG}by{bg}', '{BY}{RG}by{bryg}', '{BRYG}{RY}ryg', '{RYG}{RY}ygg'],
		very_good: ['BBBrr', 'BB{RYG}{br}{yg}', 'BR{RYG}b{ry}', 'BR{RG}r{by}', 'BR{BRYG}y{br}', 'BR{YG}y{bryg}', 'BR{YG}g{yg}', 'BYYy{rg}', 'BY{RG}b{ry}', 'BY{RY}r{bry}', 'BY{RG}y{bryg}', 'BY{RYG}g{yg}', 'BG{RY}b{ry}', 'BG{RY}r{by}', 'BG{RYG}y{yg}', 'BG{RY}y{bryg}', 'BG{RY}g{yg}', 'BMyy{bry}', 'BM{bryg}{br}{yg}', 'B{RYG}{RY}br', 'B{BRYG}{RG}by', 'B{BRYG}{RY}ry', 'B{RYG}{RYG}yg', 'RR{BYG}b{ry}', 'RR{YG}b{bryg}', 'RR{BYG}r{by}', 'RR{YG}r{byg}', 'RR{BYG}y{brg}', 'RR{YG}g{bry}', 'RYY{brg}{br}', 'RYG{bryg}{by}', 'RY{BRYG}br', 'RY{RG}b{bryg}', 'RY{BY}rr', 'RY{RG}r{byg}', 'RY{BRG}y{br}', 'RY{BG}y{bryg}', 'RY{RYG}g{bry}', 'RGG{byg}{by}', 'RG{RY}b{bryg}', 'RG{BRY}r{by}', 'RG{RY}r{byg}', 'RG{BYG}yy', 'RG{BRYG}y{bg}', 'RG{BY}y{bryg}', 'RG{RY}g{bry}', 'RM{bryg}{bryg}{yg}', 'R{BRYG}{BG}by', 'R{RYG}{RYG}b{bg}', 'R{BRYG}{YG}yg', 'YYGg{ry}', 'YY{RG}bb', 'YY{RG}rg', 'YY{BR}r{br}', 'YY{BRG}yg', 'YGGb{yg}', 'YG{RY}bb', 'YG{RG}bg', 'YG{BR}r{by}', 'YG{BRG}y{by}', 'YG{BR}y{bryg}', 'YMy{bryg}{brg}', 'Y{BR}{YG}br', 'Y{BRG}{BRG}by', 'Y{BRYG}{RG}yg', 'GGG{by}{by}', 'GG{RG}bb', 'GG{BRYG}y{by}', 'GG{BRY}y{byg}', 'GG{RY}g{by}', 'GMy{bryg}{byg}', 'GMgg{bry}', 'GMg{bryg}{by}', 'G{BRYG}{BRG}by', 'G{BRY}{BR}ry', 'G{RY}{RY}rg', 'G{BRYG}{RY}yg', 'M{BRYG}bb{ryg}', 'M{BRYG}b{bryg}{yg}', 'M{BRY}b{bryg}{ryg}', 'M{BRYG}r{byg}{byg}', 'M{BRY}r{bryg}{byg}', 'M{BRG}yyy', 'M{RG}yy{bryg}', 'M{RYG}yg{bryg}', 'M{RY}g{bryg}{bryg}', 'M{BRYG}{br}{yg}{yg}'],
		very_good_nrec: ['BBB{RYG}r', 'BB{RYG}{RYG}y', 'BB{RYG}{YG}{yg}', 'BRR{YG}{bry}', 'BRY{RYG}{bry}', 'BR{BRYG}{YG}y', 'BYY{BRG}y', 'BYY{RG}{bry}', 'BY{BRYG}{RG}y', 'BGG{RYG}{by}', 'BG{BRYG}{RYG}y', 'BG{RY}{RY}{bry}', 'BM{BRYG}b{ryg}', 'BM{BRYG}{br}{yg}', 'BM{RYG}{bryg}{byg}', 'BM{RYG}{yg}{yg}', 'BM{RY}{bryg}{bryg}', 'B{RYG}{RYG}{RG}b', 'RRR{BYG}b', 'RRR{YG}{bg}', 'RRYG{bryg}', 'RRY{BYG}r', 'RRG{BY}r', 'RR{BRYG}{YG}b', 'RR{BYG}{BG}y', 'RR{RYG}{YG}g', 'RYY{BRG}{br}', 'RYY{RG}{brg}', 'RYG{BRY}r', 'RY{BRYG}{RG}b', 'RY{RYG}{RG}g', 'RGG{BRY}{by}', 'RGG{RY}{byg}', 'RG{BRYG}{RY}b', 'RG{RYG}{RY}g', 'RM{BYG}y{bryg}', 'RM{BY}{bryg}{bryg}', 'YYG{BR}{br}', 'YYM{bryg}{brg}', 'YY{RG}{RG}g', 'YGG{BRG}{by}', 'YG{BRG}{RG}y', 'YM{BRG}y{bryg}', 'YM{BR}{bryg}{bryg}', 'GGG{BY}{by}', 'GG{RY}{RY}g', 'GM{BRYG}{byg}{by}', 'GM{BRY}{bryg}{byg}', 'MM{bryg}{bryg}{byg}', 'M{BRYG}{RYG}bb', 'M{BRYG}{BRYG}b{yg}', 'M{BRYG}{BRY}r{byg}', 'M{BRY}{BY}r{bryg}', 'M{BRYG}{RYG}yg', 'M{BRYG}{RY}y{brg}', 'M{BRYG}{RY}{bryg}{bg}'],
		special: ['BBB{RYG}{YG}', 'BBM{RYG}{bryg}', 'BRR{RYG}{YG}', 'BRG{RYG}{RY}', 'BY{RYG}{RG}{RG}', 'BM{BRYG}{BRY}r', 'BM{BRYG}{RYG}{byg}', 'BM{BRYG}{RY}{bryg}', 'RRR{BYG}{YG}', 'RRYG{BRYG}', 'RRM{BYG}{bryg}', 'RGG{BRY}{RY}', 'RM{BRYG}{BYG}y', 'RM{BRYG}{BRYG}{bg}', 'RM{BRYG}{BY}{bryg}', 'YYM{BRG}{bryg}', 'YY{BRG}{RG}{RG}', 'YGGG{BY}', 'YM{BRYG}{BRG}{by}', 'YM{BRYG}{BR}{bryg}', 'GM{BRYG}{BRYG}{by}', 'GM{BRYG}{BRY}{byg}', 'GM{BRY}{BRY}{bryg}', 'MM{BRYG}{bryg}{byg}', 'MM{BRY}{bryg}{bryg}', 'M{BRYG}{BRYG}{RG}b', 'M{BRYG}{BRYG}{RY}g'],
		special_nrec: ['BBBM{RYGM}', 'BM{BRYGM}{BRYG}{RYG}', 'RRRM{BYGM}', 'RRM{BRYGM}{BYG}', 'RGGM{BRYM}', 'RGM{BRYGM}{BRY}', 'YYYM{BM}', 'YYM{BRGM}{RG}', 'YM{BRYGM}{BRG}{RG}', 'GGGM{BYM}', 'GGMM{BRYGMbyg}', 'GGM{BRYGM}{BY}', 'GMM{BRYGMbryg}{BRYM}', 'MMM{BRYGMbryg}{BRYGMbryg}', 'MM{BRYGMbryg}{BRYGM}{BRY}', 'MM{BRYGM}{BRYG}{byg}'],
	},
};

app.recipeWeightSums = {
	Red: {
		basic:         70000,
		good:          61335,
		very_good:     86700,
		special:       26700,
	},
	Blue: {
		basic:         50000,
		good:          51280,
		very_good:     75600,
		special:       25600,
	},
	Yellow: {
		basic:         80000,
		good:          11840,
		very_good:     46800,
		special:       36800,
	},
	Gray: {
		basic:         40000,
		good:          81010,
		very_good:     100200,
		special:       20200,
	},
	Water: {
		basic:         60000,
		good:          40775,
		very_good:     55500,
		special:       15500,
	},
	Normal: {
		basic:         40000,
		good:          40770,
		very_good:     55400,
		special:       15400,
	},
	Poison: {
		basic:         60000,
		good:          40775,
		very_good:     55500,
		special:       15500,
	},
	Ground: {
		basic:         30000,
		good:          20500,
		very_good:     30000,
		special:       10000,
	},
	Grass: {
		basic:         20000,
		good:          20500,
		very_good:     30000,
		special:       10000,
	},
	Bug: {
		basic:         20000,
		good:          10370,
		very_good:     17400,
		special:       7400,
	},
	Psychic: {
		basic:         10000,
		good:          20500,
		very_good:     30000,
		special:       10000,
	},
	Rock: {
		basic:         20000,
		good:          10275,
		very_good:     15500,
		special:       5500,
	},
	Flying: {
		basic:         20000,
		good:          20310,
		very_good:     26200,
		special:       6200,
	},
	Fire: {
		basic:         20000,
		good:          10500,
		very_good:     20000,
		special:       10000,
	},
	Electric: {
		basic:         10000,
		good:          10500,
		very_good:     20000,
		special:       10000,
	},
	Fighting: {
		basic:         10000,
		good:          10400,
		very_good:     18000,
		special:       8000,
	},
	Ambrosia: {
		basic:         300,
		good:          300,
		very_good:     300,
		special:       630,
	},
	Mulligan: {
		basic:         240000,
		good:          215000,
		very_good:     500000,
		special:       300000,
	},
};
