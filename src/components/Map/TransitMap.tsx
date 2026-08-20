import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { RIO_BUS_ROUTES_GEOMETRY, LatLng } from '../../domain/routeGeometry';
import { BusPosition } from '../../domain/geoUtils';
import { BusStop } from '../../services/gtfsService';
import { applyUberStyle } from '../../config/uberMapStyle';

export interface TransitMapProps {
  selectedLineNumber: string | null;
  selectedStop?: BusStop | null;
  buses: BusPosition[];
  stops: BusStop[];
  userLocation?: LatLng;
  recenterTrigger?: number;
  onSelectStop?: (stop: BusStop) => void;
  onSelectLine?: (lineNumber: string) => void;
  onDeselect?: () => void;
}

export const TransitMap: React.FC<TransitMapProps> = ({
  selectedLineNumber,
  selectedStop,
  buses,
  stops,
  userLocation = { latitude: -22.9130, longitude: -43.1805 }, // Lapa / Centro do Rio
  recenterTrigger = 0,
  onSelectStop,
  onDeselect,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const maplibreglRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const markersMapRef = useRef<{ [stopId: string]: any }>({});
  const busMarkersRef = useRef<any[]>([]);
  const terminalMarkersRef = useRef<any[]>([]);
  const routeLayerIdsRef = useRef<string[]>([]);
  const routeSourceIdsRef = useRef<string[]>([]);
  const styleLoadedRef = useRef(false);

  // Refs atualizadas a cada render para evitar Stale Closures nos eventos do MapLibre
  const selectedStopRef = useRef<BusStop | null>(selectedStop || null);
  selectedStopRef.current = selectedStop || null;

  const selectedLineNumberRef = useRef<string | null>(selectedLineNumber);
  selectedLineNumberRef.current = selectedLineNumber;

  const stopsRef = useRef<BusStop[]>(stops);
  stopsRef.current = stops;

  const onSelectStopRef = useRef(onSelectStop);
  onSelectStopRef.current = onSelectStop;

  const onDeselectRef = useRef(onDeselect);
  onDeselectRef.current = onDeselect;

  // ─────────────────────────────────────────────────────
  // INJEÇÃO DE CSS: MapLibre GL + Marcadores Customizados
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // CSS do MapLibre GL (substitui o Leaflet CSS)
      const existingLink = document.getElementById('maplibre-gl-css');
      if (!existingLink) {
        const link = document.createElement('link');
        link.id = 'maplibre-gl-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
        document.head.appendChild(link);
      }

      // Remove CSS antigo do Leaflet se existir
      const oldLeafletCSS = document.getElementById('leaflet-css');
      if (oldLeafletCSS) oldLeafletCSS.remove();

      // Estilos customizados dos marcadores Transit (MESMOS visuais de antes)
      const existingStyle = document.getElementById('transit-map-custom-styles');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'transit-map-custom-styles';
        style.innerHTML = `
          .maplibregl-map {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          .maplibregl-ctrl-attrib {
            background: rgba(43, 45, 49, 0.85) !important;
            color: #949BA4 !important;
            font-size: 9px !important;
          }
          .maplibregl-ctrl-attrib a {
            color: #94A3B8 !important;
          }
          @keyframes user-pulse-anim {
            0% { transform: scale(0.7); opacity: 0.9; }
            70% { transform: scale(2.2); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .user-pulse-ring {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: rgba(56, 189, 248, 0.4);
            position: absolute;
            top: -9px;
            left: -9px;
            animation: user-pulse-anim 2s infinite ease-out;
            pointer-events: none;
          }
          .user-core-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #0284C7;
            border: 2.5px solid #FFFFFF;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
            position: relative;
            z-index: 2;
          }
          .bus-marker-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .bus-marker-container:hover {
            transform: scale(1.15);
            z-index: 1000 !important;
          }
          .bus-icon-circle {
            width: 30px;
            height: 30px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
            color: #FFFFFF;
            font-size: 14px;
          }
          .bus-badge-label {
            background-color: #0F172A;
            border: 1px solid #38BDF8;
            color: #F8FAFC;
            font-size: 9px;
            font-weight: 700;
            padding: 1px 5px;
            border-radius: 4px;
            margin-top: 2px;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
          }
          .stop-pin-cluster {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .stop-pin-circle {
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background-color: #2B2D31;
            border: 2px solid #38BDF8;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 8px rgba(0,0,0,0.7);
            cursor: pointer;
          }
          .stop-pin-selected .stop-pin-circle {
            background-color: #0284C7 !important;
            border: 2.5px solid #FFFFFF !important;
          }
          .stop-direction-badge {
            position: absolute;
            bottom: -3px;
            right: -3px;
            width: 14px;
            height: 14px;
            border-radius: 7px;
            background-color: #38BDF8;
            color: #0F172A;
            font-size: 9px;
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1.5px solid #1E1F22;
            box-shadow: 0 2px 5px rgba(0,0,0,0.6);
            line-height: 1;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  // ─────────────────────────────────────────────────────
  // INICIALIZAÇÃO DO MAPA: MapLibre GL JS (Motor Vetorial via CDN)
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (Platform.OS !== 'web' || !mapContainerRef.current) return;

    let isMounted = true;

    // Carrega MapLibre GL JS via script CDN (evita problemas com Metro/Expo bundler)
    const loadMapLibre = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        if ((window as any).maplibregl) {
          resolve((window as any).maplibregl);
          return;
        }
        const script = document.createElement('script');
        script.id = 'maplibre-gl-js';
        script.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
        script.onload = () => resolve((window as any).maplibregl);
        script.onerror = () => reject(new Error('Failed to load MapLibre GL JS'));
        document.head.appendChild(script);
      });
    };

    loadMapLibre().then((maplibregl) => {
      if (!isMounted || !mapContainerRef.current) return;

      maplibreglRef.current = maplibregl;

      // Se já houver um mapa instanciado no container, limpa antes
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Instanciar o mapa SOMENTE DEPOIS de baixar e modificar o estilo
      fetch('https://tiles.openfreemap.org/styles/dark')
        .then(res => res.json())
        .then(baseStyle => {
          if (!isMounted || !mapContainerRef.current) return;
          
          const uberStyle = applyUberStyle(baseStyle);

          const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: uberStyle,
            center: [-43.1900, -22.9200], // MapLibre usa [lng, lat]
            zoom: 13,
            attributionControl: true,
            maxZoom: 20,
            minZoom: 9,
            pitchWithRotate: false, // Desabilita o gesto de inclinação junto com a rotação
            dragPitch: false,       // Desabilita puxar o mapa para 3D (mantém sempre 2D)
            touchPitch: false,      // Desabilita puxar o mapa para 3D no touch/trackpad
            maxPitch: 0,            // Trava o limite matemático do 3D em 0 graus (impossível inclinar)
          });

          mapRef.current = map;

      // Marcador de Localização do Usuário (GPS Vivo com Pulso)
      const userEl = document.createElement('div');
      userEl.className = 'transit-user-marker';
      userEl.style.pointerEvents = 'none';
      userEl.innerHTML = `
        <div style="position: relative; width: 14px; height: 14px;">
          <div class="user-pulse-ring"></div>
          <div class="user-core-dot"></div>
        </div>
      `;

      userMarkerRef.current = new maplibregl.Marker({ element: userEl, anchor: 'center' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map);

      // Quando o estilo vetorial carregar: renderizar rotas e pontos de ônibus
      map.on('load', () => {
        if (!isMounted) return;
        styleLoadedRef.current = true;

        // Injetar nossos Ícones Vetorizados da pasta SVG
        import('../../utils/mapIcons').then(({ MAP_ICONS }) => {
          Object.entries(MAP_ICONS).forEach(([id, rawSvgString]) => {
            const img = new Image();
            // Precisamos encodar a string SVG para usar num src de imagem de forma segura em todos os browsers
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(rawSvgString as string);
            img.onload = () => {
              if (!map.hasImage(id)) {
                map.addImage(id, img);
              }
            };
          });
        });

        // Ocultar as setinhas cinzas nativas do mapa base que indicam mão única (poluição visual)
        if (map.getLayer('road_oneway')) map.setLayoutProperty('road_oneway', 'visibility', 'none');
        if (map.getLayer('road_oneway_opposite')) map.setLayoutProperty('road_oneway_opposite', 'visibility', 'none');

        renderRoutes(map);
        renderStops(maplibregl, map);
      });

      // Controle de limite de zoom em tempo real (esconde/mostra os pontos instantaneamente no meio da animação de pinça)
      let wasZoomedOut = map.getZoom() < 15.0;
      map.on('zoom', () => {
        if (!styleLoadedRef.current || !maplibreglRef.current) return;
        const isZoomedOut = map.getZoom() < 15.0;
        if (isZoomedOut !== wasZoomedOut) {
          wasZoomedOut = isZoomedOut;
          renderStops(maplibreglRef.current, map);
        }
      });

      // Escutar eventos de deslocamento (pan) para atualizar os pontos visíveis na nova área quando o mapa parar
      map.on('moveend', () => {
        if (styleLoadedRef.current && maplibreglRef.current) {
          renderStops(maplibreglRef.current, map);
        }
      });

      // Escutar clique no mapa livre para deselecionar a linha/ponto ativo
      map.on('click', () => {
        selectedStopRef.current = null;
        if (maplibreglRef.current) {
          renderStops(maplibreglRef.current, map);
        }
        if (onDeselectRef.current) {
          onDeselectRef.current();
        }
      });
      
      }); // Fecha o then(baseStyle) do estilo Uber
      
    }); // Fecha o then() do maplibregl.load()

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // ─────────────────────────────────────────────────────
  // ATUALIZAÇÃO DA POSIÇÃO DO USUÁRIO (GPS ao vivo)
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current && userMarkerRef.current && userLocation) {
      userMarkerRef.current.setLngLat([userLocation.longitude, userLocation.latitude]);
    }
  }, [userLocation]);

  // Centralizar suavemente na posição do usuário quando o botão for acionado
  useEffect(() => {
    if (mapRef.current && userLocation && recenterTrigger > 0) {
      mapRef.current.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 16,
        duration: 1000,
      });
    }
  }, [recenterTrigger]);

  // ─────────────────────────────────────────────────────
  // RENDERIZAÇÃO DAS ROTAS (Polylines GeoJSON Vetoriais)
  // ─────────────────────────────────────────────────────
  const renderRoutes = (map: any) => {
    const maplibregl = maplibreglRef.current;
    if (!maplibregl) return;

    // Limpa camadas e fontes de rotas anteriores
    routeLayerIdsRef.current.forEach((id) => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    routeSourceIdsRef.current.forEach((id) => {
      if (map.getSource(id)) map.removeSource(id);
    });
    routeLayerIdsRef.current = [];
    routeSourceIdsRef.current = [];

    // Limpa marcadores de terminais (início/fim de linha)
    terminalMarkersRef.current.forEach((m) => m.remove());
    terminalMarkersRef.current = [];

    const activeLineNumber = selectedLineNumberRef.current;

    Object.values(RIO_BUS_ROUTES_GEOMETRY).forEach((route) => {
      const isSelected = route.lineNumber === activeLineNumber;
      const sourceId = `route-${route.lineNumber}`;

      // GeoJSON da rota com coordenadas [lng, lat]
      const geojson: any = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route.coordinates.map((c) => [c.longitude, c.latitude]),
        },
      };

      map.addSource(sourceId, { type: 'geojson', data: geojson });
      routeSourceIdsRef.current.push(sourceId);

      if (isSelected) {
        // Linha com Brilho de Contorno (Glow) para a Linha Selecionada
        const glowId = `${sourceId}-glow`;
        map.addLayer({
          id: glowId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': route.color,
            'line-width': 9,
            'line-opacity': 0.3,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        });
        routeLayerIdsRef.current.push(glowId);

        // Linha Principal Vibrante
        const mainId = `${sourceId}-main`;
        map.addLayer({
          id: mainId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': route.color,
            'line-width': 5,
            'line-opacity': 1,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        });
        routeLayerIdsRef.current.push(mainId);

        // Marcadores discretos de começo e fim da linha selecionada
        const startCoord = route.coordinates[0];
        const endCoord = route.coordinates[route.coordinates.length - 1];

        if (startCoord) {
          const startEl = document.createElement('div');
          startEl.style.pointerEvents = 'none';
          startEl.innerHTML = `<div style="width: 12px; height: 12px; border-radius: 6px; background-color: #10B981; border: 2.5px solid #FFFFFF; box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);" title="Início da linha"></div>`;
          const startMarker = new maplibregl.Marker({ element: startEl, anchor: 'center' })
            .setLngLat([startCoord.longitude, startCoord.latitude])
            .addTo(map);
          terminalMarkersRef.current.push(startMarker);
        }

        if (endCoord) {
          const endEl = document.createElement('div');
          endEl.style.pointerEvents = 'none';
          endEl.innerHTML = `<div style="width: 12px; height: 12px; border-radius: 6px; background-color: #EF4444; border: 2.5px solid #FFFFFF; box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);" title="Fim da linha"></div>`;
          const endMarker = new maplibregl.Marker({ element: endEl, anchor: 'center' })
            .setLngLat([endCoord.longitude, endCoord.latitude])
            .addTo(map);
          terminalMarkersRef.current.push(endMarker);
        }
      } 
      /* else {
        // [DESATIVADO TEMPORARIAMENTE PARA LIMPAR A VISÃO DO MAPA]
        // Linhas em segundo plano (Discretas)
        const bgId = `${sourceId}-bg`;
        map.addLayer({
          id: bgId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': route.color,
            'line-width': 3,
            'line-opacity': 0.35,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        });
        routeLayerIdsRef.current.push(bgId);
      } */
    });
  };

  // ─────────────────────────────────────────────────────
  // ATUALIZAÇÃO VISUAL DO PONTO SELECIONADO (DOM direto, 0ms)
  // ─────────────────────────────────────────────────────
  const updateSelectedMarkerClass = (activeStop: BusStop | null) => {
    for (const stopId in markersMapRef.current) {
      const marker = markersMapRef.current[stopId];
      if (!marker) continue;
      const el = marker.getElement();
      if (el) {
        const cluster = el.querySelector('.stop-pin-cluster');
        if (cluster) {
          if (activeStop && activeStop.id === stopId) {
            cluster.classList.add('stop-pin-selected');
          } else {
            cluster.classList.remove('stop-pin-selected');
          }
        }
      }
    }
  };

  // ─────────────────────────────────────────────────────
  // RENDERIZAÇÃO DOS PONTOS DE ÔNIBUS com destaque ativo
  // ─────────────────────────────────────────────────────
  const renderStops = (maplibregl: any, map: any) => {
    const currentZoom = map.getZoom();
    const mapBounds = map.getBounds();
    const allStops = stopsRef.current || stops;
    const activeStop = selectedStopRef.current;

    const stopsToRenderIds = new Set<string>();
    const stopsToRenderData: any[] = [];

    // Constante que define o nível de zoom mínimo para mostrar todos os pontos
    const ZOOM_THRESHOLD = 15.0; // Exige zoom bem perto para ver os pontos de ônibus

    // Fast manual bounds check para evitar milhares de alocações LngLat do MapLibre por frame
    const sw = mapBounds.getSouthWest();
    const ne = mapBounds.getNorthEast();
    
    // Adicionamos uma "gordura" de 1 tela inteira para cada lado.
    // Isso faz os pontos carregarem FORA da visão atual, resolvendo o efeito "carregando de pouquinho em pouquinho"
    const latPadding = (ne.lat - sw.lat) * 1.0;
    const lngPadding = (ne.lng - sw.lng) * 1.0;
    const minLat = sw.lat - latPadding;
    const maxLat = ne.lat + latPadding;
    const minLng = sw.lng - lngPadding;
    const maxLng = ne.lng + lngPadding;

    const isLngInBounds = (lng: number) => {
      if (minLng <= maxLng) {
        return lng >= minLng && lng <= maxLng;
      } else {
        return lng >= minLng || lng <= maxLng;
      }
    };

    // Só mostra todos os pontos quando o zoom for >= ZOOM_THRESHOLD para não poluir a tela
    if (currentZoom >= ZOOM_THRESHOLD) {
      allStops.forEach((stop) => {
        if (stop.latitude >= minLat && stop.latitude <= maxLat && isLngInBounds(stop.longitude)) {
          stopsToRenderIds.add(stop.id);
          stopsToRenderData.push(stop);
        }
      });
    }

    // REGRA DE OURO: O ponto selecionado pelo usuário BURLA o zoom out e NUNCA some
    if (activeStop) {
      if (!stopsToRenderIds.has(activeStop.id)) {
        stopsToRenderIds.add(activeStop.id);
        stopsToRenderData.push(activeStop);
      }
    }

    // Remove marcadores que não estão mais na área visível
    Object.keys(markersMapRef.current).forEach((stopId) => {
      if (!stopsToRenderIds.has(stopId)) {
        markersMapRef.current[stopId].remove();
        delete markersMapRef.current[stopId];
      }
    });

    // Adiciona os marcadores novos
    stopsToRenderData.forEach((stop: any) => {
      // Se o marcador já existe no mapa, não precisamos recriar o DOM!
      if (markersMapRef.current[stop.id]) {
        return;
      }

      const isSelected = activeStop && activeStop.id === stop.id;
      const heading = typeof stop.heading === 'number' ? stop.heading : 45;

      const markerEl = document.createElement('div');
      markerEl.className = 'transit-stop-marker';
      markerEl.innerHTML = `
        <div class="stop-pin-cluster ${isSelected ? 'stop-pin-selected' : ''}" title="${stop.name}">
          <div class="stop-pin-circle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 6v6"></path>
              <path d="M15 6v6"></path>
              <path d="M2 12h19.6"></path>
              <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4C2.9 6 1.9 6.8 1.6 7.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"></path>
              <circle cx="7" cy="18" r="2"></circle>
              <circle cx="17" cy="18" r="2"></circle>
            </svg>
          </div>
          <div class="stop-direction-badge">
            <div style="transform: rotate(${heading}deg); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#0F172A" stroke="#0F172A" stroke-width="1.5">
                <polygon points="12,2 22,22 12,17 2,22"></polygon>
              </svg>
            </div>
          </div>
        </div>
      `;

      // Evento de clique no ponto de ônibus
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedStopRef.current = stop;
        updateSelectedMarkerClass(stop);
        if (onSelectStopRef.current) {
          onSelectStopRef.current(stop);
        }
      });

      const marker = new maplibregl.Marker({ element: markerEl, anchor: 'center' })
        .setLngLat([stop.longitude, stop.latitude])
        .addTo(map);

      markersMapRef.current[stop.id] = marker;
    });

    // Atualiza a classe de "selecionado" de todos os pontos atuais na tela
    updateSelectedMarkerClass(activeStop);
  };

  // ─────────────────────────────────────────────────────
  // EFEITOS REATIVOS: Rotas, Seleção, Paradas, Ônibus
  // ─────────────────────────────────────────────────────

  // Re-renderizar rotas quando a linha selecionada muda
  useEffect(() => {
    const map = mapRef.current;
    if (map && styleLoadedRef.current) {
      renderRoutes(map);
    }
  }, [selectedLineNumber]);

  // Atualizar visual do ponto ativo instantaneamente
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreglRef.current;
    if (!map || !maplibregl) return;

    const currentZoom = map.getZoom();

    if (currentZoom < 15.0) {
      // Se o zoom estiver afastado, ao selecionar ou deselecionar precisamos atualizar a camada de paradas
      renderStops(maplibregl, map);
    } else {
      // Se o zoom estiver próximo (>= 15.0), apenas alterna a classe no DOM em 0ms
      updateSelectedMarkerClass(selectedStop || null);
    }
  }, [selectedStop]);

  // Re-renderizar todos os pontos quando a lista base de paradas mudar
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreglRef.current;
    if (map && maplibregl && styleLoadedRef.current) {
      renderStops(maplibregl, map);
    }
  }, [stops]);

  // Atualização dos Marcadores de Ônibus em Tempo Real (Telemetria)
  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreglRef.current;
    if (!map || !maplibregl) return;

    // Limpa marcadores de ônibus anteriores
    // [DESATIVADO TEMPORARIAMENTE] para focar no design do mapa base
    /*
    buses.forEach((bus) => {
      const routeGeo = RIO_BUS_ROUTES_GEOMETRY[bus.linha];
      const busColor = routeGeo ? routeGeo.color : '#3B82F6';
      const isTarget = bus.linha === selectedLineNumber;

      const busEl = document.createElement('div');
      busEl.className = 'transit-live-bus-marker';
      busEl.innerHTML = `
        <div class="bus-marker-container">
          <div class="bus-icon-circle" style="background-color: ${busColor}; ${isTarget ? 'transform: scale(1.15); box-shadow: 0 0 14px ' + busColor + ';' : 'opacity: 0.85;'}">
            🚌
          </div>
          <div class="bus-badge-label" style="${isTarget ? 'border-color: #F8FAFC; background-color: #0284C7;' : ''}">
            ${bus.linha} ${bus.velocidade > 0 ? \`· \${Math.round(bus.velocidade)}km/h\` : ''}
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(\`
        <div style="color: #0F172A; font-family: sans-serif; padding: 4px;">
          <strong style="font-size: 14px;">Linha \${bus.linha}</strong><br/>
          <span>Veículo: <b>\${bus.ordem}</b></span><br/>
          <span>Velocidade: <b>\${Math.round(bus.velocidade)} km/h</b></span>
        </div>
      \`);

      const busMarker = new maplibregl.Marker({ element: busEl, anchor: 'center' })
        .setLngLat([bus.longitude, bus.latitude])
        .setPopup(popup)
        .addTo(map);

      busMarkersRef.current.push(busMarker);
    });
    */
  }, [buses, selectedLineNumber]);

  // ─────────────────────────────────────────────────────
  // RENDER: Container do Mapa
  // ─────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <div
          ref={mapContainerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
      ) : (
        <View style={styles.fallbackView}>
          <Text style={styles.fallbackText}>Mapa Nativo (React Native Maps)</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1E1F22',
  },
  fallbackView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1F22',
  },
  fallbackText: {
    color: '#949BA4',
    fontSize: 14,
  },
});
