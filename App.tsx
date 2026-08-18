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
import { SPACING, COLUMNS, HEIGHTS, RADII } from './src/config/grid';

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

// Pontos Reais do Rio de Janeiro
const RIO_STOPS = [
  { id: 'STOP_474_01', nome: 'Central do Brasil', bairro: 'Centro', x: 48, y: 22 },
  { id: 'STOP_474_02', nome: 'Praça da República', bairro: 'Centro', x: 42, y: 28 },
  { id: 'STOP_474_03', nome: 'Candelária', bairro: 'Centro', x: 58, y: 18 },
  { id: 'STOP_474_05', nome: 'Metrô Catete', bairro: 'Catete', x: 52, y: 40 },
  { id: 'STOP_474_06', nome: 'Praia do Flamengo', bairro: 'Flamengo', x: 60, y: 48 },
  { id: 'STOP_474_08', nome: 'Copacabana', bairro: 'Copacabana', x: 68, y: 62 },
  { id: 'STOP_474_09', nome: 'N. Sra. da Paz', bairro: 'Ipanema', x: 62, y: 72 },
  { id: 'STOP_606_03', nome: 'Praça Saens Peña', bairro: 'Tijuca', x: 28, y: 34 },
  { id: 'STOP_309_01', nome: 'Terminal Alvorada', bairro: 'Barra da Tijuca', x: 18, y: 68 },
];

const SCREEN_HEIGHT = Dimensions.get('window').height || 700;
const SNAP_EXPANDED = SCREEN_HEIGHT * 0.88;
const SNAP_HALF = SCREEN_HEIGHT * 0.54;
const SNAP_COLLAPSED = SCREEN_HEIGHT * 0.22;

export default function App() {
  const [selectedLineNumber, setSelectedLineNumber] = useState<string>('474');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

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

  const selectedLine = NEARBY_TRANSIT_LINES.find((l) => l.number === selectedLineNumber) || NEARBY_TRANSIT_LINES[0];

  function snapTo(height: number) {
    currentHeightRef.current = height;
    Animated.spring(sheetHeight, {
      toValue: height,
      useNativeDriver: false,
      friction: 8,
      tension: 50,
    }).start();
  }

  const filteredLines = NEARBY_TRANSIT_LINES.filter((line) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      line.number.toLowerCase().includes(query) ||
      line.name.toLowerCase().includes(query) ||
      line.via.toLowerCase().includes(query)
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ============================================================ */}
      {/* CAMADA 1: MAPA EM TELA CHEIA FIXO                            */}
      {/* ============================================================ */}
      <View style={styles.fullscreenMap}>
        <View style={styles.mapGrid}>
          <View style={styles.mapTransitPathBlue} />
          <View style={styles.mapTransitPathGreen} />
          <View style={styles.mapTransitPathRed} />

          {RIO_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.id}
              style={[styles.mapPin, { left: `${stop.x}%`, top: `${stop.y}%` }]}
            >
              <View style={styles.mapPinCircle}>
                <MaterialCommunityIcons name="bus-stop" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}

          <View style={[styles.userLocationMarker, { left: '50%', top: '34%' }]}>
            <View style={styles.userPulse} />
            <View style={styles.userDot} />
          </View>

          <View style={[styles.liveBusMarker, { left: '68%', top: '24%' }]}>
            <View style={styles.liveBusIconCircle}>
              <Ionicons name="bus" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.liveBusBadge}>
              <Text style={styles.liveBusBadgeText}>Linha 474</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.profileFloatingBtn}>
          <View style={styles.profileIconCircle}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.gearBadge}>
            <Ionicons name="settings" size={10} color="#000000" />
          </View>
        </TouchableOpacity>

        <View style={styles.gpsFloatingBadge}>
          <View style={styles.gpsPulseDot} />
          <Text style={styles.gpsFloatingText}>GPS AO VIVO</Text>
        </View>
      </View>

      {/* ============================================================ */}
      {/* CAMADA 2: PAINEL COM GRADE RIGOROSA DE COLUNAS               */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.bottomSheetOverlay,
          { height: sheetHeight },
        ]}
      >
        {/* Alça de Arrasto */}
        <View {...panResponder.panHandlers} style={styles.dragHandleZone}>
          <View style={styles.dragHandlePill} />
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
              placeholder="Para onde você quer ir?"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
              <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: SPACING.xs }}>
                <Feather name="x" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* LISTA DE BANNERS COM GRADE DE COLUNAS RIGOROSA */}
        <ScrollView
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
                onPress={() => setSelectedLineNumber(line.number)}
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
                  {/* Dois arcos posicionados no canto superior direito do número */}
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

          {/* PAINEL DE AÇÃO */}
          <View style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <View>
                <Text style={styles.actionTitle}>Linha {selectedLine.number} em Monitoramento</Text>
                <Text style={styles.actionSubtitle}>{selectedLine.name}</Text>
              </View>
              <View style={[styles.colorIndicator, { backgroundColor: selectedLine.bgColor }]} />
            </View>

            <TouchableOpacity
              style={[
                styles.alertActionButton,
                alertActive ? styles.alertBtnActive : styles.alertBtnInactive,
              ]}
              onPress={() => setAlertActive(!alertActive)}
            >
              <Ionicons
                name={alertActive ? 'notifications' : 'notifications-outline'}
                size={18}
                color="#FFFFFF"
                style={{ marginRight: SPACING.sm }}
              />
              <Text style={styles.alertActionText}>
                {alertActive ? 'Alerta Ativo (Notificar a 300m)' : 'Ativar Alerta de Desembarque'}
              </Text>
            </TouchableOpacity>
          </View>
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

  /* ============================== */
  /* 1. Camada do Mapa              */
  /* ============================== */
  fullscreenMap: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#07090E',
    zIndex: 1,
  },
  mapGrid: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapTransitPathBlue: {
    position: 'absolute', left: '15%', top: '25%', width: '70%', height: 6,
    backgroundColor: '#1D4ED8', borderRadius: 3, transform: [{ rotate: '35deg' }],
  },
  mapTransitPathGreen: {
    position: 'absolute', left: '5%', top: '60%', width: '85%', height: 6,
    backgroundColor: '#059669', borderRadius: 3, transform: [{ rotate: '-25deg' }],
  },
  mapTransitPathRed: {
    position: 'absolute', left: '35%', top: '40%', width: '60%', height: 5,
    backgroundColor: '#DC2626', borderRadius: 3, transform: [{ rotate: '80deg' }],
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  mapPinCircle: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#1E293B', borderWidth: 2, borderColor: '#38BDF8',
    alignItems: 'center', justifyContent: 'center',
  },
  userLocationMarker: {
    position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 95,
  },
  userPulse: {
    position: 'absolute', width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(56, 189, 248, 0.35)',
  },
  userDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#0284C7', borderWidth: 3, borderColor: '#FFFFFF',
  },
  liveBusMarker: {
    position: 'absolute', alignItems: 'center', zIndex: 90,
  },
  liveBusIconCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#1D4ED8', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FFFFFF',
  },
  liveBusBadge: {
    backgroundColor: '#0F172A', paddingVertical: 2, paddingHorizontal: 6,
    borderRadius: 4, marginTop: 3, borderWidth: 1, borderColor: '#38BDF8',
  },
  liveBusBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },
  profileFloatingBtn: { position: 'absolute', top: 50, left: SPACING.base, zIndex: 10 },
  profileIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#312E81', borderWidth: 2, borderColor: '#6366F1',
    alignItems: 'center', justifyContent: 'center',
  },
  gearBadge: {
    position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center',
  },
  gpsFloatingBadge: {
    position: 'absolute', top: 54, right: SPACING.base,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.90)',
    paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.4)', gap: 6, zIndex: 10,
  },
  gpsPulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  gpsFloatingText: { color: '#34D399', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },

  /* ============================== */
  /* 2. Painel de Busca             */
  /* ============================== */
  bottomSheetOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#0A0A0F',
    borderTopLeftRadius: RADII.sheet,
    borderTopRightRadius: RADII.sheet,
    borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000', shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.8, shadowRadius: 20,
    zIndex: 100,
  },
  dragHandleZone: {
    alignItems: 'center',
    height: HEIGHTS.dragHandle,
    justifyContent: 'center',
    cursor: 'grab',
  },
  dragHandlePill: {
    width: 44, height: 5, borderRadius: 3, backgroundColor: '#52525B',
  },

  /* --- Barra de Pesquisa --- */
  searchCapsuleContainer: {
    paddingHorizontal: COLUMNS.gutter,
    paddingBottom: SPACING.sm,
  },
  searchCapsule: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#059669',
    borderRadius: RADII.pill,
    paddingHorizontal: SPACING.base,
    height: HEIGHTS.searchCapsule,
    shadowColor: '#059669', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8,
  },
  searchCapsuleFocused: {
    backgroundColor: '#047857', borderWidth: 2, borderColor: '#34D399',
  },
  searchCapsuleInput: {
    flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '600',
    outlineStyle: 'none',
  } as any,

  /* =========================================================== */
  /* BANNERS DE ÔNIBUS: GRADE RIGOROSA DE 2 COLUNAS             */
  /*                                                             */
  /*  |<--- colLeft (flex:1) --->|<--- colRight (88px fixo) --->|*/
  /*  |  474                     |                           2'' |*/
  /*  |  Jacaré ➔ Jardim...      |                          min |*/
  /*  |  Via Copacabana...       |                              |*/
  /*  |__________________________|______________________________|*/
  /*                                                             */
  /* A colRight tem largura fixa. Todos os números de ETA, os   */
  /* arcos e a legenda "min" seguem exatamente o mesmo eixo      */
  /* vertical de cima a baixo, independente de 1 ou 2 dígitos.   */
  /* =========================================================== */
  bannersScroll: { flex: 1 },

  transitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHTS.transitBanner,
    paddingLeft: SPACING.lg,
    paddingRight: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  transitBannerSelected: {
    borderLeftWidth: 6,
    borderLeftColor: '#FFFFFF',
    paddingLeft: SPACING.lg - 6, // Compensa a borda para manter o conteúdo alinhado
  },

  /* Coluna Esquerda: ocupa todo o espaço restante */
  colLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: SPACING.base,
  },
  lineNumberText: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1.5,
    lineHeight: 48,
  },
  destinationText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  viaText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },

  /* Coluna Direita: largura fixa de 88px, alinhamento rigoroso */
  colRight: {
    width: COLUMNS.etaColumn,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
  },
  etaNumber: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1.5,
    lineHeight: 48,
    textAlign: 'right',
    // O número ocupa toda a largura da coluna e alinha pela borda direita
    width: '100%',
  },
  /* Os dois arcos ficam posicionados absolutamente no canto superior direito */
  arcsOverlay: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 16,
    height: 16,
  },
  arcS: {
    position: 'absolute',
    top: 4,
    right: 2,
    width: 6,
    height: 6,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopRightRadius: 5,
  },
  arcL: {
    position: 'absolute',
    top: 0,
    right: -1,
    width: 11,
    height: 11,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopRightRadius: 9,
  },
  etaUnitText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    width: '100%',
    marginTop: -2,
  },

  /* --- Painel de Ação --- */
  actionCard: {
    margin: COLUMNS.gutter,
    padding: SPACING.base,
    borderRadius: RADII.card,
    backgroundColor: '#141420',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  actionTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  actionSubtitle: { color: '#A1A1AA', fontSize: 12, marginTop: 2 },
  colorIndicator: { width: 14, height: 14, borderRadius: 7 },
  alertActionButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: SPACING.md, borderRadius: RADII.badge,
  },
  alertBtnInactive: { backgroundColor: '#312E81', borderWidth: 1, borderColor: '#6366F1' },
  alertBtnActive: { backgroundColor: '#BE185D', borderWidth: 1, borderColor: '#EC4899' },
  alertActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
});
