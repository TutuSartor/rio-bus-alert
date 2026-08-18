import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
const SNAP_EXPANDED = SCREEN_HEIGHT * 0.82;
const SNAP_HALF = SCREEN_HEIGHT * 0.48;
const SNAP_COLLAPSED = SCREEN_HEIGHT * 0.18;

export default function App() {
  const [selectedStopId, setSelectedStopId] = useState<string>('STOP_474_01');
  const [alertActive, setAlertActive] = useState<boolean>(false);

  // Valor animado da altura do Bottom Sheet
  const sheetHeight = useRef(new Animated.Value(SNAP_HALF)).current;
  const currentHeightRef = useRef(SNAP_HALF);

  // PanResponder para captura de gestos de arrasto com mouse ou dedo
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

  function snapTo(height: number) {
    currentHeightRef.current = height;
    Animated.spring(sheetHeight, {
      toValue: height,
      useNativeDriver: false,
      friction: 8,
      tension: 50,
    }).start();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ============================================================ */}
      {/* CAMADA 1 (FUNDO): MAPA EM TELA CHEIA FIXO (NUNCA REDIMENSIONA)*/}
      {/* ============================================================ */}
      <View style={styles.fullscreenMap}>
        {/* Grade e Traçados Espaciais do Rio de Janeiro */}
        <View style={styles.mapGrid}>
          <View style={styles.mapTransitPath1} />
          <View style={styles.mapTransitPath2} />
          <View style={styles.mapTransitPath3} />

          {/* Marcadores dos Pontos de Ônibus no Mapa */}
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
                    { backgroundColor: isSelected ? THEME.primary : '#27272A' },
                  ]}
                >
                  <Text style={styles.mapPinIcon}>🚏</Text>
                </View>
                {isSelected && (
                  <View style={styles.mapCallout}>
                    <Text style={styles.mapCalloutText}>{stop.nome}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Veículo em Tempo Real com Pulso */}
          <View style={[styles.liveBusMarker, { left: '50%', top: '32%' }]}>
            <View style={styles.liveBusPulse} />
            <Text style={styles.liveBusIcon}>🚌</Text>
            <View style={styles.liveBusBadge}>
              <Text style={styles.liveBusBadgeText}>474 • 28km/h</Text>
            </View>
          </View>
        </View>

        {/* Header Flutuante sobre o Mapa (Fixo no topo da Camada 1) */}
        <View style={styles.floatingHeader}>
          <View>
            <Text style={styles.appTitle}>Rio Bus Alert</Text>
            <Text style={styles.appSubtitle}>Clique em um ponto no mapa</Text>
          </View>
          <View style={styles.gpsLiveBadge}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsLiveText}>GPS Ao Vivo</Text>
          </View>
        </View>
      </View>

      {/* ============================================================ */}
      {/* CAMADA 2 (SOBREPOSIÇÃO): PAINEL DESLIZANTE QUE COBRE O MAPA  */}
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
        {/* Barra de Alça de Arrasto Limpa e Minimalista (Sem textos desnecessários) */}
        <View {...panResponder.panHandlers} style={styles.dragHandleZone}>
          <View style={styles.dragHandlePill} />
        </View>

        {/* Conteúdo das Informações do Ponto Selecionado */}
        <ScrollView
          style={styles.sheetScroll}
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cabeçalho do Ponto de Ônibus Selecionado */}
          <View style={styles.stopInfoCard}>
            <View>
              <Text style={styles.stopNeighborhoodTag}>{selectedStop.bairro.toUpperCase()}</Text>
              <Text style={styles.stopNameSelected}>{selectedStop.nome}</Text>
            </View>

            {/* Botão de Alerta de Desembarque */}
            <TouchableOpacity
              style={[
                styles.alertToggleBtn,
                alertActive ? styles.alertToggleBtnActive : styles.alertToggleBtnInactive,
              ]}
              onPress={() => setAlertActive(!alertActive)}
            >
              <Text style={styles.alertToggleText}>
                {alertActive ? '🔔 Alerta Ativo (300m)' : '🔕 Ativar Alerta de Desembarque'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Linhas que passam neste Ponto */}
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
                {/* Badge com o Número da Linha */}
                <View style={styles.lineBadge}>
                  <Text style={styles.lineBadgeNumber}>{lineNum}</Text>
                </View>

                {/* Detalhes do Percurso */}
                <View style={styles.lineDetails}>
                  <Text style={styles.lineDestination}>{lineData.name}</Text>
                  <Text style={styles.lineRouteDesc}>{lineData.route}</Text>
                </View>

                {/* Estimativa de Tempo (ETA) */}
                <View style={styles.lineEtaContainer}>
                  <Text style={styles.lineEtaTime}>{lineData.eta}</Text>
                  <Text style={styles.lineSpeedText}>{lineData.speed}</Text>
                </View>
              </View>
            );
          })}
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

  /* --- CAMADA 1: Mapa em Tela Cheia Fixo (100% de Altura e Largura) --- */
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
    borderColor: '#FFFFFF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  mapPinIcon: {
    fontSize: 14,
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
    top: -6,
  },
  liveBusIcon: {
    fontSize: 22,
  },
  liveBusBadge: {
    backgroundColor: '#312E81',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 2,
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

  /* --- CAMADA 2: Painel Deslizante em Sobreposição (Overlay) --- */
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
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    cursor: 'grab',
  },
  dragHandlePill: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#71717A',
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
    paddingBottom: 40,
  },
  stopInfoCard: {
    backgroundColor: '#1C1C2D',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    marginBottom: 16,
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
    marginBottom: 12,
  },
  alertToggleBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
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
