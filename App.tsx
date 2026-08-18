import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { THEME } from './src/config/theme';

// Lista de Pontos Reais do Rio de Janeiro
const RIO_STOPS = [
  { id: 'STOP_474_01', nome: 'Central do Brasil', bairro: 'Centro', x: 48, y: 32, lines: ['474', '309', '315'] },
  { id: 'STOP_474_02', nome: 'Praça da República', bairro: 'Centro', x: 42, y: 36, lines: ['474'] },
  { id: 'STOP_474_03', nome: 'Candelária', bairro: 'Centro', x: 58, y: 28, lines: ['474'] },
  { id: 'STOP_474_05', nome: 'Metrô Catete', bairro: 'Catete', x: 52, y: 52, lines: ['474'] },
  { id: 'STOP_474_06', nome: 'Praia do Flamengo', bairro: 'Flamengo', x: 60, y: 60, lines: ['474'] },
  { id: 'STOP_474_08', nome: 'Copacabana (Siqueira Campos)', bairro: 'Copacabana', x: 68, y: 78, lines: ['474', '483'] },
  { id: 'STOP_474_09', nome: 'N. Sra. da Paz', bairro: 'Ipanema', x: 62, y: 88, lines: ['474', '483'] },
  { id: 'STOP_606_03', nome: 'Praça Saens Peña', bairro: 'Tijuca', x: 28, y: 44, lines: ['606', '457'] },
  { id: 'STOP_309_01', nome: 'Terminal Alvorada', bairro: 'Barra da Tijuca', x: 18, y: 84, lines: ['309', '315'] },
];

const BUS_LINES_INFO: Record<string, { name: string; eta: string; speed: string; route: string }> = {
  '474': { name: 'Jacaré x Jardim de Alah', eta: '4 min', speed: '28 km/h', route: 'Via Copacabana / Lapa' },
  '309': { name: 'Central x Alvorada', eta: '8 min', speed: '34 km/h', route: 'Via Botafogo / Barra' },
  '315': { name: 'Central x Recreio', eta: '12 min', speed: '42 km/h', route: 'Via Linha Amarela' },
  '483': { name: 'Penha x General Osório', eta: '6 min', speed: '22 km/h', route: 'Via Linha Vermelha' },
  '606': { name: 'Rodoviária x Engenho de Dentro', eta: '5 min', speed: '24 km/h', route: 'Via Tijuca / Maracanã' },
  '457': { name: 'Abolição x Copacabana', eta: '9 min', speed: '20 km/h', route: 'Via Túnel Rebouças' },
};

type SnapPosition = 'collapsed' | 'half' | 'expanded';

export default function App() {
  const [selectedStopId, setSelectedStopId] = useState<string>('STOP_474_01');
  const [sheetPosition, setSheetPosition] = useState<SnapPosition>('half');
  const [alertActive, setAlertActive] = useState<boolean>(false);

  const selectedStop = RIO_STOPS.find((s) => s.id === selectedStopId) || RIO_STOPS[0];

  // Cálculo de altura dinâmica para o Snap da metade da tela
  const getSheetHeight = () => {
    switch (sheetPosition) {
      case 'collapsed':
        return '25%';
      case 'half':
        return '52%';
      case 'expanded':
        return '82%';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: THEME.bg }]}>
      <StatusBar style="light" />

      {/* ============================================================ */}
      {/* 1. METADE SUPERIOR: MAPA INTERATIVO DO RIO DE JANEIRO       */}
      {/* ============================================================ */}
      <View style={styles.mapContainer}>
        {/* Fundo do Mapa com Grade Urbana */}
        <View style={styles.mapGrid}>
          {/* Linhas de Trânsito Simuladas no Mapa */}
          <View style={styles.mapTransitPath1} />
          <View style={styles.mapTransitPath2} />

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
                  if (sheetPosition === 'collapsed') setSheetPosition('half');
                }}
              >
                <View
                  style={[
                    styles.mapPinInner,
                    { backgroundColor: isSelected ? THEME.primary : '#3F3F46' },
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
          <View style={[styles.liveBusMarker, { left: '50%', top: '42%' }]}>
            <View style={styles.liveBusPulse} />
            <Text style={styles.liveBusIcon}>🚌</Text>
            <View style={styles.liveBusBadge}>
              <Text style={styles.liveBusBadgeText}>474 • 28km/h</Text>
            </View>
          </View>
        </View>

        {/* Header Flutuante sobre o Mapa */}
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
      {/* 2. METADE INFERIOR: PAINEL DESLIZANTE COM SNAP (BOTTOM SHEET)*/}
      {/* ============================================================ */}
      <View
        style={[
          styles.bottomSheet,
          {
            height: getSheetHeight(),
            backgroundColor: THEME.card,
            borderColor: THEME.border,
          },
        ]}
      >
        {/* Barra de Alça e Controle de Snap (Puxador) */}
        <View style={styles.dragHandleContainer}>
          <View style={styles.dragHandlePill} />
          {/* Botões Rápidos de Snap (Recolhido / Metade 50% / Expandido) */}
          <View style={styles.snapButtonsRow}>
            <TouchableOpacity
              style={[
                styles.snapBtn,
                sheetPosition === 'collapsed' && styles.snapBtnActive,
              ]}
              onPress={() => setSheetPosition('collapsed')}
            >
              <Text style={styles.snapBtnText}>Recolher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.snapBtn,
                sheetPosition === 'half' && styles.snapBtnActive,
              ]}
              onPress={() => setSheetPosition('half')}
            >
              <Text style={styles.snapBtnText}>Metade (50%)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.snapBtn,
                sheetPosition === 'expanded' && styles.snapBtnActive,
              ]}
              onPress={() => setSheetPosition('expanded')}
            >
              <Text style={styles.snapBtnText}>Expandir</Text>
            </TouchableOpacity>
          </View>
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
                {alertActive ? '🔔 Alerta Ativo (300m)' : '🔕 Ativar Alerta'}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* --- 1. Mapa Interativo (Metade Superior) --- */
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#07090E',
  },
  mapGrid: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapTransitPath1: {
    position: 'absolute',
    left: '20%',
    top: '30%',
    width: '60%',
    height: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    transform: [{ rotate: '45deg' }],
  },
  mapTransitPath2: {
    position: 'absolute',
    left: '10%',
    top: '70%',
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.25)',
    transform: [{ rotate: '-20deg' }],
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
    backgroundColor: 'rgba(20, 20, 32, 0.85)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
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

  /* --- 2. Painel Deslizante (Metade Inferior) --- */
  bottomSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  dragHandlePill: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#3F3F46',
    marginBottom: 8,
  },
  snapButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  snapBtn: {
    backgroundColor: '#1C1C2D',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  snapBtnActive: {
    backgroundColor: '#6366F1',
  },
  snapBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
    paddingBottom: 30,
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
