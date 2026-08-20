import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { RIO_BUS_ROUTES_GEOMETRY, LatLng } from '../../domain/routeGeometry';
import { BusPosition } from '../../domain/geoUtils';
import { BusStop } from '../../services/gtfsService';

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
  const leafletMapRef = useRef<any>(null);
  const polylinesLayerRef = useRef<any>(null);
  const stopsLayerRef = useRef<any>(null);
  const busesLayerRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const markersMapRef = useRef<{ [stopId: string]: any }>({});

  // Refs atualizadas a cada render para evitar Stale Closures nos eventos do Leaflet
  const selectedStopRef = useRef<BusStop | null>(selectedStop || null);
  selectedStopRef.current = selectedStop || null;

  const stopsRef = useRef<BusStop[]>(stops);
  stopsRef.current = stops;

  const onSelectStopRef = useRef(onSelectStop);
  onSelectStopRef.current = onSelectStop;

  const onDeselectRef = useRef(onDeselect);
  onDeselectRef.current = onDeselect;

  // Injeção do CSS do Leaflet para ambiente Web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const existingLink = document.getElementById('leaflet-css');
      if (!existingLink) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Injeção de Estilos de Animação de Pulso e Marcadores Transit
      const existingStyle = document.getElementById('transit-map-custom-styles');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'transit-map-custom-styles';
        style.innerHTML = `
          .leaflet-container {
            background-color: #1E1F22 !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          .leaflet-tile {
            filter: brightness(1.85) contrast(0.72) sepia(0.08) hue-rotate(185deg);
            opacity: 0.9;
          }
          .leaflet-control-attribution {
            background: rgba(43, 45, 49, 0.85) !important;
            color: #949BA4 !important;
            font-size: 9px !important;
          }
          .leaflet-control-attribution a {
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

  // Inicialização do Mapa Leaflet
  useEffect(() => {
    if (Platform.OS !== 'web' || !mapContainerRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Se já houver um mapa instanciado no container, limpa antes
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      // Criação da Instância do Mapa Centrado no Rio de Janeiro
      const map = L.map(mapContainerRef.current, {
        center: [-22.9200, -43.1900],
        zoom: 13,
        zoomControl: false,
        attributionControl: true,
      });

      // Camada de Azulejos Escura: CARTO Dark Matter (Gratuita, Padrão Transit App)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Grupos de Camadas para gerenciamento dinâmico
      polylinesLayerRef.current = L.layerGroup().addTo(map);
      stopsLayerRef.current = L.layerGroup().addTo(map);
      busesLayerRef.current = L.layerGroup().addTo(map);

      // Marcador de Localização do Usuário (GPS Vivo)
      const userIcon = L.divIcon({
        className: 'transit-user-marker',
        html: `
          <div style="position: relative; width: 14px; height: 14px;">
            <div class="user-pulse-ring"></div>
            <div class="user-core-dot"></div>
          </div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      userMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: userIcon,
        zIndexOffset: 900,
      }).addTo(map);

      // Escutar eventos de zoom e deslocamento de tela para atualizar apenas os pontos de ônibus visíveis
      map.on('zoomend moveend', () => {
        renderStops(L, map);
      });

      // Escutar clique no mapa livre para deselecionar a linha/ponto ativo
      map.on('click', (e: any) => {
        updateSelectedMarkerClass(null);
        if (onDeselectRef.current) {
          onDeselectRef.current();
        }
      });

      // Renderização inicial
      renderRoutes(L, map);
      renderStops(L, map);
    });

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Atualização da Posição do Usuário
  useEffect(() => {
    if (leafletMapRef.current && userMarkerRef.current && userLocation) {
      userMarkerRef.current.setLatLng([userLocation.latitude, userLocation.longitude]);
    }
  }, [userLocation]);

  // Centralizar suavemente na posição do usuário quando o botão for acionado
  useEffect(() => {
    if (leafletMapRef.current && userLocation && recenterTrigger > 0) {
      leafletMapRef.current.flyTo([userLocation.latitude, userLocation.longitude], 16, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [recenterTrigger]);

  // Função para renderizar APENAS as rotas
  const renderRoutes = (L: any, map: any) => {
    if (!polylinesLayerRef.current) return;
    polylinesLayerRef.current.clearLayers();

    Object.values(RIO_BUS_ROUTES_GEOMETRY).forEach((route) => {
      const isSelected = route.lineNumber === selectedLineNumber;
      const latLngs = route.coordinates.map((c) => [c.latitude, c.longitude]);

      if (isSelected) {
        // Linha com Brilho de Contorno (Glow) para a Linha Selecionada
        L.polyline(latLngs, {
          color: route.color,
          weight: 9,
          opacity: 0.3,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(polylinesLayerRef.current);

        // Linha Principal Vibrante
        L.polyline(latLngs, {
          color: route.color,
          weight: 5,
          opacity: 1,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(polylinesLayerRef.current);

        // Marcadores discretos de começo e fim
        const startCoord = route.coordinates[0];
        const endCoord = route.coordinates[route.coordinates.length - 1];

        if (startCoord) {
          const startIcon = L.divIcon({
            className: 'terminal-dot-start',
            html: `<div style="width: 12px; height: 12px; border-radius: 6px; background-color: #10B981; border: 2.5px solid #FFFFFF; box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);" title="Início da linha"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });
          L.marker([startCoord.latitude, startCoord.longitude], { icon: startIcon, zIndexOffset: 700 }).addTo(polylinesLayerRef.current);
        }

        if (endCoord) {
          const endIcon = L.divIcon({
            className: 'terminal-dot-end',
            html: `<div style="width: 12px; height: 12px; border-radius: 6px; background-color: #EF4444; border: 2.5px solid #FFFFFF; box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);" title="Fim da linha"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });
          L.marker([endCoord.latitude, endCoord.longitude], { icon: endIcon, zIndexOffset: 700 }).addTo(polylinesLayerRef.current);
        }
      } else {
        // Linhas em segundo plano (Discretas)
        L.polyline(latLngs, {
          color: route.color,
          weight: 3,
          opacity: 0.35,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(polylinesLayerRef.current);
      }
    });
  };

  // Função ultra-rápida para atualizar o ponto selecionado no DOM sem destruir/recriar camadas
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
            marker.setZIndexOffset(9999);
          } else {
            cluster.classList.remove('stop-pin-selected');
            marker.setZIndexOffset(600);
          }
        }
      }
    }
  };

  // Função para renderizar os pontos de ônibus com destaque ativo
  const renderStops = (L: any, map: any) => {
    if (!stopsLayerRef.current) return;
    stopsLayerRef.current.clearLayers();
    markersMapRef.current = {};

    const currentZoom = map.getZoom();
    const mapBounds = map.getBounds();
    const allStops = stopsRef.current || stops;
    const activeStop = selectedStopRef.current;

    let stopsToRender: any[] = [];

    // Só mostra todos os pontos quando o zoom for >= 16 para não poluir a tela
    if (currentZoom >= 16) {
      stopsToRender = allStops.filter((stop) => {
        return mapBounds.contains([stop.latitude, stop.longitude]);
      });
    }

    // REGRA DE OURO: O ponto selecionado pelo usuário BURLA o zoom out e NUNCA some
    if (activeStop) {
      const alreadyInList = stopsToRender.some((s) => s.id === activeStop.id);
      if (!alreadyInList) {
        stopsToRender.push(activeStop);
      }
    }

    stopsToRender.forEach((stop: any) => {
      const isSelected = activeStop && activeStop.id === stop.id;
      const heading = typeof stop.heading === 'number' ? stop.heading : 45;

      const stopIcon = L.divIcon({
        className: 'transit-stop-marker',
        html: `
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
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([stop.latitude, stop.longitude], {
        icon: stopIcon,
        zIndexOffset: isSelected ? 9999 : 600,
      }).addTo(stopsLayerRef.current);

      markersMapRef.current[stop.id] = marker;

      marker.on('click', (e: any) => {
        if (e && e.originalEvent) {
          e.originalEvent.stopPropagation();
          e.originalEvent.preventDefault();
        }
        if (L.DomEvent && e.originalEvent) {
          L.DomEvent.stop(e.originalEvent);
        }
        // Resposta visual instantânea (0ms)
        updateSelectedMarkerClass(stop);
        if (onSelectStopRef.current) {
          onSelectStopRef.current(stop);
        }
      });
    });
  };

  // Re-renderizar rotas quando a linha selecionada muda
  useEffect(() => {
    if (leafletMapRef.current) {
      import('leaflet').then((L) => {
        renderRoutes(L, leafletMapRef.current);
      });
    }
  }, [selectedLineNumber]);

  // Atualizar classe do ponto ativo sem recriar todas as paradas
  useEffect(() => {
    updateSelectedMarkerClass(selectedStop || null);
  }, [selectedStop]);

  // Re-renderizar todos os pontos quando a lista base de paradas mudar
  useEffect(() => {
    if (leafletMapRef.current) {
      import('leaflet').then((L) => {
        renderStops(L, leafletMapRef.current);
      });
    }
  }, [stops]);

  // Atualização dos Marcadores de Ônibus em Tempo Real (Telemetria)
  useEffect(() => {
    if (!leafletMapRef.current || !busesLayerRef.current) return;

    import('leaflet').then((L) => {
      busesLayerRef.current.clearLayers();

      buses.forEach((bus) => {
        const routeGeo = RIO_BUS_ROUTES_GEOMETRY[bus.linha];
        const busColor = routeGeo ? routeGeo.color : '#3B82F6';
        const isTarget = bus.linha === selectedLineNumber;

        const busIcon = L.divIcon({
          className: 'transit-live-bus-marker',
          html: `
            <div class="bus-marker-container">
              <div class="bus-icon-circle" style="background-color: ${busColor}; ${isTarget ? 'transform: scale(1.15); box-shadow: 0 0 14px ' + busColor + ';' : 'opacity: 0.85;'}">
                🚌
              </div>
              <div class="bus-badge-label" style="${isTarget ? 'border-color: #F8FAFC; background-color: #0284C7;' : ''}">
                ${bus.linha} ${bus.velocidade > 0 ? `· ${Math.round(bus.velocidade)}km/h` : ''}
              </div>
            </div>
          `,
          iconSize: [40, 50],
          iconAnchor: [20, 25],
        });

        const busMarker = L.marker([bus.latitude, bus.longitude], {
          icon: busIcon,
          zIndexOffset: isTarget ? 800 : 500,
        });

        busMarker.bindPopup(`
          <div style="color: #0F172A; font-family: sans-serif; padding: 4px;">
            <strong style="font-size: 14px;">Linha ${bus.linha}</strong><br/>
            <span>Veículo: <b>${bus.ordem}</b></span><br/>
            <span>Velocidade: <b>${Math.round(bus.velocidade)} km/h</b></span>
          </div>
        `);

        busMarker.addTo(busesLayerRef.current);
      });
    });
  }, [buses, selectedLineNumber]);

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
