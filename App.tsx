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

// Linhas de Ônibus em Destaque no Estilo Transit App (Grandes Banners Coloridos)
const NEARBY_TRANSIT_LINES = [
  {
    number: '474',
    name: 'Jacaré ➔ Jardim de Alah',
    via: 'Via Copacabana & Lapa',
    eta: '2',
    unit: 'minutos',
    bgColor: '#1D4ED8', // Azul Forte de Linha Principal
    textColor: '#FFFFFF',
    speed: '28 km/h',
    isLive: true,
  },
  {
    number: '606',
    name: 'Rodoviária ➔ Eng. de Dentro',
    via: 'Via Tijuca & Maracanã',
    eta: '1',
    unit: 'minuto',
    bgColor: '#059669', // Verde Esmeralda
    textColor: '#FFFFFF',
    speed: '24 km/h',
    isLive: true,
  },
  {
    number: '483',
    name: 'Penha ➔ General Osório',
    via: 'Via Linha Vermelha & Túnel',
    eta: '5',
    unit: 'minutos',
    bgColor: '#DC2626', // Coral / Vermelho Alta Frequência
    textColor: '#FFFFFF',
    speed: '22 km/h',
    isLive: true,
  },
  {
    number: '309',
    name: 'Central ➔ Alvorada',
    via: 'Via Botafogo & Barra',
    eta: '8',
    unit: 'minutos',
    bgColor: '#D97706', // Âmbar / Dourado
    textColor: '#000000',
    speed: '34 km/h',
    isLive: true,
  },
  {
    number: '457',
    name: 'Abolição ➔ Copacabana',
    via: 'Via Túnel Rebouças',
    eta: '11',
    unit: 'minutos',
    bgColor: '#7C3AED', // Roxo Violeta
    textColor: '#FFFFFF',
    speed: '20 km/h',
    isLive: true,
  },
];

// Pontos Reais do Rio de Janeiro
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

const SCREEN_HEIGHT = Dimensions.get('window').height || 700;
const SNAP_EXPANDED = SCREEN_HEIGHT * 0.88;
const SNAP_HALF = SCREEN_HEIGHT * 0.54;
const SNAP_COLLAPSED = SCREEN_HEIGHT * 0.22;

export default function App() {
  const [selectedLineNumber, setSelectedLineNumber] = useState<string>('474');
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

  // Filtragem de linhas e pontos pela busca
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
      {/* CAMADA 1: MAPA EM TELA CHEIA FIXO (ESTILO TRANSIT APP)       */}
      {/* ============================================================ */}
      <View style={styles.fullscreenMap}>
        <View style={styles.mapGrid}>
          {/* Traçados das Linhas no Mapa */}
          <View style={styles.mapTransitPathBlue} />
          <View style={styles.mapTransitPathGreen} />
          <View style={styles.mapTransitPathRed} />

          {/* Marcadores dos Pontos de Ônibus */}
          {RIO_STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.id}
              style={[
                styles.mapPin,
                { left: `${stop.x}%`, top: `${stop.y}%` },
              ]}
            >
              <View style={styles.mapPinCircle}>
                <MaterialCommunityIcons name="bus-stop" size={14} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Posição do Usuário no Mapa (Ponto Azul Pulsante) */}
          <View style={[styles.userLocationMarker, { left: '50%', top: '34%' }]}>
            <View style={styles.userPulse} />
            <View style={styles.userDot} />
          </View>

          {/* Ônibus em Tempo Real com Telemetria */}
          <View style={[styles.liveBusMarker, { left: '68%', top: '24%' }]}>
            <View style={styles.liveBusIconCircle}>
              <Ionicons name="bus" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.liveBusBadge}>
              <Text style={styles.liveBusBadgeText}>474 • 28 km/h</Text>
            </View>
          </View>
        </View>

        {/* Botão de Perfil / Configurações Flutuante no Topo Esquerdo */}
        <TouchableOpacity style={styles.profileFloatingBtn}>
          <View style={styles.profileIconCircle}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.gearBadge}>
            <Ionicons name="settings" size={10} color="#000000" />
          </View>
        </TouchableOpacity>

        {/* Badge de GPS Ativo no Topo Direito */}
        <View style={styles.gpsFloatingBadge}>
          <View style={styles.gpsPulseDot} />
          <Text style={styles.gpsFloatingText}>GPS AO VIVO</Text>
        </View>
      </View>

      {/* ============================================================ */}
      {/* CAMADA 2: PAINEL TRANSIT APP COM BANNERS GIGANTES COLORIDOS  */}
      {/* ============================================================ */}
      <Animated.View
        style={[
          styles.bottomSheetOverlay,
          {
            height: sheetHeight,
          },
        ]}
      >
        {/* 1. Alça de Arrasto Discreta */}
        <View {...panResponder.panHandlers} style={styles.dragHandleZone}>
          <View style={styles.dragHandlePill} />
        </View>

        {/* 2. BARRA DE PESQUISA EM CÁPSULA (TRANSIT APP STYLE) */}
        <View style={styles.searchCapsuleContainer}>
          <View
            style={[
              styles.searchCapsule,
              isSearchFocused && styles.searchCapsuleFocused,
            ]}
          >
            <Feather name="search" size={20} color="#FFFFFF" style={styles.searchCapsuleIcon} />
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
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                <Feather name="x" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. BANNERS DE ÔNIBUS GIGANTES DE ALTO IMPACTO (TRANSIT APP HUD) */}
        <ScrollView
          style={styles.bannersScroll}
          contentContainerStyle={styles.bannersScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLines.map((line) => {
            const isSelected = line.number === selectedLineNumber;

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
                  setSelectedLineNumber(line.number);
                }}
              >
                {/* Lado Esquerdo: Número Gigante da Linha e Destino */}
                <View style={styles.bannerLeft}>
                  <Text style={[styles.bannerLineNumber, { color: line.textColor }]}>
                    {line.number}
                  </Text>
                  <Text
                    style={[styles.bannerDestination, { color: line.textColor }]}
                    numberOfLines={1}
                  >
                    {line.name}
                  </Text>
                  <Text
                    style={[styles.bannerViaRoute, { color: line.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.65)' }]}
                    numberOfLines={1}
                  >
                    {line.via}
                  </Text>
                </View>

                {/* Lado Direito: Tempo Estimado Gigante (ETA) com Ícone de Transmissão */}
                <View style={styles.bannerRight}>
                  <View style={styles.etaNumberRow}>
                    <Text style={[styles.bannerEtaNumber, { color: line.textColor }]}>
                      {line.eta}
                    </Text>
                    <Ionicons
                      name="wifi"
                      size={18}
                      color={line.textColor}
                      style={styles.liveBroadcastIcon}
                    />
                  </View>
                  <Text style={[styles.bannerEtaUnit, { color: line.textColor }]}>
                    {line.unit}
                  </Text>
                  <Text style={[styles.bannerSpeedText, { color: line.textColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }]}>
                    {line.speed}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* PAINEL DE AÇÃO PARA A LINHA SELECIONADA */}
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
                style={{ marginRight: 8 }}
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
  mapTransitPathBlue: {
    position: 'absolute',
    left: '15%',
    top: '25%',
    width: '70%',
    height: 6,
    backgroundColor: '#1D4ED8',
    borderRadius: 3,
    transform: [{ rotate: '35deg' }],
  },
  mapTransitPathGreen: {
    position: 'absolute',
    left: '5%',
    top: '60%',
    width: '85%',
    height: 6,
    backgroundColor: '#059669',
    borderRadius: 3,
    transform: [{ rotate: '-25deg' }],
  },
  mapTransitPathRed: {
    position: 'absolute',
    left: '35%',
    top: '40%',
    width: '60%',
    height: 5,
    backgroundColor: '#DC2626',
    borderRadius: 3,
    transform: [{ rotate: '80deg' }],
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  mapPinCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLocationMarker: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 95,
  },
  userPulse: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(56, 189, 248, 0.35)',
  },
  userDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0284C7',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  liveBusMarker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 90,
  },
  liveBusIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  liveBusBadge: {
    backgroundColor: '#0F172A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 3,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  liveBusBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  profileFloatingBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 10,
  },
  profileIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#312E81',
    borderWidth: 2,
    borderColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsFloatingBadge: {
    position: 'absolute',
    top: 54,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.90)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    gap: 6,
    zIndex: 10,
  },
  gpsPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  gpsFloatingText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  /* --- 2. Painel Inferior (Transit App Bottom Sheet) --- */
  bottomSheetOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0F',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    zIndex: 100,
  },
  dragHandleZone: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    cursor: 'grab',
  },
  dragHandlePill: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#52525B',
  },

  /* --- Barra de Pesquisa em Cápsula --- */
  searchCapsuleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  searchCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669', // Verde Cápsula do Transit App
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  searchCapsuleFocused: {
    backgroundColor: '#047857',
    borderWidth: 2,
    borderColor: '#34D399',
  },
  searchCapsuleIcon: {
    marginRight: 10,
  },
  searchCapsuleInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    outlineStyle: 'none',
  } as any,
  clearBtn: {
    padding: 4,
  },

  /* --- Lista de Banners Grandes de Ônibus --- */
  bannersScroll: {
    flex: 1,
  },
  bannersScrollContent: {
    paddingBottom: 40,
  },
  transitBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  transitBannerSelected: {
    borderLeftWidth: 6,
    borderLeftColor: '#FFFFFF',
  },
  bannerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  bannerLineNumber: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 46,
  },
  bannerDestination: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bannerViaRoute: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: '500',
  },
  bannerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  etaNumberRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bannerEtaNumber: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 46,
  },
  liveBroadcastIcon: {
    marginLeft: 3,
    marginTop: 2,
    transform: [{ rotate: '45deg' }],
  },
  bannerEtaUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'lowercase',
    marginTop: -2,
  },
  bannerSpeedText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  /* --- Painel de Ação da Linha Selecionada --- */
  actionCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#141420',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionSubtitle: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 2,
  },
  colorIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  alertActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  alertBtnInactive: {
    backgroundColor: '#312E81',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  alertBtnActive: {
    backgroundColor: '#BE185D',
    borderWidth: 1,
    borderColor: '#EC4899',
  },
  alertActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
