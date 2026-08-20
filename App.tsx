import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { THEME } from './src/config/theme';
import { SPACING, COLUMNS, HEIGHTS, RADII } from './src/config/grid';
import { TransitMap } from './src/components/Map/TransitMap';
import { fetchLiveBusPositions } from './src/services/datarioApi';
import { BusPosition, haversineDistance, isWithinGeofence, estimateArrivalTime } from './src/domain/geoUtils';
import { BusStop } from './src/services/gtfsService';
import busStopsData from './data/processed/rio_bus_stops.json';
import * as Location from 'expo-location';
import { getAutoDiscoveredLines, getNearbyStopsSorted } from './src/services/spatialEngine';
import { SettingsModal, AlertSettings } from './src/components/Settings/SettingsModal';

/**
 * Função para capturar a localização REAL do usuário (Navegador Web / Celular)
 */
async function requestRealUserLocation(): Promise<{ latitude: number; longitude: number } | null> {
  try {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (err) => {
            console.warn('[GPS] Geolocalização do navegador não permitida ou indisponível:', err.message);
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
      });
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      }
    }
  } catch (error) {
    console.warn('[GPS] Falha ao requisitar coordenadas reais:', error);
  }
  return null;
}

// Linhas de Ônibus com Grid de Colunas Padronizado (Transit App)
const NEARBY_TRANSIT_LINES = [
  {
    number: '474',
    name: 'Jacaré ➔ Jardim de Alah',
    via: 'Via Copacabana & Lapa',
    eta: '2',
    unit: 'min',
    bgColor: '#1D4ED8',
    textColor: '#FFFFFF',
  },
  {
    number: '606',
    name: 'Rodoviária ➔ Eng. de Dentro',
    via: 'Via Tijuca & Maracanã',
    eta: '1',
    unit: 'min',
    bgColor: '#059669',
    textColor: '#FFFFFF',
  },
  {
    number: '483',
    name: 'Penha ➔ General Osório',
    via: 'Via Linha Vermelha & Túnel',
    eta: '5',
    unit: 'min',
    bgColor: '#DC2626',
    textColor: '#FFFFFF',
  },
  {
    number: '309',
    name: 'Central ➔ Alvorada',
    via: 'Via Botafogo & Barra',
    eta: '8',
    unit: 'min',
    bgColor: '#EAB308',
    textColor: '#000000',
  },
  {
    number: '457',
    name: 'Abolição ➔ Copacabana',
    via: 'Via Túnel Rebouças',
    eta: '11',
    unit: 'min',
    bgColor: '#7C3AED',
    textColor: '#FFFFFF',
  },
];

const SCREEN_HEIGHT = Dimensions.get('window').height || 750;
const SNAP_EXPANDED = Math.min(SCREEN_HEIGHT * 0.85, 620);
const SNAP_HALF = Math.min(SCREEN_HEIGHT * 0.48, 380);
const SNAP_COLLAPSED = 140;

export default function App() {
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [selectedLineNumber, setSelectedLineNumber] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [liveBuses, setLiveBuses] = useState<BusPosition[]>([]);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  // Localização inicial fixada na Rua Serenata, 193 - Ilha do Governador (Jardim Guanabara)
  const [userLocation, setUserLocation] = useState({
    latitude: -22.8122,
    longitude: -43.2048,
  });

  const [recenterTrigger, setRecenterTrigger] = useState<number>(0);

  // Meus Favoritos & Configurações de Alerta
  const [favoriteStops, setFavoriteStops] = useState<BusStop[]>([]);
  const [favoriteLines, setFavoriteLines] = useState<string[]>(['324']);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    radius: 300,
    sound: true,
    vibration: true,
  });

  const toggleFavoriteStop = (stop: BusStop) => {
    setFavoriteStops((prev) => {
      const exists = prev.some((s) => s.id === stop.id);
      if (exists) {
        return prev.filter((s) => s.id !== stop.id);
      }
      return [...prev, stop];
    });
  };

  const toggleFavoriteLine = (lineNum: string) => {
    setFavoriteLines((prev) => {
      const exists = prev.includes(lineNum);
      if (exists) {
        return prev.filter((l) => l !== lineNum);
      }
      return [...prev, lineNum];
    });
  };

  // Captura automática da localização REAL do usuário ao carregar o aplicativo
  useEffect(() => {
    requestRealUserLocation().then((coords) => {
      if (coords) {
        setUserLocation(coords);
      }
    });
  }, []);

  // Handler para recentralizar com atualização em tempo real do GPS
  async function handleRecenter() {
    const coords = await requestRealUserLocation();
    if (coords) {
      setUserLocation(coords);
    }
    setRecenterTrigger((prev) => prev + 1);
  }

  const sheetHeight = useRef(new Animated.Value(SNAP_HALF)).current;
  const currentHeightRef = useRef(SNAP_HALF);
  const linesScrollRef = useRef<ScrollView | null>(null);

  // Quando o usuário seleciona um novo ponto, reseta o scroll da lista de linhas para o topo
  useEffect(() => {
    if (linesScrollRef.current) {
      linesScrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [selectedStop]);

  // Polling em tempo real da telemetria da frota de ônibus (Data.rio API)
  useEffect(() => {
    let isSubscribed = true;

    async function loadTelemetry() {
      try {
        setIsLiveLoading(true);
        const positions = await fetchLiveBusPositions();
        if (isSubscribed && positions && positions.length > 0) {
          setLiveBuses(positions);
        }
      } catch (err) {
        console.warn('Erro ao atualizar telemetria:', err);
      } finally {
        if (isSubscribed) setIsLiveLoading(false);
      }
    }

    loadTelemetry();
    const intervalId = setInterval(loadTelemetry, 7000); // Atualização periódica a cada 7s

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
    };
  }, []);

  // Gestos do Painel Deslizante
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sheetHeight.extractOffset();
      },
      onPanResponderMove: (_, gestureState) => {
        sheetHeight.setValue(-gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        sheetHeight.flattenOffset();
        const finalHeight = currentHeightRef.current - gestureState.dy;
        let targetSnap = SNAP_HALF;
        if (finalHeight > (SNAP_HALF + SNAP_EXPANDED) / 2) {
          targetSnap = SNAP_EXPANDED;
        } else if (finalHeight < (SNAP_COLLAPSED + SNAP_HALF) / 2) {
          targetSnap = SNAP_COLLAPSED;
        }
        currentHeightRef.current = targetSnap;
        Animated.spring(sheetHeight, {
          toValue: targetSnap,
          useNativeDriver: false,
          friction: 8,
          tension: 50,
        }).start();
      },
    })
  ).current;

  // DESCOBERTA DE LINHAS QUE PASSAM NO PONTO CLICADO NO MAPA
  const linesForClickedStop = useMemo(() => {
    return getAutoDiscoveredLines(userLocation, liveBuses, searchQuery, selectedStop).lines;
  }, [selectedStop, userLocation, liveBuses, searchQuery]);

  const filteredLines = linesForClickedStop;

  const selectedLine = filteredLines.find((l) => l.number === selectedLineNumber) || filteredLines[0] || NEARBY_TRANSIT_LINES[0];

  function snapTo(height: number) {
    currentHeightRef.current = height;
    Animated.spring(sheetHeight, {
      toValue: height,
      useNativeDriver: false,
      friction: 8,
      tension: 50,
    }).start();
  }

  // Cálculo da distância até o ponto de destino
  const distanceToStop = useMemo(() => {
    if (!selectedStop || !userLocation) return null;
    return Math.round(
      haversineDistance(userLocation, {
        latitude: selectedStop.latitude,
        longitude: selectedStop.longitude,
      })
    );
  }, [userLocation, selectedStop]);

  // Ônibus da linha selecionada ativos no momento
  const lineBusesCount = useMemo(() => {
    return liveBuses.filter((b) => b.linha === selectedLineNumber).length;
  }, [liveBuses, selectedLineNumber]);

  // Estimativa estatística de chegada
  const etaPrediction = useMemo(() => {
    if (!distanceToStop) return { estimatedMinutes: 5, minMinutes: 3, maxMinutes: 7 };
    return estimateArrivalTime(distanceToStop, 22);
  }, [distanceToStop]);

  const isNearGeofence = distanceToStop !== null && distanceToStop <= alertSettings.radius;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ============================================================ */}
      {/* CAMADA 1: MAPA INTERATIVO REAL (CARTO DARK MATTER - R$ 0,00) */}
      {/* ============================================================ */}
      <View style={styles.fullscreenMap}>
        <TransitMap
          selectedLineNumber={selectedLineNumber}
          selectedStop={selectedStop}
          buses={liveBuses}
          stops={busStopsData as BusStop[]}
          userLocation={userLocation}
          recenterTrigger={recenterTrigger}
          onSelectStop={(stop) => {
            setSelectedStop(stop);
            // Se já tiver uma linha selecionada que não passa nesse ponto, limpa o filtro de linha
            const stopLines = (stop as any).lines;
            if (selectedLineNumber && stopLines && !stopLines.includes(selectedLineNumber)) {
              setSelectedLineNumber(null);
            }
          }}
          onDeselect={() => {
            setSelectedStop(null);
            setSelectedLineNumber(null);
          }}
        />

        {/* CONTROLES FLUTUANTES SUPERIORES */}
        <TouchableOpacity
          style={styles.profileFloatingBtn}
          activeOpacity={0.8}
          onPress={() => setSettingsVisible(true)}
        >
          <View style={styles.profileIconCircle}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.gearBadge}>
            <Ionicons name="settings" size={10} color="#000000" />
          </View>
        </TouchableOpacity>

        {/* BOTÃO REDONDO: RECENTRALIZAR NO USUÁRIO (MIRA) */}
        <TouchableOpacity
          style={styles.recenterFloatingBtn}
          activeOpacity={0.8}
          onPress={handleRecenter}
        >
          <View style={styles.recenterIconCircle}>
            <Ionicons name="locate" size={20} color="#38BDF8" />
          </View>
        </TouchableOpacity>

        {/* Alerta Visual de Geofence Ativo */}
        {alertActive && selectedStop && (
          <View style={[styles.activeAlertBanner, isNearGeofence && styles.activeAlertBannerTriggered]}>
            <Ionicons
              name={isNearGeofence ? 'alert-circle' : 'notifications'}
              size={18}
              color={isNearGeofence ? '#EF4444' : '#38BDF8'}
            />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.activeAlertTitle}>
                {isNearGeofence ? '🚨 DESEMBARQUE PRÓXIMO!' : `Alerta: ${selectedStop.name}`}
              </Text>
              <Text style={styles.activeAlertSubtitle}>
                {isNearGeofence
                  ? `Você está a ${distanceToStop}m do seu ponto de descida!`
                  : `Avisaremos automaticamente a ${alertSettings.radius}m do ponto`}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* ============================================================ */}
      {/* CAMADA 2: PAINEL DESLIZANTE COM GRADE RIGOROSA (TRANSIT APP) */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.bottomSheetOverlay,
          { height: sheetHeight },
        ]}
      >
        {/* Alça de Arrasto com Áreas Laterais de Deseleção */}
        <View style={styles.dragHandleZoneWrapper}>
          <TouchableOpacity
            style={styles.sheetSideDeselectArea}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedLineNumber(null);
              setSelectedStop(null);
            }}
          />
          <View {...panResponder.panHandlers} style={styles.dragHandleZone}>
            <View style={styles.dragHandlePill} />
          </View>
          <TouchableOpacity
            style={styles.sheetSideDeselectArea}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedLineNumber(null);
              setSelectedStop(null);
            }}
          />
        </View>

        {/* BARRA DE PESQUISA EM CÁPSULA */}
        <View style={styles.searchCapsuleContainer}>
          <View
            style={[
              styles.searchCapsule,
              isSearchFocused && styles.searchCapsuleFocused,
            ]}
          >
            <Feather name="search" size={20} color="#FFFFFF" style={{ marginRight: SPACING.sm }} />
            <TextInput
              style={styles.searchCapsuleInput}
              placeholder="Para onde você vai hoje?"
              placeholderTextColor="#949BA4"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: SPACING.xs }}>
                <Feather name="x" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* INDICADOR DO PONTO CLICADO OU MODO EXPLORAÇÃO (TOCÁVEL PARA DESELECIONAR) */}
        <TouchableOpacity
          activeOpacity={selectedStop ? 0.7 : 1}
          style={styles.nearestStopBadgeRow}
          onPress={() => {
            if (selectedStop) {
              setSelectedStop(null);
              setSelectedLineNumber(null);
            }
          }}
        >
          <MaterialCommunityIcons
            name={selectedStop ? 'bus-stop' : 'map-search-outline'}
            size={15}
            color="#38BDF8"
          />
          <Text style={styles.nearestStopBadgeText} numberOfLines={1}>
            {selectedStop ? (
              <>
                Linhas no ponto: <Text style={{ fontWeight: 'bold', color: '#F2F3F5' }}>{selectedStop.name}</Text> ({distanceToStop || 0}m de você)
              </>
            ) : (
              'Linhas próximas da sua região (Toque em um ponto no mapa):'
            )}
          </Text>
          {selectedStop && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  toggleFavoriteStop(selectedStop);
                }}
                style={{ paddingHorizontal: 6 }}
              >
                <Ionicons
                  name={favoriteStops.some((s) => s.id === selectedStop.id) ? 'star' : 'star-outline'}
                  size={16}
                  color={favoriteStops.some((s) => s.id === selectedStop.id) ? '#F59E0B' : '#949BA4'}
                />
              </TouchableOpacity>
              <Feather name="x" size={14} color="#949BA4" style={{ marginLeft: 4 }} />
            </View>
          )}
        </TouchableOpacity>

        {/* BANNERS DAS LINHAS QUE PASSAM NO PONTO CLICADO */}
        <ScrollView
          ref={linesScrollRef}
          style={styles.bannersScroll}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredLines.map((line) => {
            const isSelected = line.number === selectedLineNumber;
            const subColor = line.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';

            return (
              <TouchableOpacity
                key={line.number}
                activeOpacity={0.9}
                style={[
                  styles.transitBanner,
                  { backgroundColor: line.bgColor },
                  isSelected && styles.transitBannerSelected,
                ]}
                onPress={() => {
                  // FORMA 1: Se clicar de novo no botão selecionado, deseleciona e não seleciona nada
                  if (selectedLineNumber === line.number) {
                    setSelectedLineNumber(null);
                  } else {
                    setSelectedLineNumber(line.number);
                  }
                }}
              >
                {/* COLUNA ESQUERDA: Número da Linha + Destino */}
                <View style={styles.colLeft}>
                  <Text style={[styles.lineNumberText, { color: line.textColor }]}>
                    {line.number}
                  </Text>
                  <Text style={[styles.destinationText, { color: line.textColor }]} numberOfLines={1}>
                    {line.name}
                  </Text>
                  <Text style={[styles.viaText, { color: subColor }]} numberOfLines={1}>
                    {line.via}
                  </Text>
                </View>

                {/* COLUNA DIREITA: ETA + Dois Arcos + "min" */}
                <View style={styles.colRight}>
                  <Text style={[styles.etaNumber, { color: line.textColor }]}>
                    {line.eta}
                  </Text>
                  <View style={styles.arcsOverlay}>
                    <View style={[styles.arcS, { borderColor: line.textColor }]} />
                    <View style={[styles.arcL, { borderColor: line.textColor }]} />
                  </View>
                  <Text style={[styles.etaUnitText, { color: line.textColor }]}>
                    {line.unit}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* PAINEL DE AÇÃO E TELEMETRIA DA LINHA SELECIONADA */}
          {selectedLine && (
            <View style={styles.actionCard}>
              <View style={styles.actionHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.actionTitle}>Linha {selectedLine.number} em Monitoramento</Text>
                  <Text style={styles.actionSubtitle}>{selectedLine.name}</Text>
                  <View style={styles.telemetryMiniRow}>
                    <MaterialCommunityIcons name="bus-marker" size={14} color="#38BDF8" />
                    <Text style={styles.telemetryMiniText}>
                      {lineBusesCount > 0 ? `${lineBusesCount} ônibus ativos com GPS no mapa` : 'Frota sincronizando GPS'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.colorIndicator, { backgroundColor: selectedLine.bgColor }]} />
              </View>

              {/* Ponto de Desembarque Selecionado */}
              <View style={styles.stopInfoBox}>
                <MaterialCommunityIcons name="map-marker-radius" size={18} color="#38BDF8" />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.stopInfoLabel}>Destino / Ponto de Desembarque:</Text>
                  <Text style={styles.stopInfoName} numberOfLines={1}>
                    {selectedStop ? `${selectedStop.name} (${selectedStop.neighborhood || 'RJ'})` : 'Toque em uma parada no mapa'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.alertActionButton,
                  alertActive ? styles.alertBtnActive : styles.alertBtnInactive,
                ]}
                activeOpacity={0.85}
                onPress={() => setAlertActive(!alertActive)}
              >
                <Ionicons
                  name={alertActive ? 'notifications-off' : 'notifications'}
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.alertActionText}>
                  {alertActive
                    ? 'Cancelar Alerta de Desembarque'
                    : `Ativar Alerta ao Aproximar (${alertSettings.radius}m)`}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </Animated.View>

      {/* MODAL DE PERFIL, CONFIGURAÇÕES E FEEDBACK DA COMUNIDADE */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        selectedStop={selectedStop}
        selectedLineNumber={selectedLineNumber}
        userCoords={userLocation}
        favoriteStops={favoriteStops}
        favoriteLines={favoriteLines}
        onSelectFavoriteStop={(stop) => {
          setSelectedStop(stop);
          const stopLines = (stop as any).lines;
          if (selectedLineNumber && stopLines && !stopLines.includes(selectedLineNumber)) {
            setSelectedLineNumber(null);
          }
        }}
        onSelectFavoriteLine={(lineNum) => {
          setSelectedLineNumber(lineNum);
        }}
        onRemoveFavoriteStop={(stopId) => {
          setFavoriteStops((prev) => prev.filter((s) => s.id !== stopId));
        }}
        onRemoveFavoriteLine={(lineNum) => {
          setFavoriteLines((prev) => prev.filter((l) => l !== lineNum));
        }}
        alertSettings={alertSettings}
        onChangeAlertSettings={setAlertSettings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F22',
    position: 'relative',
    overflow: 'hidden',
  },

  /* ============================== */
  /* 1. Camada do Mapa              */
  /* ============================== */
  fullscreenMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E1F22',
    zIndex: 1,
  },
  profileFloatingBtn: {
    position: 'absolute',
    top: 24,
    left: SPACING.base,
    zIndex: 10,
  },
  profileIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2B2D31',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  gearBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recenterFloatingBtn: {
    position: 'absolute',
    top: 24,
    right: SPACING.base,
    zIndex: 10,
  },
  recenterIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2B2D31',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  activeAlertBanner: {
    position: 'absolute',
    top: 80,
    left: SPACING.base,
    right: SPACING.base,
    backgroundColor: 'rgba(43, 45, 49, 0.96)',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    borderRadius: RADII.card,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  activeAlertBannerTriggered: {
    borderColor: '#ED4245',
    backgroundColor: 'rgba(237, 66, 69, 0.25)',
  },
  activeAlertTitle: {
    color: '#F2F3F5',
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeAlertSubtitle: {
    color: '#949BA4',
    fontSize: 11,
    marginTop: 2,
  },

  /* ============================== */
  /* 2. Painel de Busca & Banners   */
  /* ============================== */
  bottomSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2B2D31',
    borderTopLeftRadius: RADII.sheet,
    borderTopRightRadius: RADII.sheet,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 100,
  },
  dragHandleZoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHTS.dragHandle,
    paddingHorizontal: 8,
  },
  sheetSideDeselectArea: {
    flex: 1,
    height: HEIGHTS.dragHandle,
  },
  dragHandleZone: {
    alignItems: 'center',
    height: HEIGHTS.dragHandle,
    justifyContent: 'center',
    width: 90,
  },
  dragHandlePill: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#4E5058',
  },

  /* --- Barra de Pesquisa --- */
  searchCapsuleContainer: {
    paddingHorizontal: COLUMNS.gutter,
    paddingBottom: SPACING.sm,
  },
  nearestStopBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: COLUMNS.gutter,
    marginBottom: SPACING.xs,
    gap: 6,
  },
  nearestStopBadgeText: {
    color: '#949BA4',
    fontSize: 11,
    fontWeight: '500',
  },
  searchCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1F22',
    borderRadius: RADII.pill,
    height: HEIGHTS.searchCapsule,
    paddingHorizontal: SPACING.base,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  searchCapsuleFocused: {
    borderColor: 'rgba(255, 255, 255, 0.65)',
    backgroundColor: '#18191C',
  },
  searchCapsuleInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },

  /* --- Cartões dos Pontos Próximos --- */
  stopItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313338',
    borderRadius: RADII.card,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  stopItemCardSelected: {
    borderColor: '#38BDF8',
    backgroundColor: '#383A40',
  },
  stopIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E1F22',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  stopCardTitle: {
    color: '#F2F3F5',
    fontSize: 13,
    fontWeight: '700',
  },
  stopCardSubtitle: {
    color: '#949BA4',
    fontSize: 11,
    marginTop: 2,
  },
  distanceBadgeContainer: {
    backgroundColor: '#1E1F22',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  distanceBadgeText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bannersScroll: {
    paddingHorizontal: COLUMNS.gutter,
    paddingTop: SPACING.xs,
  },
  transitBanner: {
    flexDirection: 'row',
    height: HEIGHTS.transitBanner,
    borderRadius: RADII.card,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.base,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  transitBannerSelected: {
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.01 }],
  },
  colLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: SPACING.md,
  },
  lineNumberText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  destinationText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
  },
  viaText: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  colRight: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  etaNumber: {
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 28,
  },
  arcsOverlay: {
    position: 'absolute',
    top: -2,
    right: 6,
  },
  arcS: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderRadius: 4,
    marginBottom: 1,
  },
  arcL: {
    width: 14,
    height: 14,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderRadius: 7,
    marginTop: -4,
  },
  etaUnitText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 1,
  },

  /* --- Cartão de Ação e Telemetria --- */
  actionCard: {
    backgroundColor: '#313338',
    borderRadius: RADII.card,
    padding: SPACING.base,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  actionTitle: {
    color: '#F2F3F5',
    fontSize: 14,
    fontWeight: '700',
  },
  actionSubtitle: {
    color: '#949BA4',
    fontSize: 12,
    marginTop: 2,
  },
  telemetryMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  telemetryMiniText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  stopInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1F22',
    padding: SPACING.md,
    borderRadius: RADII.card,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  stopInfoLabel: {
    color: '#949BA4',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  stopInfoName: {
    color: '#F2F3F5',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  alertActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: RADII.pill,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  alertBtnInactive: {
    backgroundColor: '#383A40',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  alertBtnActive: {
    backgroundColor: '#059669',
    borderWidth: 1,
    borderColor: '#34D399',
  },
  alertActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
