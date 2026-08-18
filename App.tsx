import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from './src/config/theme';

// Lista de Pontos Reais do Rio de Janeiro
const RIO_STOPS = [
  { id: 'STOP_474_01', nome: 'Central do Brasil', bairro: 'Centro', x: 48, y: 22, lines: ['474', '309', '315'] },
  { id: 'STOP_474_02', nome: 'Praça da República', bairro: 'Centro', x: 42, y: 28, lines: ['474'] },
  { id: 'STOP_474_03', nome: 'Candelária', bairro: 'Centro', x: 58, y: 18, lines: ['474'] },
  { id: 'STOP_474_05', nome: 'Metrô Catete', bairro: 'Catete', x: 52, y: 40, lines: ['474'] },
  { id: 'STOP_474_06', nome: 'Praia do Flamengo', bairro: 'Flamengo', x: 60, y: 48, lines: ['474'] },
  { id: 'STOP_474_08', nome: 'Copacabana (Siqueira Campos)', bairro: 'Copacabana', x: 68, y: 62, lines: ['474', '483'] },
  { id: 'STOP_474_09', nome: 'N. Sra. da Paz', bairro: 'Ipanema', x: 62, y: 72, lines: ['474', '483'] },
  { id: 'STOP_606_03', nome: 'Praça Saens Peña', bairro: 'Tijuca', x: 28, y: 34, lines: ['606', '457'] },
  { id: 'STOP_309_01', nome: 'Terminal Alvorada', bairro: 'Barra da Tijuca', x: 18, y: 68, lines: ['309', '315'] },
];

const BUS_LINES_INFO: Record<string, { name: string; eta: string; speed: string; route: string }> = {
  '474': { name: 'Jacaré x Jardim de Alah', eta: '4 min', speed: '28 km/h', route: 'Via Copacabana / Lapa' },
  '309': { name: 'Central x Alvorada', eta: '8 min', speed: '34 km/h', route: 'Via Botafogo / Barra' },
  '315': { name: 'Central x Recreio', eta: '12 min', speed: '42 km/h', route: 'Via Linha Amarela' },
  '483': { name: 'Penha x General Osório', eta: '6 min', speed: '22 km/h', route: 'Via Linha Vermelha' },
  '606': { name: 'Rodoviária x Engenho de Dentro', eta: '5 min', speed: '24 km/h', route: 'Via Tijuca / Maracanã' },
  '457': { name: 'Abolição x Copacabana', eta: '9 min', speed: '20 km/h', route: 'Via Túnel Rebouças' },
};

const SCREEN_HEIGHT = Dimensions.get('window').height || 700;
const SNAP_EXPANDED = SCREEN_HEIGHT * 0.85;
const SNAP_HALF = SCREEN_HEIGHT * 0.50;
const SNAP_COLLAPSED = SCREEN_HEIGHT * 0.20;

export default function App() {
  const [selectedStopId, setSelectedStopId] = useState<string>('STOP_474_01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Valor animado da altura do Bottom Sheet
  const sheetHeight = useRef(new Animated.Value(SNAP_HALF)).current;
  const currentHeightRef = useRef(SNAP_HALF);

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
        } else {
          targetSnap = SNAP_HALF;
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

  const selectedStop = RIO_STOPS.find((s) => s.id === selectedStopId) || RIO_STOPS[0];

  // Filtro de Pontos em Tempo Real pela Barra de Pesquisa
  const filteredStops = RIO_STOPS.filter((stop) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      stop.nome.toLowerCase().includes(query) ||
      stop.bairro.toLowerCase().includes(query) ||
      stop.lines.some((l) => l.includes(query))
    );
  });

  function snapTo(height: number) {
    currentHeightRef.current = height;
    Animated.spring(sheetHeight, {
      toValue: height,
      useNativeDriver: false,
      friction: 8,
      tension: 50,
    }).start();
  }

  function handleSelectStopFromSearch(stopId: string) {
    setSelectedStopId(stopId);
    setSearchQuery('');
    if (currentHeightRef.current === SNAP_COLLAPSED) {
      snapTo(SNAP_HALF);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ============================================================ */}
      {/* CAMADA DO MAPA (FUNDO FIXO 100%)                             */}
      {/* ============================================================ */}
      <View style={styles.fullscreenMap}>
        <View style={styles.mapGrid}>
          <View style={styles.mapTransitPath1} />
          <View style={styles.mapTransitPath2} />
          <View style={styles.mapTransitPath3} />

          {/* Marcadores dos Pontos no Mapa (Ícones Vetoriais) */}
          {RIO_STOPS.map((stop) => {
            const isSelected = stop.id === selectedStopId;
            return (
              <TouchableOpacity
                key={stop.id}
                style={[
                  styles.mapPin,
                  { left: `${stop.x}%`, top: `${stop.y}%` },
                  isSelected && styles.mapPinActive,
                ]}
                onPress={() => {
                  setSelectedStopId(stop.id);
                  if (currentHeightRef.current === SNAP_COLLAPSED) {
                    snapTo(SNAP_HALF);
                  }
                }}
              >
                <View
                  style={[
                    styles.mapPinInner,
                    {
                      backgroundColor: isSelected ? THEME.primary : '#1F2937',
                      borderColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="bus-stop"
                    size={16}
                    color={isSelected ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
                {isSelected && (
                  <View style={styles.mapCallout}>
                    <Text style={styles.mapCalloutText}>{stop.nome}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Veículo com Telemetria Ativa (Ícone Vetorial com Pulso) */}
          <View style={[styles.liveBusMarker, { left: '50%', top: '32%' }]}>
            <View style={styles.liveBusPulse} />
            <View style={styles.liveBusIconCircle}>
              <Ionicons name="bus" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.liveBusBadge}>
              <Text style={styles.liveBusBadgeText}>474 • 28 km/h</Text>
            </View>
          </View>
        </View>

        {/* Header do App Flutuante no Topo da Tela */}
        <View style={styles.floatingHeader}>
          <View>
            <Text style={styles.appTitle}>Rio Bus Alert</Text>
            <Text style={styles.appSubtitle}>Mobilidade Urbana do Rio</Text>
          </View>
          <View style={styles.gpsLiveBadge}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsLiveText}>GPS Ao Vivo</Text>
          </View>
        </View>
      </View>

      {/* ============================================================ */}
      {/* PAINEL DE BUSCA (CAMADA DE SOBREPOSIÇÃO FLUTUANTE)           */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.bottomSheetOverlay,
          {
            height: sheetHeight,
            backgroundColor: THEME.card,
            borderColor: THEME.border,
          },
        ]}
      >
        {/* 1. Alça de Arrasto */}
        <View {...panResponder.panHandlers} style={styles.dragHandleZone}>
          <View style={styles.dragHandlePill} />
        </View>

        {/* 2. BARRA DE PESQUISA PRIORITÁRIA (Ícone Vetorial de Lupa) */}
        <View style={styles.searchBarContainer}>
          <View
            style={[
              styles.searchInputWrapper,
              isSearchFocused && styles.searchInputWrapperFocused,
            ]}
          >
            <Feather name="search" size={16} color={isSearchFocused ? THEME.primary : THEME.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Para onde você quer ir? (ex: Copacabana, 474...)"
              placeholderTextColor={THEME.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => {
                setIsSearchFocused(true);
                if (currentHeightRef.current !== SNAP_EXPANDED) {
                  snapTo(SNAP_EXPANDED);
                }
              }}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                <Feather name="x" size={16} color={THEME.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. CONTEÚDO DINÂMICO DO PAINEL */}
        <ScrollView
          style={styles.sheetScroll}
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Se houver busca: exibe resultados filtrados */}
          {searchQuery.trim().length > 0 ? (
            <View>
              <Text style={styles.sectionHeaderLabel}>
                Resultados da Busca ({filteredStops.length}):
              </Text>
              {filteredStops.map((stop) => (
                <TouchableOpacity
                  key={stop.id}
                  style={styles.searchResultItem}
                  onPress={() => handleSelectStopFromSearch(stop.id)}
                >
                  <View style={styles.searchResultPinIcon}>
                    <MaterialCommunityIcons name="bus-stop" size={18} color={THEME.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.searchResultName}>{stop.nome}</Text>
                    <Text style={styles.searchResultNeighborhood}>
                      {stop.bairro} • Linhas: {stop.lines.join(', ')}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={18} color={THEME.primary} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <>
              {/* CARTÃO DO PONTO SELECIONADO ATIVO */}
              <View style={styles.stopInfoCard}>
                <View style={styles.stopHeaderRow}>
                  <View>
                    <Text style={styles.stopNeighborhoodTag}>{selectedStop.bairro.toUpperCase()}</Text>
                    <Text style={styles.stopNameSelected}>{selectedStop.nome}</Text>
                  </View>
                  <MaterialCommunityIcons name="bus-stop" size={24} color={THEME.primary} />
                </View>

                {/* Botão de Alerta de Desembarque (Ícone Vetorial de Notificação) */}
                <TouchableOpacity
                  style={[
                    styles.alertToggleBtn,
                    alertActive ? styles.alertToggleBtnActive : styles.alertToggleBtnInactive,
                  ]}
                  onPress={() => setAlertActive(!alertActive)}
                >
                  <Ionicons
                    name={alertActive ? 'notifications' : 'notifications-outline'}
                    size={16}
                    color="#FFFFFF"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.alertToggleText}>
                    {alertActive ? 'Alerta Ativo (300m)' : 'Ativar Alerta de Desembarque'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* LISTA DE LINHAS NO ESTILO TRANSIT APP */}
              <Text style={styles.linesSectionTitle}>
                Linhas que passam neste ponto ({selectedStop.lines.length}):
              </Text>

              {selectedStop.lines.map((lineNum) => {
                const lineData = BUS_LINES_INFO[lineNum] || {
                  name: 'Linha Municipal do Rio',
                  eta: '5 min',
                  speed: '25 km/h',
                  route: 'Itinerário Regular',
                };

                return (
                  <View key={lineNum} style={styles.busLineCard}>
                    <View style={styles.lineBadge}>
                      <Text style={styles.lineBadgeNumber}>{lineNum}</Text>
                    </View>
                    <View style={styles.lineDetails}>
                      <Text style={styles.lineDestination}>{lineData.name}</Text>
                      <Text style={styles.lineRouteDesc}>{lineData.route}</Text>
                    </View>
                    <View style={styles.lineEtaContainer}>
                      <Text style={styles.lineEtaTime}>{lineData.eta}</Text>
                      <Text style={styles.lineSpeedText}>{lineData.speed}</Text>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090E',
    position: 'relative',
  },

  /* --- 1. Camada do Mapa --- */
  fullscreenMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#07090E',
    zIndex: 1,
  },
  mapGrid: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapTransitPath1: {
    position: 'absolute',
    left: '20%',
    top: '20%',
    width: '60%',
    height: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.35)',
    transform: [{ rotate: '45deg' }],
  },
  mapTransitPath2: {
    position: 'absolute',
    left: '10%',
    top: '55%',
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.25)',
    transform: [{ rotate: '-20deg' }],
  },
  mapTransitPath3: {
    position: 'absolute',
    left: '40%',
    top: '40%',
    width: '50%',
    height: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    transform: [{ rotate: '80deg' }],
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  mapPinActive: {
    zIndex: 99,
  },
  mapPinInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  mapCallout: {
    backgroundColor: '#141420',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6366F1',
    marginTop: 4,
  },
  mapCalloutText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  liveBusMarker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 90,
  },
  liveBusPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.35)',
    top: -4,
  },
  liveBusIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  liveBusBadge: {
    backgroundColor: '#312E81',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 3,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  liveBusBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 32, 0.90)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    zIndex: 10,
  },
  appTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#A1A1AA',
  },
  gpsLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 5,
  },
  gpsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  gpsLiveText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: 'bold',
  },

  /* --- 2. Painel de Busca --- */
  bottomSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    zIndex: 100,
  },
  dragHandleZone: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    cursor: 'grab',
  },
  dragHandlePill: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#71717A',
  },

  /* --- Barra de Pesquisa --- */
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0F',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  searchInputWrapperFocused: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    outlineStyle: 'none',
  } as any,
  clearSearchBtn: {
    padding: 4,
  },

  /* --- Conteúdo do Painel --- */
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeaderLabel: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C2D',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchResultPinIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1E1E30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  searchResultName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchResultNeighborhood: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },

  /* --- Cartão do Ponto --- */
  stopInfoCard: {
    backgroundColor: '#1C1C2D',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    marginBottom: 16,
  },
  stopHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stopNeighborhoodTag: {
    color: '#6366F1',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  stopNameSelected: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  alertToggleBtn: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertToggleBtnInactive: {
    backgroundColor: '#312E81',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  alertToggleBtnActive: {
    backgroundColor: '#BE185D',
    borderWidth: 1,
    borderColor: '#EC4899',
  },
  alertToggleText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  linesSectionTitle: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  busLineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C2D',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  lineBadge: {
    backgroundColor: '#6366F1',
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lineBadgeNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineDetails: {
    flex: 1,
  },
  lineDestination: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lineRouteDesc: {
    color: '#71717A',
    fontSize: 12,
    marginTop: 2,
  },
  lineEtaContainer: {
    alignItems: 'flex-end',
  },
  lineEtaTime: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: 'bold',
  },
  lineSpeedText: {
    color: '#71717A',
    fontSize: 11,
    marginTop: 2,
  },
});
