export const applyUberStyle = (baseStyle: any) => {
  const CUSTOM = {
    water: '#3d4654',
    bg: '#2a2e35',
    roadMinor: '#1e2126',
    roadMajor: '#14161a',
    casing: '#2a2e35', 
    building: '#353a42',
    textDefault: '#656a73',
    streetName: '#FFFFFF',
    placeName: '#e2e8f0',
    parkName: '#5b8a6a',
    institutionName: '#8b949e', 
    forest: '#23262b'
  };

  const style = JSON.parse(JSON.stringify(baseStyle));
  const newLayers: any[] = [];
  
  // NOTA: O OpenFreeMap só hospeda 'Noto Sans Regular'. O servidor fonts.openmaptiles.org está offline.
  // Mantemos o glyphs original do OpenFreeMap.

  style.layers.forEach((l: any) => {
    // 1. Cores de Fundo
    if (l.id === 'background') l.paint['background-color'] = CUSTOM.bg;
    if (l.id === 'water') l.paint['fill-color'] = CUSTOM.water;
    
    // 2. Esconder áreas verdes no chão
    if (l.id.includes('park') || l.id.includes('wood') || l.id.includes('grass')) {
      l.paint['fill-color'] = CUSTOM.forest;
    }
    
    // 3. Prédios
    if (l.id === 'building') {
      l.filter = ['has', 'name']; 
      l.paint['fill-color'] = CUSTOM.building;
      l.paint['fill-opacity'] = 1.0;
      l.layout = l.layout || {};
      l.layout['visibility'] = 'visible'; 
      if (l.paint['fill-outline-color']) l.paint['fill-outline-color'] = CUSTOM.bg;
    }
    
    if (l.id.includes('aeroway')) {
      l.layout = l.layout || {};
      l.layout['visibility'] = 'none';
    }

    if (l.type === 'line' && (l.id === 'highway_major_inner' || l.id === 'highway_major_casing' || l.id === 'highway_major_subtle')) {
      const createSplitLayer = (idSuffix: string, classes: string[], minZoomLevel: number) => {
        const split = JSON.parse(JSON.stringify(l));
        split.id = l.id + idSuffix;
        split.minzoom = minZoomLevel;
        const matchFilter = split.filter.find((f: any) => f[0] === 'match' && f[1]?.[1] === 'class');
        if (matchFilter) {
          matchFilter[2] = classes;
        }
        return split;
      };

      newLayers.push(createSplitLayer('_tier3', ['trunk', 'primary'], 9.5));
      newLayers.push(createSplitLayer('_tier2', ['secondary'], 11.5));
      newLayers.push(createSplitLayer('_tier1', ['tertiary'], 12.5));
      return; 
    }

    if (l.id === 'place_suburb' || l.id === 'place_other' || l.id === 'place_village' || l.id === 'place_town') {
      const createPlaceSplit = (idSuffix: string, rankCondition: any, minZoomLevel: number) => {
        const split = JSON.parse(JSON.stringify(l));
        split.id = l.id + idSuffix;
        split.minzoom = minZoomLevel;
        if (split.filter[0] === 'all') {
          split.filter.push(rankCondition);
        } else {
          split.filter = ['all', split.filter, rankCondition];
        }
        return split;
      };

      newLayers.push(createPlaceSplit('_macro', ['<=', ['get', 'rank'], 2], 9));
      newLayers.push(createPlaceSplit('_medio', ['all', ['>', ['get', 'rank'], 2], ['<=', ['get', 'rank'], 4]], 10.8));
      newLayers.push(createPlaceSplit('_micro', ['>', ['get', 'rank'], 4], 13.5));
      
      return; 
    }

    if (l.id.includes('poi')) return;

    newLayers.push(l);
  });

  style.layers = newLayers;

  style.layers.forEach((l: any) => {
    if (l.type === 'line' && l.id.includes('highway')) {
      if (l.id.includes('path') || l.id.includes('pedestrian')) {
        l.layout = l.layout || {};
        l.layout['visibility'] = 'none';
        return; 
      }

      if (l.id.includes('motorway')) {
        l.minzoom = 7.5; 
      } else if (l.id.includes('minor')) {
        l.minzoom = 13.5; 
      }

      if (l.paint['line-width']) {
        let multiplier = 1.35; 
        
        if (l.id.includes('motorway') || l.id.includes('trunk')) {
          multiplier = 1.9; 
        } else if (l.id.includes('major_inner_tier3') || l.id.includes('primary')) {
          multiplier = 1.7; 
        } else if (l.id.includes('major_inner_tier2') || l.id.includes('secondary')) {
          multiplier = 1.5;
        }

        if (Array.isArray(l.paint['line-width'])) {
          const newWidth = [...l.paint['line-width']];
          // Formato: ['interpolate', ['exponential', base], ['zoom'], zoom1, width1, zoom2, width2]
          for (let i = 4; i < newWidth.length; i += 2) {
            if (typeof newWidth[i] === 'number') {
              newWidth[i] = newWidth[i] * multiplier;
            }
          }
          l.paint['line-width'] = newWidth;
        } else if (typeof l.paint['line-width'] === 'number') {
          l.paint['line-width'] *= multiplier;
        }
      }

      if (l.id.includes('casing') || l.id.includes('subtle')) {
        l.paint['line-color'] = CUSTOM.casing;
      } else if (l.id.includes('motorway') || l.id.includes('tier3')) {
        l.paint['line-color'] = CUSTOM.roadMajor;
      } else {
        l.paint['line-color'] = CUSTOM.roadMinor;
      }
    }
    
    // INTERCEPTORES DE TEXTO GERAIS (Fonte arredondada e Abreviação)
    if (l.layout) {
      if (l.layout['text-transform'] === 'uppercase') {
        delete l.layout['text-transform'];
      }
      if (Array.isArray(l.layout['text-font'])) {
        l.layout['text-font'] = ['Noto Sans Regular'];
      }
      
      // ABREVIAÇÃO DE RUAS: Tranformar "Rua X" em "R. X" com MapLibre Expressions (usando to-string para evitar crash)
      if (l.id.startsWith('highway_name') && l.layout['text-field']) {
        l.layout['text-field'] = [
          "case",
          ["==", ["slice", ["to-string", ["get", "name"]], 0, 4], "Rua "],
          ["concat", "R. ", ["slice", ["to-string", ["get", "name"]], 4]],
          ["==", ["slice", ["to-string", ["get", "name"]], 0, 8], "Avenida "],
          ["concat", "Av. ", ["slice", ["to-string", ["get", "name"]], 8]],
          ["==", ["slice", ["to-string", ["get", "name"]], 0, 9], "Travessa "],
          ["concat", "Tv. ", ["slice", ["to-string", ["get", "name"]], 9]],
          ["==", ["slice", ["to-string", ["get", "name"]], 0, 8], "Estrada "],
          ["concat", "Est. ", ["slice", ["to-string", ["get", "name"]], 8]],
          ["==", ["slice", ["to-string", ["get", "name"]], 0, 6], "Praça "],
          ["concat", "Pç. ", ["slice", ["to-string", ["get", "name"]], 6]],
          ["to-string", ["get", "name"]]
        ];
      }
    }

    if (l.type === 'symbol' && l.paint && l.paint['text-color']) {
      if (l.id.includes('highway_name')) {
        l.paint['text-color'] = CUSTOM.streetName;
        if (!l.id.includes('motorway') && !l.id.includes('major')) {
          l.minzoom = 14.5; 
        }
      } else if (l.id.startsWith('place_')) {
        l.paint['text-color'] = CUSTOM.placeName;
        if (l.layout['text-size']) {
          if (typeof l.layout['text-size'] === 'number') {
            l.layout['text-size'] *= 1.4; 
          }
        }
        l.layout['symbol-sort-key'] = ['get', 'rank'];
      } else {
        l.paint['text-color'] = CUSTOM.textDefault;
      }
      if (l.paint['text-halo-color']) {
        l.paint['text-halo-color'] = CUSTOM.bg;
        l.paint['text-halo-width'] = 1.5;
      }
    }
  });

  const parkCombinedLayout = {
    'icon-image': 'custom-park',
    'icon-size': 0.6,
    'icon-anchor': 'bottom',
    'text-field': ['get', 'name'],
    'text-font': ['Noto Sans Regular'],
    'text-size': 11.5,
    'text-anchor': 'top',
    'text-offset': [0, 0.2], 
    'symbol-sort-key': ['get', 'rank']
  };
  const parkCombinedPaint = {
    'icon-opacity': 0.9,
    'text-color': CUSTOM.parkName, 
    'text-halo-color': CUSTOM.bg, 
    'text-halo-width': 2
  };

  style.layers.push({
    id: 'custom_park_pois_macro',
    type: 'symbol',
    source: 'openmaptiles',
    'source-layer': 'poi',
    minzoom: 15.0,
    filter: ['all', ['==', ['get', 'class'], 'park'], ['==', ['get', 'rank'], 3]],
    layout: parkCombinedLayout,
    paint: parkCombinedPaint
  });

  style.layers.push({
    id: 'custom_institution_pois',
    type: 'symbol',
    source: 'openmaptiles',
    'source-layer': 'poi',
    minzoom: 15.5,
    filter: ['any', ['==', ['get', 'class'], 'hospital'], ['==', ['get', 'class'], 'school'], ['==', ['get', 'class'], 'college'], ['==', ['get', 'class'], 'airport']],
    layout: {
      'icon-image': ['match', ['get', 'class'], 'hospital', 'custom-hospital', 'school', 'custom-school', 'college', 'custom-school', 'airport', 'custom-airport', ''],
      'icon-size': 0.6,
      'icon-anchor': 'bottom',
      'text-field': ['get', 'name'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 11,
      'text-anchor': 'top',
      'text-offset': [0, 0.2],
    },
    paint: {
      'icon-opacity': 0.9,
      'text-color': CUSTOM.institutionName, 
      'text-halo-color': CUSTOM.bg, 
      'text-halo-width': 2 
    }
  });

  return style;
};