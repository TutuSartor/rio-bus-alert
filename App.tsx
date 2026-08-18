import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Definição das 4 Paletas de Cores Profissionais
const PALETTES = {
  emerald: {
    name: 'Carioca Emerald (Transit Rio)',
    bg: '#090D16',
    card: '#131B2E',
    border: 'rgba(16, 185, 129, 0.2)',
    primary: '#10B981', // Verde Esmeralda
    accent: '#06B6D4',
    text: '#F8FAFC',
    subtext: '#94A3B8',
    badge: '#064E3B',
  },
  indigo: {
    name: 'Electric Indigo (Kole Jain / Linear)',
    bg: '#0A0A0F',
    card: '#141420',
    border: 'rgba(99, 102, 241, 0.25)',
    primary: '#6366F1', // Indigo Elétrico
    accent: '#EC4899',
    text: '#FFFFFF',
    subtext: '#A1A1AA',
    badge: '#312E81',
  },
  amber: {
    name: 'Onyx & Sun Amber (High Contrast)',
    bg: '#121214',
    card: '#202024',
    border: 'rgba(245, 158, 11, 0.25)',
    primary: '#F59E0B', // Âmbar Solar
    accent: '#38BDF8',
    text: '#EDEDED',
    subtext: '#8D8D99',
    badge: '#78350F',
  },
  slate: {
    name: 'Slate Classic (Tech Blue)',
    bg: '#0F172A',
    card: '#1E293B',
    border: 'rgba(255, 255, 255, 0.08)',
    primary: '#3B82F6', // Azul Elétrico
    accent: '#10B981',
    text: '#F8FAFC',
    subtext: '#64748B',
    badge: '#1E3A8A',
  },
};

type PaletteKey = keyof typeof PALETTES;

const MOCK_STOPS = [
  { id: '1', nome: 'Terminal Central do Brasil', bairro: 'Centro' },
  { id: '2', nome: 'Praça da República', bairro: 'Centro' },
  { id: '3', nome: 'Avenida Rio Branco', bairro: 'Centro' },
  { id: '4', nome: 'Rua Visconde de Pirajá', bairro: 'Ipanema' },
];

export default function App() {
  const [currentPalette, setCurrentPalette] = useState<PaletteKey>('emerald');
  const [selectedRoute, setSelectedRoute] = useState<string>('474');
  const [loading, setLoading] = useState<boolean>(false);
  const [busCount, setBusCount] = useState<number>(4);

  const theme = PALETTES[currentPalette];

  function handleSelectLine(line: string) {
    setSelectedRoute(line);
    setLoading(true);
    setTimeout(() => {
      setBusCount(line === '474' ? 4 : line === '606' ? 2 : 5);
      setLoading(false);
    }, 250);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar style="light" />

      {/* Header Principal */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Rio Bus Alert</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subtext }]}>
          Mobilidade Urbana & Alerta de Desembarque
        </Text>
      </View>

      {/* Seletor Interativo de Paleta de Cores */}
      <View style={styles.paletteSection}>
        <Text style={[styles.paletteLabel, { color: theme.subtext }]}>Testar Paleta de Cores:</Text>
        <View style={styles.paletteButtonsRow}>
          {(Object.keys(PALETTES) as PaletteKey[]).map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.paletteBtn,
                { backgroundColor: PALETTES[key].card, borderColor: PALETTES[key].primary },
                currentPalette === key && { borderWidth: 2, backgroundColor: PALETTES[key].badge },
              ]}
              onPress={() => setCurrentPalette(key)}
            >
              <View style={[styles.colorDot, { backgroundColor: PALETTES[key].primary }]} />
              <Text
                style={[
                  styles.paletteBtnText,
                  { color: currentPalette === key ? '#FFFFFF' : theme.subtext },
                ]}
              >
                {key.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Indicador de Conexão Supabase Cloud */}
      <View style={[styles.cloudBadge, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={[styles.statusDot, { backgroundColor: theme.primary }]} />
        <Text style={[styles.cloudBadgeText, { color: theme.text }]}>
          PostgreSQL Supabase (AWS SP) Conectado
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Seletor de Linhas */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Selecione a Linha em Trânsito</Text>
        <View style={styles.routesContainer}>
          {['474', '606', '309', '483', '457'].map((line) => (
            <TouchableOpacity
              key={line}
              style={[
                styles.routeChip,
                { backgroundColor: theme.card, borderColor: theme.border },
                selectedRoute === line && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => handleSelectLine(line)}
            >
              <Text
                style={[
                  styles.routeChipText,
                  { color: selectedRoute === line ? '#FFFFFF' : theme.subtext },
                ]}
              >
                Linha {line}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 30 }} />
        ) : (
          <>
            {/* Status da Telemetria GPS */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Telemetria em Tempo Real (Data.rio)</Text>
              <Text style={[styles.cardDetail, { color: theme.subtext }]}>
                Ônibus ativos na linha {selectedRoute}:{' '}
                <Text style={[styles.boldText, { color: theme.text }]}>{busCount} veículos</Text>
              </Text>
              <View style={[styles.busRow, { backgroundColor: theme.bg }]}>
                <Text style={[styles.busCode, { color: theme.text }]}>Veículo C41001</Text>
                <Text style={[styles.busSpeed, { color: theme.primary }]}>28 km/h</Text>
              </View>
              <View style={[styles.busRow, { backgroundColor: theme.bg }]}>
                <Text style={[styles.busCode, { color: theme.text }]}>Veículo C41002</Text>
                <Text style={[styles.busSpeed, { color: theme.primary }]}>18 km/h</Text>
              </View>
            </View>

            {/* Resumo do Banco em Nuvem */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Base de Dados Espacial (PostGIS)</Text>
              <Text style={[styles.cardDetail, { color: theme.subtext }]}>
                Pontos de Ônibus no Banco:{' '}
                <Text style={[styles.boldText, { color: theme.text }]}>17 pontos</Text>
              </Text>
              <Text style={[styles.cardDetail, { color: theme.subtext }]}>
                Linhas Cadastradas:{' '}
                <Text style={[styles.boldText, { color: theme.text }]}>6 linhas</Text>
              </Text>
            </View>

            {/* Amostra dos Pontos de Ônibus */}
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Pontos Cadastrados no Rio</Text>
            {MOCK_STOPS.map((stop) => (
              <View
                key={stop.id}
                style={[
                  styles.stopCard,
                  { backgroundColor: theme.card, borderLeftColor: theme.primary },
                ]}
              >
                <Text style={[styles.stopName, { color: theme.text }]}>{stop.nome}</Text>
                <Text style={[styles.stopNeighborhood, { color: theme.subtext }]}>{stop.bairro}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  paletteSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  paletteLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  paletteButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paletteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paletteBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  cloudBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  routeChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  routeChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 13,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  busRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  busCode: {
    fontSize: 13,
    fontWeight: '500',
  },
  busSpeed: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  stopCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
  },
  stopNeighborhood: {
    fontSize: 12,
    marginTop: 2,
  },
});
